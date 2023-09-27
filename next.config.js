/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "virgile-portfollio.s3.amazonaws.com",
      "d2nuyhqai1xu20.cloudfront.net",
    ],
  },
};

module.exports = nextConfig;
