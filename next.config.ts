import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['./src']
  },
  compiler: {
    removeConsole: true,
  }
};

export default nextConfig;
