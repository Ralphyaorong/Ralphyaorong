import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { publicAssets, relative, root } from "./assets-shared.mjs";

const sources = {
  home: ["首页照片.png"],
  contact: ["二维码.png"],
  photography: ["挑选照片6张"],
  workflow: ["AI 工作流"],
  ip: ["IP案例"],
  livestream: ["直播间案例"]
};
const mapping = [];
const generatedHeroNames = ["works", "cases", "about", "contact", "timeline"];
const generatedVideoPreviewGroups = [
  ["video-production", 5],
  ["video-packaging", 2]
];

async function optionalFile(pathname) {
  try {
    return await fs.readFile(pathname);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") return null;
    throw error;
  }
}

async function preserveGeneratedPageHeroes() {
  const heroes = new Map();
  for (const name of generatedHeroNames) {
    const webpPath = path.join(publicAssets, "generated", `page-hero-${name}.webp`);
    const pngPath = path.join(publicAssets, "generated", `page-hero-${name}.png`);
    const existingWebp = await optionalFile(webpPath);
    if (existingWebp) {
      heroes.set(name, existingWebp);
      continue;
    }
    const existingPng = await optionalFile(pngPath);
    if (existingPng) {
      heroes.set(name, await sharp(existingPng).rotate().webp({ quality: 82 }).toBuffer());
    }
  }
  return heroes;
}

const preservedGeneratedPageHeroes = await preserveGeneratedPageHeroes();

async function preserveGeneratedVideoPreviews() {
  const previews = new Map();
  for (const [group, count] of generatedVideoPreviewGroups) {
    for (let index = 1; index <= count; index += 1) {
      const filename = `${group}-${String(index).padStart(2, "0")}`;
      for (const extension of ["mp4", "webp"]) {
        const relativePath = path.join("works", group, `${filename}.${extension}`);
        const existing = await optionalFile(path.join(publicAssets, relativePath));
        if (existing) previews.set(relativePath, existing);
      }
    }
  }
  return previews;
}

const preservedGeneratedVideoPreviews = await preserveGeneratedVideoPreviews();

async function sourceList(names) {
  const results = [];
  for (const name of names) {
    const fullPath = path.join(root, name);
    const stat = await fs.stat(fullPath);
    if (stat.isFile()) results.push(fullPath);
    else {
      const list = await fs.readdir(fullPath);
      results.push(...list.map((entry) => path.join(fullPath, entry)));
    }
  }
  return results.sort((a, b) => a.localeCompare(b, "zh-CN"));
}

async function createImage(source, destination, maxWidth, keepPng = false) {
  await fs.mkdir(path.dirname(destination), { recursive: true });
  if (keepPng) {
    await fs.copyFile(source, destination);
  } else {
    await sharp(source).rotate().resize({ width: maxWidth, withoutEnlargement: true }).webp({ quality: 82 }).toFile(destination);
  }
  mapping.push({ source: relative(source), website: `/${path.relative(path.join(root, "public"), destination).split(path.sep).join("/")}` });
}

async function createQrCrop(source, destination) {
  const metadata = await sharp(source).metadata();
  const width = metadata.width ?? 844;
  const height = metadata.height ?? 1207;
  const side = Math.round(width * 0.59);
  const left = Math.round(width * 0.205);
  const top = Math.min(Math.round(height * 0.328), height - side);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await sharp(source).extract({ left, top, width: side, height: side }).png().toFile(destination);
  mapping.push({ source: relative(source), website: `/${path.relative(path.join(root, "public"), destination).split(path.sep).join("/")}`, transformation: "cropped-to-qr" });
}

await fs.rm(publicAssets, { recursive: true, force: true });
await fs.mkdir(publicAssets, { recursive: true });

const [hero] = await sourceList(sources.home);
if (hero) await createImage(hero, path.join(publicAssets, "home", "hero.webp"), 2400);

