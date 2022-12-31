const nextConfig = {
  env: {
    NEXT_PUBLIC_FRONTEND_ORIGIN: 'http://waves-jp.com',
    NEXT_PUBLIC_API_SERVER: 'https://jsonplaceholder.typicode.com',
    NEXT_PUBLIC_SITE_NAME: 'WAVES',
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)
