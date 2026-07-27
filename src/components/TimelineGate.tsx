"use client";

import { FormEvent, useEffect, useState } from "react";

const timeline = [
  { time: "2012 — 2014", title: "技术执行的起点", role: "无人机操作与通信保障", text: "在任务执行与设备维护中建立对现场协作、稳定性和技术细节的早期理解。" },
  { time: "2014 — 2018", title: "进入影像创作", role: "商业与空间影像拍摄", text: "从酒店与活动场景出发，持续积累宣传拍摄、会议记录、餐饮与空间画面的执行经验。" },
  { time: "2018 — 2022", title: "独立制作阶段", role: "摄影 / 摄像 / 剪辑", text: "完成会议活动、婚礼现场、培训课程与短视频等不同场景的拍摄、剪辑和交付，逐步建立从拍摄到成片的完整工作视角。" },
  { time: "2018 — 2021", title: "系统学习与管理视角", role: "行政管理专业学习", text: "在影像实践之外补充管理、信息技术、统计与市场相关知识，为内容生产的组织方式建立更多理解。" },
  { time: "2022 — 2025", title: "内容生产与直播实践", role: "视觉内容创作与现场执行", text: "参与社交内容、活动影像、项目宣传与个人 IP 内容的生产；同时积累直播间机位、灯光、收音、推流测试和现场调试经验。" },
  { time: "2025 — 至今", title: "从单点制作走向流程设计", role: "Visual Creator & AI Workflow Builder", text: "将视频内容提取、ASR 转写、OCR 识别、脚本整理、字幕处理与发布前检查连接为可复用的内容生产工作流。" }
] as const;

const password = ["yao", "rong"].join("");
const storageKey = "ralph-studio-timeline-access";

export function TimelineGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { setUnlocked(sessionStorage.getItem(storageKey) === "granted"); }, []);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (value === password) { sessionStorage.setItem(storageKey, "granted"); setUnlocked(true); setError(""); return; } setError("密钥不正确，请重新输入。"); }
  if (!unlocked) return <section className="timeline-gate page"><div className="timeline-gate__inner"><p className="eyebrow">PRIVATE TIMELINE</p><h1>个人发展时间轴</h1><p>此页面包含个人经历整理，请输入访问密钥后查看。</p><form onSubmit={submit}><label htmlFor="timeline-password">访问密钥</label><div><input id="timeline-password" type="password" value={value} onChange={(event) => setValue(event.target.value)} autoComplete="current-password" required /><button className="button button--primary" type="submit">进入时间轴</button></div><p className="timeline-gate__error" aria-live="polite">{error}</p></form></div></section>;
  return <section className="timeline-page page"><header className="timeline-intro"><p className="eyebrow">DEVELOPMENT TIMELINE</p><h1>个人发展时间轴</h1><p>从技术执行、影像创作到 AI 内容工作流搭建，一段持续靠近“创意、执行与工具链协同”的实践路径。</p></header><div className="timeline-list">{timeline.map((item, index) => <article className="timeline-item" key={item.time}><div className="timeline-item__time">{item.time}</div><div className="timeline-item__marker" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span></div><div className="timeline-item__content"><p className="eyebrow">{item.role}</p><h2>{item.title}</h2><p>{item.text}</p></div></article>)}</div></section>;
}
