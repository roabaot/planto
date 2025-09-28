import type { NextConfig } from "next";

// Performance-focused Next.js config tweaks
const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /component/, // import MyIcon from './icon.svg?component'
      use: [
        {
          loader: "@svgr/webpack",
          options: { icon: true },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
