/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  nextRuntime: "edge",
  images: {
    unoptimized: true,
  },
  assetPrefix: "./",
};

module.exports = nextConfig;
