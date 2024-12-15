import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['@gw2boost/database'],
  experimental: {
    authInterrupts: true
  }
};

export default nextConfig;
