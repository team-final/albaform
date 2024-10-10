/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  pageExtensions: ['tsx', 'ts'],
  images: {
    domains: ['albaform.netlify.app'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.pixabay.co(m|.kr)' },
      { protocol: 'https', hostname: '**.freepik.co(m|.kr)' },
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
