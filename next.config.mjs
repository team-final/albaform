import path from 'path';

export default {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve('./src');
    return config;
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};
