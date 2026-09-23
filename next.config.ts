import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ["192.168.18.10"],
};

export default nextConfig;