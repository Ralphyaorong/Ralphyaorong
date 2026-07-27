import { site } from "@/config/site";

export function assetUrl(path: string): string {
  return `${site.basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
