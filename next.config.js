/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ✅ enables dynamic deployment
  experimental: {
    serverActions: true, // optional, enables future features
  },
}

module.exports = nextConfig
