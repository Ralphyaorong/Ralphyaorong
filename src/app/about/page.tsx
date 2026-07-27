import Link from "next/link";
import { assetUrl } from "@/lib/assets";

export const metadata = { title: "关于" };

export default function AboutPage() {
  return <section className="about"><div className="page-intro"><p className="eyebrow">ABOUT</p><h1>关于 Ralph Studio</h1></div><div className="about-grid"><div className="about-copy"><p>Ralph Studio 是我的个人作品展示空间，记录我在视频制作、后期剪辑、直播间基础搭建和 AI 工作流搭建中的实践。</p><p>我从摄像和视频制作出发，熟悉内容从拍摄、剪辑、包装到发布的完整流程。除了传统的视频制作能力，我也在探索如何把 AI 工具接入真实内容生产场景，包括视频内容提取、语音转写、字幕整理、脚本辅助生成、素材管理和自动化处理。</p><p>相比单一技能展示，我更关注如何把创意、执行和工具链连接起来，让内容生产更稳定、更高效、更可复用。</p><Link className="text-link about-timeline-link" href="/timeline/">查看个人发展时间轴 <b>↗</b></Link></div><img src={assetUrl("/assets/home/hero.webp")} alt="Ralph Studio 工作氛围" loading="lazy" /></div><div className="about-points"><div><p className="eyebrow">DIRECTION</p><h2>工作方向</h2><p>视频内容制作、后期剪辑与包装、直播间基础搭建、AI 工作流设计与落地。</p></div><div><p className="eyebrow">METHOD</p><h2>工作方式</h2><p>从内容目标出发，连接拍摄、剪辑和工具流程，在可控的执行中保持画面与交付的清晰度。</p></div><div><p className="eyebrow">TOOLS</p><h2>常用工具</h2><p>DaVinci Resolve · After Effects · Lightroom · GPT · Codex</p></div></div></section>;
}
