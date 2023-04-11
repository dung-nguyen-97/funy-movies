/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    API_YOUTUBE_V3_KEY: process.env.API_YOUTUBE_V3_KEY,
  }
}

module.exports = nextConfig
