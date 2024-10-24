/** @type {import('next').NextConfig} */

const webpack = require('webpack')

const process = require('process/browser')
console.log(process.env.NODE_ENV)

const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      process: require.resolve('process/browser'),
    }
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    )
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  pageExtensions: ['tsx', 'ts'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'albaform.netlify.app',
      },
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig // CommonJS의 module.exports 사용
