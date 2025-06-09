import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['./src']
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-avatar', '@radix-ui/react-dropdown-menu'],
  },
  // Minimize JavaScript
  swcMinify: true,
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
  },
  // Enable compression
  compress: true,
  // Modern JavaScript target
  transpilePackages: [],
};

export default nextConfig;
