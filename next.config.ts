import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gpu.id",
        port: "",
        pathname: "/data-gpu/images/**",
      },
    ],
  },
};

export default nextConfig;
