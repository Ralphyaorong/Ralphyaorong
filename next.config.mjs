const repository = process.env.GITHUB_REPOSITORY ?? "";
const [owner, repositoryName] = repository.split("/");
const isUserSite = Boolean(owner && repositoryName && repositoryName.toLowerCase() === `${owner.toLowerCase()}.github.io`);
const basePath = process.env.GITHUB_ACTIONS === "true" && repositoryName && !isUserSite ? `/${repositoryName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath }
};

export default nextConfig;
