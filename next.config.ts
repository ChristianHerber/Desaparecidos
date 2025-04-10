import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    ignoreDuringBuilds: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
