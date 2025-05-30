import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['./app', './src']
  },
};

export default nextConfig;
