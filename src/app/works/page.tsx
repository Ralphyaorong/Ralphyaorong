import { SubpageHero } from "@/components/SubpageHero";
import { WorksGrid } from "@/components/WorksGrid";

export const metadata = { title: "作品" };

export default function WorksPage() {
  return (
    <>
      <SubpageHero eyebrow="WORKS" title="作品" description="围绕拍摄、剪辑、包装与直播现场整理的可观看作品节选。" image="/assets/generated/page-hero-works.webp" alt="Ralph Studio 在剪辑工作台检查拍摄设备" />
      <section className="page page--works page--after-hero"><WorksGrid /></section>
    </>
  );
}
