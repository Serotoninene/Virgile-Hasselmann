/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "virgile-portfollio.s3.amazonaws.com"
    ],
  },
}

module.exports = nextConfig