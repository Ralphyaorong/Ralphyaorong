"use client";
import { useEffect, useState } from "react";
import { assetUrl } from "@/lib/assets";

export function VideoPreview({ cover, title, source }: { cover: string; title: string; source?: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!open) return; const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; document.body.style.overflow = "hidden"; window.addEventListener("keydown", close); return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); }; }, [open]);
  return <>{source ? <button className="media-play" onClick={() => setOpen(true)}><img src={assetUrl(cover)} alt={`${title} 封面`} loading="lazy" /><span>播放作品节选</span></button> : <div className="media-pending"><img src={assetUrl(cover)} alt={`${title} 预览封面`} loading="lazy" /><span>作品节选待补充</span></div>}{open && source && <div className="lightbox video-modal" role="dialog" aria-modal="true" aria-label={`${title} 视频播放`} onClick={() => setOpen(false)}><button className="lightbox-close" onClick={() => setOpen(false)} aria-label="关闭视频">×</button><video controls autoPlay playsInline src={assetUrl(source)} onClick={(event) => event.stopPropagation()}>你的浏览器不支持视频播放。</video></div>}</>;
}
