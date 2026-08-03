import { CaseCard } from "@/components/CaseCard";
import { SubpageHero } from "@/components/SubpageHero";
import { cases } from "@/data/cases";

export const metadata = { title: "案例" };

export default function CasesPage() {
  return (
    <>
      <SubpageHero eyebrow="CASES" title="案例" description="从 AI 工作流，到内容项目和直播场景；以素材、流程和真实执行为基础呈现。" image="/assets/generated/page-hero-cases.webp" alt="暗色工作台与内容生产流程系统墙" />
      <section className="page page--after-hero">
        <div className="case-index">
          {(["AI 工作流", "内容 IP", "直播间搭建"] as const).map((category) => {
            const items = cases.filter((item) => item.category === category);
            return <section key={category}>
              <div className="category-heading"><p className="eyebrow">{category === "AI 工作流" ? "WORKFLOW" : "PRACTICE"}</p><h2>{category}</h2></div>
              <div className="case-grid">{items.map((item, index) => <CaseCard item={item} key={item.id} index={index} priority={category === "AI 工作流" && index < 2} />)}</div>
            </section>;
          })}
        </div>
      </section>
    </>
  );
}
