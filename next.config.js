/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pngimg.com", "fakestoreapi.com"],
  },
};

module.exports = nextConfig;
