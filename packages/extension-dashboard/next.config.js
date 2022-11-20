/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: './',
};
const withTM = require('next-transpile-modules')(['extension-common']); // pass the modules you would like to see transpiled

module.exports = withTM(nextConfig);
