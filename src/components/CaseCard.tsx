import Link from "next/link";
import type { Case } from "@/data/cases";
import { assetUrl } from "@/lib/assets";
export function CaseCard({ item }: { item: Case }) { return <article className="case-card"><Link href={`/cases/${item.slug}/`}><img src={assetUrl(item.cover)} alt={item.title} loading="lazy" /></Link><div><p className="eyebrow">{item.category}</p><h3><Link href={`/cases/${item.slug}/`}>{item.title}</Link></h3><p>{item.summary}</p><dl className="case-card__route"><div><dt>输入</dt><dd>{item.input ?? "待整理的内容素材"}</dd></div><div><dt>输出</dt><dd>{item.results[0] ?? "可继续使用的内容结果"}</dd></div></dl><Link className="text-link" href={`/cases/${item.slug}/`}>查看案例 <b>↗</b></Link></div></article>; }
