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
      },
      {
        protocol: 'https',
        hostname: 'realxmarket.xcavate.io'
      },
      {
        protocol: 'https',
        hostname: 'realxmartet.xcavate.io'
      },
      {
        protocol: 'https',
        hostname: 'app.realxmarktet.io'
      },
      {
        protocol: 'https',
        hostname: 'app.realxmarket.io'
      }
    ]
  }
};

export default nextConfig;
