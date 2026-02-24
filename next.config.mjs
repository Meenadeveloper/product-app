/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

   basePath: "/property",
  assetPrefix: "/property",
  
  reactCompiler: true,
  // output: "export",
  images: {
    unoptimized: true,
  //    remotePatterns: [
  //   {
  //     protocol: "https",
  //     hostname: "lowcommissionqatar.com",
  //   },
  // ],
  },
};

export default nextConfig;
