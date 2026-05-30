import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c98agni2tvccp34z.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
