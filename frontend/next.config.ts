import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
  // Add redirects configuration
  async redirects() {
    return [
      {
        source: '/',
        destination: '/marketing',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;