/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["hooknhold.s3-ap-southeast-1.amazonaws.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
  },
};

export default nextConfig;
