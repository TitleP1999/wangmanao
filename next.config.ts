import type { NextConfig } from "next";
const config: NextConfig = {
  devIndicators: false,
  output: "export",
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default config;
