/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: '/api/auth/:path*',
      destination: 'http://localhost:7801/:path*',
    },
    {
      source: '/api/:path*',
      destination: 'http://localhost:7802/api/:path*',
    },
  ],
};

module.exports = nextConfig
