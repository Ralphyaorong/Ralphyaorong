import { WorksGrid } from "@/components/WorksGrid";
export const metadata = { title: "作品" };
export default function WorksPage() { return <section className="page page--works"><div className="page-intro"><p className="eyebrow">WORKS</p><h1>作品</h1><p>围绕拍摄、剪辑、包装与直播现场整理的可观看作品节选。</p></div><WorksGrid /></section>; }
