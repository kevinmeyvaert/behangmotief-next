module.exports = {
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200, 1400, 2500],
    domains: ['images.ctfassets.net'],
  },
  env: {
    NEXT_GTM: process.env.NEXT_GTM,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
};
