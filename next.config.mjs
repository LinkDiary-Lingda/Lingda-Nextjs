/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.giftmoa.co.kr', port: '' },
    ],
  },
};

export default nextConfig;
