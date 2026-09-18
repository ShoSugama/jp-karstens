import type { NextConfig } from "next";

const repoName = "jp-karstens";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
