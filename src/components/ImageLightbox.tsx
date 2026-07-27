"use client";
import { useEffect, useState } from "react";
import { assetUrl } from "@/lib/assets";

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => { if (!selected) return; const close = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); }; document.body.style.overflow = "hidden"; window.addEventListener("keydown", close); return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); }; }, [selected]);
  if (!images.length) return null;
  return <><div className="gallery">{images.map((image, index) => <button key={image} className="gallery-item" onClick={() => setSelected(image)}><img src={assetUrl(image)} alt={`${alt}，图片 ${index + 1}`} loading="lazy" /></button>)}</div>{selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label="图片预览" onClick={() => setSelected(null)}><button className="lightbox-close" onClick={() => setSelected(null)} aria-label="关闭图片预览">×</button><img src={assetUrl(selected)} alt={alt} onClick={(event) => event.stopPropagation()} /></div>}</>;
}
