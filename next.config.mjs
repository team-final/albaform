/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  pageExtensions: ['tsx', 'ts'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.pixabay.co(m|.kr)' },
      { protocol: 'https', hostname: '**.freepik.co(m|.kr)' }
    ],
  }
}

export default nextConfig
