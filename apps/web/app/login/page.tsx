import { db } from '@/lib/db';
import { gw2me, gw2meRedirectUrl } from '@/lib/gw2me';
import { Scope } from '@gw2me/client';
import { generatePKCEPair } from '@gw2me/client/pkce';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  return (
    <>
      <form action={login}>
        <button type="submit">Login with gw2.me</button>
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
  const authUrl = gw2me.getAuthorizationUrl({
    redirect_uri: gw2meRedirectUrl,
    scopes: [Scope.Identify, Scope.Email],
    ...pkce.challenge,
    state: authRequest.id,
  });

  redirect(authUrl);
}
