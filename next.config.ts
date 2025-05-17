import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['./app']
  },
  compiler: {
    removeConsole: true,
  }
};

export default nextConfig;
