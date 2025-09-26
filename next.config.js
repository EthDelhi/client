/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    outputFileTracingRoot: path.join(__dirname),

  // Enable React strict mode
  reactStrictMode: true,

  // Optional: proxy API requests to localhost
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*', // your local API
      },
    ];
  },
}

module.exports = nextConfig
