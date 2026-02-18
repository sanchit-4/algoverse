/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*', // When frontend hits /api/submit
        destination: 'http://localhost:3000/:path*', // Forward to Backend
      },
    ];
  },
};

export default nextConfig;