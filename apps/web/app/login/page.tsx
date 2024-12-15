import { Button } from '@/components/Button';
import { db } from '@/lib/db';
import { getGw2meRedirectUrl, getGw2MeClient } from '@/lib/gw2me';
import { getSession } from '@/lib/session';
import { Scope } from '@gw2me/client';
import { generatePKCEPair } from '@gw2me/client/pkce';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getSession();

  if(session) {
    redirect('/dashboard');
  }

  return (
    <>
      <form action={login}>
        <Button type="submit">Login with gw2.me</Button>
      </form>
    </>
  );
}

async function login() {
  'use server';

  const pkce = await generatePKCEPair();

  // create auth request
  const authRequest = await db.authRequest.create({
    data: { code_verifier: pkce.code_verifier },
    select: { id: true },
  });

  // create auth url
  const authUrl = getGw2MeClient().getAuthorizationUrl({
    redirect_uri: getGw2meRedirectUrl(),
    scopes: [Scope.Identify, Scope.Email],
    ...pkce.challenge,
    state: authRequest.id,
  });

  redirect(authUrl);
}
