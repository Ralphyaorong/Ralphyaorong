export type WorkCategory = "视频制作" | "视频包装" | "摄影作品" | "直播间搭建";

export type Work = {
  id: string;
  slug: string;
  title: string;
  category: WorkCategory;
  summary: string;
  responsibilities: string[];
  tools: string[];
  cover: string;
  previewVideo?: string;
  gallery: string[];
  duration: string;
  featured: boolean;
  needsReview: boolean;
};

const photo = (number: number) => `/assets/works/photography/photo-${String(number).padStart(2, "0")}.webp`;
const live = (number: number) => `/assets/works/livestream/scene-${String(number).padStart(2, "0")}.webp`;

export const works: Work[] = [
  { id: "work-01", slug: "commercial-video-01", title: "商业视频制作项目 01", category: "视频制作", summary: "以商业传播画面为主要方向的影像制作项目，重点呈现拍摄执行、素材组织与剪辑节奏。", responsibilities: ["拍摄执行", "素材整理", "视频剪辑"], tools: ["视频制作与后期工具"], cover: videoPreviews["video-production-01"]?.poster ?? "/assets/generated/video-production-01.svg", previewVideo: videoPreviews["video-production-01"]?.previewVideo, gallery: [], duration: videoPreviews["video-production-01"]?.previewDurationLabel ?? "作品节选 · 待生成预览", featured: true, needsReview: true },
  { id: "work-02", slug: "social-video-02", title: "社交媒体短视频项目 02", category: "视频制作", summary: "面向短视频观看场景整理的内容项目，重点处理人物表达、画面节奏与信息层级。", responsibilities: ["素材整理", "视频剪辑", "多平台比例输出"], tools: ["视频制作与后期工具"], cover: videoPreviews["video-production-02"]?.poster ?? "/assets/generated/video-production-02.svg", previewVideo: videoPreviews["video-production-02"]?.previewVideo, gallery: [], duration: videoPreviews["video-production-02"]?.previewDurationLabel ?? "作品节选 · 待生成预览", featured: true, needsReview: true },
  { id: "work-03", slug: "motion-packaging-01", title: "视频包装与节奏设计 01", category: "视频包装", summary: "以视频包装为主的内容项目，重点处理画面节奏、字幕层级和基础动态视觉元素的组织。", responsibilities: ["剪辑节奏", "字幕包装", "声音与画面配合"], tools: ["视频制作与后期工具"], cover: videoPreviews["video-packaging-01"]?.poster ?? "/assets/generated/video-packaging-01.svg", previewVideo: videoPreviews["video-packaging-01"]?.previewVideo, gallery: [], duration: videoPreviews["video-packaging-01"]?.previewDurationLabel ?? "作品节选 · 待生成预览", featured: true, needsReview: true },
  { id: "work-04", slug: "motion-packaging-02", title: "品牌视觉包装项目 02", category: "视频包装", summary: "围绕品牌画面表达的后期包装项目，重点呈现文字可读性、转场节奏与版本整理。", responsibilities: ["剪辑节奏", "字幕包装", "输出版本整理"], tools: ["视频制作与后期工具"], cover: videoPreviews["video-packaging-02"]?.poster ?? "/assets/generated/video-packaging-02.svg", previewVideo: videoPreviews["video-packaging-02"]?.previewVideo, gallery: [], duration: videoPreviews["video-packaging-02"]?.previewDurationLabel ?? "作品节选 · 待生成预览", featured: false, needsReview: true },
  { id: "work-08", slug: "activity-video-03", title: "活动影像记录项目 03", category: "视频制作", summary: "以动态影像记录为基础的内容项目，侧重现场画面捕捉、素材整理与后期节奏控制。", responsibilities: ["拍摄执行", "素材整理", "基础调色"], tools: ["视频制作与后期工具"], cover: videoPreviews["video-production-03"]?.poster ?? "/assets/generated/video-production-01.svg", previewVideo: videoPreviews["video-production-03"]?.previewVideo, gallery: [], duration: videoPreviews["video-production-03"]?.previewDurationLabel ?? "作品节选 · 待生成预览", featured: false, needsReview: true },
  { id: "work-09", slug: "person-content-04", title: "人物内容拍摄项目 04", category: "视频制作", summary: "以人物出镜与画面信息组织为重点的内容拍摄项目，展示拍摄、剪辑与字幕处理的配合。", responsibilities: ["拍摄执行", "视频剪辑", "字幕处理"], tools: ["视频制作与后期工具"], cover: videoPreviews["video-production-04"]?.poster ?? "/assets/generated/video-production-02.svg", previewVideo: videoPreviews["video-production-04"]?.previewVideo, gallery: [], duration: videoPreviews["video-production-04"]?.previewDurationLabel ?? "作品节选 · 待生成预览", featured: false, needsReview: true },
  { id: "work-10", slug: "space-scene-video-05", title: "空间与场景视频项目 05", category: "视频制作", summary: "围绕空间与环境画面展开的视频项目，重点展示镜头选择、素材整理与基础色彩处理。", responsibilities: ["拍摄执行", "素材整理", "基础调色"], tools: ["视频制作与后期工具"], cover: videoPreviews["video-production-05"]?.poster ?? "/assets/generated/video-production-01.svg", previewVideo: videoPreviews["video-production-05"]?.previewVideo, gallery: [], duration: videoPreviews["video-production-05"]?.previewDurationLabel ?? "作品节选 · 待生成预览", featured: false, needsReview: true },
  { id: "work-05", slug: "visual-photography-01", title: "视觉内容拍摄项目 01", category: "摄影作品", summary: "从当前摄影素材中精选的空间、人物与静物画面。", responsibilities: ["静态拍摄", "画面选择", "基础后期"], tools: ["Lightroom"], cover: photo(2), gallery: [photo(2), photo(3), photo(4), photo(5), photo(6), photo(7)], duration: "6 张精选图片", featured: true, needsReview: true },
  { id: "work-06", slug: "visual-photography-02", title: "视觉内容拍摄项目 02", category: "摄影作品", summary: "围绕食物、质感与细节进行的静态视觉记录。", responsibilities: ["静态拍摄", "构图", "色彩整理"], tools: ["Lightroom"], cover: photo(1), gallery: [photo(1), photo(14), photo(15)], duration: "3 张精选图片", featured: false, needsReview: true },
  { id: "work-07", slug: "livestream-setup-01", title: "直播间搭建案例 01", category: "直播间搭建", summary: "基础机位、灯光与现场画面调试的实拍记录。", responsibilities: ["机位规划", "灯光调试", "推流测试"], tools: ["直播与画面调试工具"], cover: live(1), gallery: [live(1), live(2), live(3), live(4)], duration: "4 张现场图片", featured: true, needsReview: true }
];

export const workCategories: Array<"全部" | WorkCategory> = ["全部", "视频制作", "视频包装", "摄影作品", "直播间搭建"];
import { videoPreviews } from "@/data/video-previews";
