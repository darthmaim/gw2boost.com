import { Gw2MeClient } from '@gw2me/client';

export const gw2me = new Gw2MeClient({
  client_id: process.env.GW2ME_CLIENT_ID!,
  client_secret: process.env.GW2ME_CLIENT_SECRET!,
});

export const gw2meRedirectUrl = new URL('/login/callback', process.env.BASE_URL!).toString();
