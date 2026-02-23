/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  // output: "export",
  images: {
    unoptimized: true,
     remotePatterns: [
    {
      protocol: "https",
      hostname: "lowcommissionqatar.com",
    },
  ],
  },
  async rewrites() {
    const base =
      process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || "";
    return [
      {
        source: "/api/:path*",
        destination: `${base}/:path*`,
      },
    ];
  },
  
};

export default nextConfig;
