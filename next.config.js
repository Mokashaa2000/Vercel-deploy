// next.config.js
const isGithubPages = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  images: {
    unoptimized: true, // <--- ADD THIS
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: isGithubPages ? '' : '',
  assetPrefix: isGithubPages ? '/' : '',
  trailingSlash: true,
  webpack: (config, { isServer, dev }) => {
    // Don't modify publicPath for custom domains
    return config
  }
 
};