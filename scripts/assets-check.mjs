import fs from "node:fs/promises";
import path from "node:path";
import { publicAssets, root } from "./assets-shared.mjs";

let failures = 0;
try { await fs.access(path.join(root, "assets-manifest.json")); } catch { console.error("Missing assets-manifest.json. Run npm run assets:prepare first."); failures += 1; }
const expected = [
  "home/hero.webp", "works/photography/photo-01.webp", "works/livestream/scene-01.webp",
  "cases/ai-workflow/workflow-01.png", "cases/ip-projects/project-01.webp", "generated/video-production-01.svg"
];
for (const relativePath of expected) {
  try { await fs.access(path.join(publicAssets, relativePath)); } catch { console.error(`Missing expected website asset: ${relativePath}`); failures += 1; }
}
const generated = await fs.readdir(publicAssets, { recursive: true }).catch(() => []);
const oversized = [];
const previewOversized = [];
for (const entry of generated) {
  const fullPath = path.join(publicAssets, entry);
  const stat = await fs.stat(fullPath).catch(() => null);
  if (stat?.isFile() && stat.size > 100 * 1024 * 1024) oversized.push(entry);
  if (stat?.isFile() && entry.toLowerCase().endsWith(".mp4") && stat.size > 25 * 1024 * 1024) previewOversized.push(entry);
}
if (oversized.length) { console.error(`Oversized public assets: ${oversized.join(", ")}`); failures += 1; }
if (previewOversized.length) { console.error(`Preview videos above 25MB: ${previewOversized.join(", ")}`); failures += 1; }
if (failures) process.exit(1);
console.log("Asset check passed: expected images and local fallback posters exist; no public asset exceeds 100MB.");
