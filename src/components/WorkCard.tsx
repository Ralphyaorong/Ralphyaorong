import Link from "next/link";
import type { Work } from "@/data/works";
import { assetUrl } from "@/lib/assets";

type WorkCardProps = {
  work: Work;
  priority?: boolean;
  index?: number;
  className?: string;
};

export function WorkCard({ work, priority = false, index, className = "" }: WorkCardProps) {
  const frame = index === undefined ? null : String(index + 1).padStart(2, "0");

  return <article className={`work-card ${className}`.trim()}>
    <Link href={`/works/${work.slug}/`} className="work-image">
      <img src={assetUrl(work.cover)} alt={work.title} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
      {frame && <span className="work-image__frame" aria-hidden="true">FRAME {frame}</span>}
    </Link>
    <div className="work-meta">
      <p className="eyebrow">{work.category}</p>
      <h3><Link href={`/works/${work.slug}/`}>{work.title}</Link></h3>
      <p>{work.summary}</p>
      <div><span>{work.duration}</span><Link className="text-link" href={`/works/${work.slug}/`}>查看详情 <b>↗</b></Link></div>
    </div>
  </article>;
}
