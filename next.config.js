/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sdrive.blr1.cdn.digitaloceanspaces.com',

      },
    ],
  },
};

module.exports = nextConfig;