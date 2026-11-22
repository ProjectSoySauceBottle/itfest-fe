/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Menu photos and table QR codes live in object storage, not on the API
    // host. Listing only NEXT_PUBLIC_BACKEND_DOMAIN makes the image optimiser
    // answer INVALID_IMAGE_OPTIMIZE_REQUEST (400) for every stored image, so
    // the storage host is declared explicitly.
    domains: process.env.NEXT_PUBLIC_BACKEND_DOMAIN
      ? [process.env.NEXT_PUBLIC_BACKEND_DOMAIN]
      : [],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crtrzxtalljemijolwrn.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      ...(process.env.NEXT_PUBLIC_BACKEND_DOMAIN
        ? [{ protocol: "https", hostname: process.env.NEXT_PUBLIC_BACKEND_DOMAIN }]
        : []),
      ...(process.env.NEXT_PUBLIC_FRONTEND_DOMAIN
        ? [{ protocol: "https", hostname: process.env.NEXT_PUBLIC_FRONTEND_DOMAIN }]
        : []),
    ],
  },
};

export default nextConfig;
