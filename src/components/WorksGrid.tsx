"use client";

import { useState } from "react";
import { workCategories, works } from "@/data/works";
import { WorkCard } from "@/components/WorkCard";

export function WorksGrid() {
  const [current, setCurrent] = useState<(typeof workCategories)[number]>("全部");
  const visible = current === "全部" ? works : works.filter((work) => work.category === current);

  return <>
    <div className="filters" role="tablist" aria-label="作品分类">
      {workCategories.map((category) => {
        const count = category === "全部" ? works.length : works.filter((work) => work.category === category).length;
        return <button role="tab" aria-selected={current === category} className={current === category ? "active" : ""} key={category} onClick={() => setCurrent(category)}>{category} <span aria-hidden="true">{count}</span></button>;
      })}
    </div>
    <div className="works-grid works-grid--editorial">
      {visible.map((work, index) => <WorkCard key={work.id} work={work} index={index} priority={index < 3} className={index === 0 ? "work-card--lead" : ""} />)}
    </div>
  </>;
}
