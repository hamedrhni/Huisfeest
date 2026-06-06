/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Image domains intentionally left empty for V1: all imagery is local/placeholder.
  // When real photography or a CDN/S3 bucket is added, register the host here.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
