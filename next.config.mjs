/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}`],
  },
};

export default nextConfig;
