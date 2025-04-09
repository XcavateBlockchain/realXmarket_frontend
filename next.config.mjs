/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb'
    }
  },
  async redirects() {
    return [
      {
        source: '/investor',
        destination: '/profile',
        permanent: true
      }
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'real-marketplace-properties.s3.eu-west-1.amazonaws.com'
      }
    ]
  }
};

export default nextConfig;
