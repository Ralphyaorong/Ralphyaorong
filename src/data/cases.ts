export type CaseCategory = "AI 工作流" | "内容 IP" | "直播间搭建";
export type Case = {
  id: string; slug: string; title: string; category: CaseCategory; summary: string; problem: string; input?: string; process: string[]; results: string[]; responsibilities?: string[]; scenarios?: string; tools: string[]; cover: string; flowchart?: string; screenshots: string[]; featured: boolean; needsReview: boolean;
};
const flow = (number: number) => `/assets/cases/ai-workflow/workflow-${String(number).padStart(2, "0")}.png`;
const ip = (number: number) => `/assets/cases/ip-projects/project-${String(number).padStart(2, "0")}.webp`;
const live = (number: number) => `/assets/cases/livestream/scene-${String(number).padStart(2, "0")}.webp`;

export const cases: Case[] = [
  { id: "case-01", slug: "content-production-workflow", title: "内容生产协同工作流 01", category: "AI 工作流", summary: "将素材整理、内容辅助与交付检查连接为可复用的内容生产流程。", problem: "重复性整理与信息确认会打断内容生产节奏，需要一个清晰、可追溯的协同路径。", process: ["整理输入素材与任务信息", "按节点执行识别、转写或内容辅助", "人工复核关键内容", "输出可继续编辑的结果"], results: ["更清晰的处理步骤", "可复用的内容整理结构", "保留人工审核节点"], tools: ["本地工具", "AI 辅助工具", "内容生产软件"], cover: flow(1), flowchart: flow(1), screenshots: [flow(1), flow(2)], featured: true, needsReview: true },
  { id: "case-02", slug: "script-assist-workflow", title: "脚本整理辅助工作流 02", category: "AI 工作流", summary: "围绕脚本创作与信息整理建立的辅助流程界面。", problem: "内容输入分散、结构不统一时，脚本整理和后续执行容易反复返工。", process: ["输入原始内容", "提取与归纳核心信息", "组织为脚本结构", "人工确认后进入制作"], results: ["减少重复整理", "保持脚本可编辑", "明确人工判断边界"], tools: ["AI 辅助工具", "文档工具", "内容生产软件"], cover: flow(5), flowchart: flow(5), screenshots: [flow(5), flow(6)], featured: true, needsReview: true },
  { id: "case-03", slug: "content-review-workflow", title: "内容审查工作流 03", category: "AI 工作流", summary: "以内容发布前检查为目标的工作台式流程展示。", problem: "发布前需要在效率与必要审查之间取得平衡，避免遗漏关键检查点。", process: ["导入待检查内容", "按预设项目进行整理", "标记需要人工确认的内容", "输出检查结果供继续处理"], results: ["统一检查入口", "降低遗漏风险", "结果保留复核空间"], tools: ["本地工具", "AI 辅助工具"], cover: flow(3), flowchart: flow(3), screenshots: [flow(3), flow(4)], featured: false, needsReview: true },
  { id: "case-04", slug: "content-ip-project-01", title: "内容 IP 视觉项目 01", category: "内容 IP", summary: "以真实素材记录为基础的内容项目视觉实践。", problem: "内容项目需要稳定的视觉素材与可持续的执行方式。", process: ["确定内容拍摄方向", "完成现场素材记录", "筛选并整理可用画面", "用于后续内容表达"], results: ["形成可持续使用的视觉素材", "为内容发布保留统一画面基础"], tools: ["Camera", "Lightroom", "Premiere Pro"], cover: ip(1), screenshots: [ip(1), ip(2)], featured: true, needsReview: true },
  { id: "case-05", slug: "livestream-scene-01", title: "直播场景搭建案例 01", category: "直播间搭建", summary: "从现场照片呈现基础直播场景与画面调试实践。", problem: "直播场景需要在现有空间内兼顾机位、收音、灯光与画面稳定性。", process: ["评估场地与机位", "布置基础灯光与收音", "测试推流画面", "现场微调并记录"], results: ["完成基础画面调试", "形成可复用的现场搭建参考"], tools: ["Camera", "Lighting", "Streaming"], cover: live(1), screenshots: [live(1), live(2), live(3), live(4)], featured: false, needsReview: true }
];
