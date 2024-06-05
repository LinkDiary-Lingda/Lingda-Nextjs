/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.lingda.app', port: '' },
    ],
  },
};

export default nextConfig;
