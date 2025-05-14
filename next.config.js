/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // important
  rewrites: async () => [
    {
      source: '/launch',
      destination: '/launch/index.html',
    },
  ],
}

module.exports = nextConfig