const [wechatQr] = await sourceList(sources.contact);
if (wechatQr) await createQrCrop(wechatQr, path.join(publicAssets, "contact", "wechat-qr.png"));

const photoFiles = await sourceList(sources.photography);
for (const [index, file] of photoFiles.entries()) await createImage(file, path.join(publicAssets, "works", "photography", `photo-${String(index + 1).padStart(2, "0")}.webp`), 1600);

const workflowGroups = [
  ["content-production", ["内容生产协同工作流 01-1.png", "内容生产协同工作流 02-2.png", "内容生产协同工作流 03-3.png"]],
  ["media-operations", ["Ralph全媒体运营中心01-1.png", "Ralph全媒体运营中心01-2.png", "Ralph全媒体运营中心01-3.png"]],
  ["content-compliance", ["全媒体内容发布前合规审查工作台01-1.png", "全媒体内容发布前合规审查工作台01-2.png", "全媒体内容发布前合规审查工作台01-3.png"]]
];
for (const [group, filenames] of workflowGroups) {
  for (const [index, filename] of filenames.entries()) {
    const source = path.join(root, "AI 工作流", filename);
    await createImage(source, path.join(publicAssets, "cases", "ai-workflow", `${group}-${index + 1}.png`), 2400, true);
  }
}

const ipFiles = await sourceList(sources.ip);
for (const [index, file] of ipFiles.entries()) await createImage(file, path.join(publicAssets, "cases", "ip-projects", `project-${String(index + 1).padStart(2, "0")}.webp`), 1600);

const livestreamFiles = await sourceList(sources.livestream);
for (const [index, file] of livestreamFiles.entries()) {
  const workTarget = path.join(publicAssets, "works", "livestream", `scene-${String(index + 1).padStart(2, "0")}.webp`);
  const caseTarget = path.join(publicAssets, "cases", "livestream", `scene-${String(index + 1).padStart(2, "0")}.webp`);
  await createImage(file, workTarget, 1600);
  await fs.mkdir(path.dirname(caseTarget), { recursive: true });
  await fs.copyFile(workTarget, caseTarget);
  mapping.push({ source: relative(file), website: `/${path.relative(path.join(root, "public"), caseTarget).split(path.sep).join("/")}`, derivedFrom: "/assets/works/livestream" });
}

const posterDir = path.join(publicAssets, "generated");
await fs.mkdir(posterDir, { recursive: true });
for (const type of ["video-production", "video-packaging"]) {
  for (const number of [1, 2]) {
    const filename = `${type}-${String(number).padStart(2, "0")}.svg`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"><rect width="1600" height="900" fill="#131a1e"/><path d="M120 690H1480M120 210H1480" stroke="#d5c09b" stroke-opacity=".34"/><path d="M800 365l115 85-115 85z" fill="#d5c09b"/><text x="120" y="150" fill="#f2f3f1" font-family="Arial, sans-serif" font-size="38" letter-spacing="8">RALPH STUDIO</text><text x="120" y="770" fill="#9ea6a8" font-family="Arial, sans-serif" font-size="28" letter-spacing="4">WORK SAMPLE / PREVIEW PENDING</text></svg>`;
    await fs.writeFile(path.join(posterDir, filename), svg);
  }
}

for (const [name, image] of preservedGeneratedPageHeroes) {
  await fs.writeFile(path.join(posterDir, `page-hero-${name}.webp`), image);
}

for (const [relativePath, preview] of preservedGeneratedVideoPreviews) {
  const destination = path.join(publicAssets, relativePath);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, preview);
}

await fs.writeFile(path.join(root, "assets-manifest.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), mapping, notes: ["Video sources are intentionally excluded because FFmpeg is unavailable and source files exceed the website limit.", "The backup folder is not copied or displayed."] }, null, 2)}\n`);
console.log(`Prepared ${mapping.length} image assets. Mapping: assets-manifest.json`);
