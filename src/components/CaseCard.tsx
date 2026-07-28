import Link from "next/link";
import type { Case } from "@/data/cases";
import { assetUrl } from "@/lib/assets";

type CaseCardProps = { item: Case; priority?: boolean; index?: number };

export function CaseCard({ item, priority = false, index }: CaseCardProps) {
  const isWorkflow = item.category === "AI 工作流";
  const record = index === undefined ? null : String(index + 1).padStart(2, "0");

  return <article className={`case-card${isWorkflow ? " case-card--workflow" : ""}`}>
    <Link href={`/cases/${item.slug}/`} className="case-card__media">
      <img src={assetUrl(item.cover)} alt={item.title} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
      {isWorkflow && <span className="case-card__record" aria-hidden="true">SYSTEM RECORD {record ?? ""}</span>}
    </Link>
    <div>
      <p className="eyebrow">{item.category}</p>
      <h3><Link href={`/cases/${item.slug}/`}>{item.title}</Link></h3>
      <p>{item.summary}</p>
      <dl className="case-card__route"><div><dt>输入</dt><dd>{item.input ?? "待整理的内容素材"}</dd></div><div><dt>输出</dt><dd>{item.results[0] ?? "可继续使用的内容结果"}</dd></div></dl>
      <Link className="text-link" href={`/cases/${item.slug}/`}>查看案例 <b>↗</b></Link>
    </div>
  </article>;
}
