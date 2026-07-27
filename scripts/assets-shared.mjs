import fs from "node:fs/promises";
import path from "node:path";

export const root = process.cwd();
export const publicAssets = path.join(root, "public", "assets");
export const materialFolders = ["AI 工作流", "IP案例", "备用", "视频包装", "视频制作", "挑选照片6张", "直播间案例"];
export const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".tif", ".tiff", ".svg"]);
export const videoExtensions = new Set([".mp4", ".mov", ".mkv", ".webm", ".avi", ".m4v"]);

export async function collectFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const children = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(fullPath) : [fullPath];
  }));
  return children.flat();
}

export function relative(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

export async function sourceFiles() {
  const folders = await Promise.all(materialFolders.map(async (folder) => {
    const fullPath = path.join(root, folder);
    try { return await collectFiles(fullPath); } catch { return []; }
  }));
  const hero = path.join(root, "首页照片.png");
  try { await fs.access(hero); folders.push([hero]); } catch { /* reported by scan */ }
  return folders.flat().sort((a, b) => a.localeCompare(b, "zh-CN"));
}

export function typeOf(file) {
  const extension = path.extname(file).toLowerCase();
  if (imageExtensions.has(extension)) return "image";
  if (videoExtensions.has(extension)) return "video";
  return "unknown";
}

export const bytesToMB = (bytes) => Math.round((bytes / 1024 / 1024) * 100) / 100;
