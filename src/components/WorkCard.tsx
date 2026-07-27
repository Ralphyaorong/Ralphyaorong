import Link from "next/link";
import type { Work } from "@/data/works";
import { assetUrl } from "@/lib/assets";
export function WorkCard({ work }: { work: Work }) { return <article className="work-card"><Link href={`/works/${work.slug}/`} className="work-image"><img src={assetUrl(work.cover)} alt={work.title} loading="lazy" /></Link><div className="work-meta"><p className="eyebrow">{work.category}</p><h3><Link href={`/works/${work.slug}/`}>{work.title}</Link></h3><p>{work.summary}</p><div><span>{work.duration}</span><Link className="text-link" href={`/works/${work.slug}/`}>查看详情 <b>↗</b></Link></div></div></article>; }
