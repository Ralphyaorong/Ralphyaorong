import { WorksGrid } from "@/components/WorksGrid";
export const metadata = { title: "作品" };
export default function WorksPage() { return <section className="page page--works"><div className="page-intro"><p className="eyebrow">WORKS</p><h1>作品</h1><p>视频制作、后期包装、摄影作品与直播现场搭建的真实素材整理。</p></div><WorksGrid /></section>; }
