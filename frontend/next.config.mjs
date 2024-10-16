/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api",
        destination: `${process.env.NEXT_PUBLIC_API}`,
      },
    ];
  },
};

export default nextConfig;
