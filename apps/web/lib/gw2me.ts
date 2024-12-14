import { Gw2MeClient } from '@gw2me/client';
import { unstable_noStore } from 'next/cache';

let gw2me: Gw2MeClient;
export function getGw2MeClient() {
  unstable_noStore();
  return gw2me ?? (gw2me = new Gw2MeClient({
    client_id: process.env.GW2ME_CLIENT_ID!,
    client_secret: process.env.GW2ME_CLIENT_SECRET!,
  }));
}

let url: string;
export function getGw2meRedirectUrl() {
  unstable_noStore();
  return url ?? (url = new URL('/login/callback', process.env.BASE_URL!).toString());
}
