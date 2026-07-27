import Link from "next/link";
import { CaseCard } from "@/components/CaseCard";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkCard } from "@/components/WorkCard";
import { cases } from "@/data/cases";
import { works } from "@/data/works";
import { assetUrl } from "@/lib/assets";

const capabilities = [["01", "视频内容制作", "基于摄像和视频制作经验，完成活动记录、商业短片、社交媒体视频以及空间场景内容的拍摄与制作。"], ["02", "后期剪辑与包装", "根据内容目标完成剪辑节奏、字幕包装、基础调色、声音处理以及多平台比例适配。"], ["03", "直播间基础搭建", "具备基础直播间搭建与画面调试经验，可完成机位、灯光、收音、推流测试和直播画面优化。"], ["04", "AI 工作流搭建", "将 AI 工具接入真实内容生产流程，搭建视频内容提取、ASR 转写、OCR 识别、脚本整理、字幕处理和自动化内容生产流程。"]];

export default function Home() { return <><section className="hero"><img src={assetUrl("/assets/home/hero.webp")} alt="Ralph Studio 影像创作现场" fetchPriority="high" /><div className="hero-shade" /><div className="hero-content"><p className="eyebrow">Visual Creator &amp; AI Workflow Builder</p><h1>Ralph <em>Studio</em></h1><p className="hero-skills">影像创作 · 后期制作 · AI 工作流搭建</p><p className="hero-copy">从影像创作到自动化流程设计，我关注如何把创意、执行与工具链连接起来，让内容生产更高效、更清晰、更可复用。</p><div className="button-row"><Link className="button button--primary" href="/works/">查看作品</Link><Link className="button" href="/cases/">查看案例</Link><Link className="button button--quiet" href="/contact/">联系我</Link></div></div><div className="scroll-cue">SCROLL <span /></div></section>
  <section className="section"><RevealOnScroll><SectionHeading eyebrow="SELECTED WORK" title="精选作品" text="聚焦影像制作、后期表达和现场执行的代表性实践。" /><div className="works-grid works-grid--featured">{works.filter((work) => work.featured).slice(0, 5).map((work) => <WorkCard key={work.id} work={work} />)}</div><Link className="section-link" href="/works/">浏览全部作品 <b>↗</b></Link></RevealOnScroll></section>
  <section className="section section--muted"><RevealOnScroll><SectionHeading eyebrow="CAPABILITY" title="创作与流程的两条路径" /><div className="capability-grid">{capabilities.map(([number, title, text]) => <article key={title} className="capability"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></RevealOnScroll></section>
  <section className="section"><RevealOnScroll><SectionHeading eyebrow="AI WORKFLOW" title="从工具到内容生产流程" text="不把 AI 视为孤立能力，而是作为内容生产环节中的辅助与连接。" /><div className="case-grid">{cases.filter((item) => item.category === "AI 工作流").slice(0, 2).map((item) => <CaseCard key={item.id} item={item} />)}</div><Link className="section-link" href="/cases/">查看全部案例 <b>↗</b></Link></RevealOnScroll></section>
  <section className="intro-band"><RevealOnScroll><p className="eyebrow">RALPH STUDIO</p><h2>把画面、节奏与流程<br />放在同一个工作视角里。</h2><p>从摄像和视频制作出发，也持续探索 AI 工具如何进入真实的内容生产场景。每个环节都强调清晰、可靠与可以继续使用。</p><Link className="text-link" href="/about/">了解工作方式 <b>↗</b></Link></RevealOnScroll></section>
  <section className="section contact-section"><RevealOnScroll><p className="eyebrow">CONTACT</p><h2>有新的内容项目，<br />或想聊聊工作流？</h2><Link className="button button--primary" href="/contact/">联系 Ralph Studio</Link></RevealOnScroll></section>
</>; }
