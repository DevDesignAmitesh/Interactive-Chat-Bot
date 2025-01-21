import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "st3.depositphotos.com",
      },
      {
        hostname: "i.pinimg.com",
      },
    ],
  },
};

export default nextConfig;
