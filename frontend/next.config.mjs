/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        output: 'standalone',
        source: '/api/:path*', // When frontend hits /api/submit
        destination: 'http://localhost:3000/:path*', // Forward to Backend
      },
    ];
  },
};

export default nextConfig;