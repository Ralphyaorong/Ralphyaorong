import fs from "node:fs/promises";
import path from "node:path";
import { bytesToMB, relative, sourceFiles, typeOf } from "./assets-shared.mjs";

const files = await sourceFiles();
const records = await Promise.all(files.map(async (file) => ({ file, size: (await fs.stat(file)).size, type: typeOf(file), extension: path.extname(file).toLowerCase() })));
const images = records.filter((record) => record.type === "image");
const videos = records.filter((record) => record.type === "video");
const over25 = videos.filter((record) => record.size > 25 * 1024 * 1024);
const over100 = records.filter((record) => record.size > 100 * 1024 * 1024);
const unknown = records.filter((record) => record.type === "unknown");
const max = [...records].sort((a, b) => b.size - a.size)[0];

const report = {
  generatedAt: new Date().toISOString(),
  totalFiles: records.length,
  totalImages: images.length,
  totalVideos: videos.length,
  maximumFile: max ? { path: relative(max.file), sizeMB: bytesToMB(max.size) } : null,
  videosOver25MB: over25.map((record) => ({ path: relative(record.file), sizeMB: bytesToMB(record.size) })),
  filesOver100MB: over100.map((record) => ({ path: relative(record.file), sizeMB: bytesToMB(record.size) })),
  unrecognizedFormats: unknown.map((record) => relative(record.file)),
  ffmpegAvailable: false,
  notes: [
    "视频源不会被复制到 public/assets；需要 FFmpeg 才能生成合规的作品节选与真实视频封面。",
    "备用目录仅纳入扫描报告，默认不用于网站展示。"
  ]
};

try {
  const { execFile } = await import("node:child_process");
  await new Promise((resolve, reject) => execFile("ffmpeg", ["-version"], (error) => error ? reject(error) : resolve()));
  report.ffmpegAvailable = true;
} catch { /* no ffmpeg is an expected, explicit report state */ }

console.log(JSON.stringify(report, null, 2));
