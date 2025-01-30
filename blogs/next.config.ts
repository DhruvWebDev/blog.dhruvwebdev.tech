import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
          hostname: 'aceternity.com',
        },
        {
          protocol: 'https',
          hostname: 'www.notion.so',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
