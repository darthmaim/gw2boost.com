import { db } from "@/lib/db";
import { gw2me, gw2meRedirectUrl } from "@/lib/gw2me";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // parse code/state from url
  const authResponse = gw2me.parseAuthorizationResponseSearchParams(request.nextUrl.searchParams);

  // make sure state is set
  if(!authResponse.state) {
    throw new Error('State missing');
  }

  // get + delete auth request
  const authRequest = await db.authRequest.delete({
    where: { id: authResponse.state },
  });

  // make sure request is found
  if(!authRequest) {
    throw new Error('Unknown auth request');
  }

  // get token
  const token = await gw2me.getAccessToken({
    code: authResponse.code,
    redirect_uri: gw2meRedirectUrl,
    code_verifier: authRequest.code_verifier,
  });

  // get user data
  const identity = await gw2me.api(token.access_token).user();

  if(!identity.user.email) {
    throw new Error('Email missing');
  }

  // get user
  const user = await db.user.upsert({
    where: { gw2meUserId: identity.user.id },
    create: {
      gw2meUserId: identity.user.id,
      name: identity.user.name,
      email: identity.user.email,
      emailVerified: identity.user.emailVerified ?? false,
    },
    update: {
      name: identity.user.name,
      email: identity.user.email,
      emailVerified: identity.user.emailVerified ?? false,
    }
  });

  // set session cookie
  // TODO: set correct session cookie
  const cookieStore = await cookies();
  cookieStore.set('session', user.id, {
    sameSite: 'none',
    httpOnly: true,
    priority: 'high',
    path: '/',
    secure: true
  });

  // redirect user to dashboard
  redirect('/dashboard');
}
