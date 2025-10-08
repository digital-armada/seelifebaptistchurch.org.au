import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    eslint: {
        // Disable ESLint errors during build
        ignoreDuringBuilds: true,
    },
    typescript: {
        // Disable TypeScript errors during build
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
