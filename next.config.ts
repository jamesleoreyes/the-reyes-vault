import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['./src']
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-avatar',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-select',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-separator',
      '@radix-ui/react-label',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-slot'
    ],
  },
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
