import { CaseCard } from "@/components/CaseCard";
import { cases } from "@/data/cases";
export const metadata = { title: "案例" };
export default function CasesPage() { return <section className="page"><div className="page-intro"><p className="eyebrow">CASES</p><h1>案例</h1><p>从 AI 工作流，到内容项目和直播场景；以素材、流程和真实执行为基础呈现。</p></div><div className="case-index">{(["AI 工作流", "内容 IP", "直播间搭建"] as const).map((category) => <section key={category}><div className="category-heading"><p className="eyebrow">{category === "AI 工作流" ? "WORKFLOW" : "PRACTICE"}</p><h2>{category}</h2></div><div className="case-grid">{cases.filter((item) => item.category === category).map((item) => <CaseCard item={item} key={item.id} />)}</div></section>)}</div></section>; }
