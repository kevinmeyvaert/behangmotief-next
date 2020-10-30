const withSass = require('@zeit/next-sass');

module.exports = withSass({
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200, 1400],
    domains: ['images.ctfassets.net'],
  },
});
