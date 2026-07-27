"use client";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
export function RevealOnScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = ref.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { node.classList.add("is-visible"); observer.unobserve(node); } }, { threshold: 0.1 }); observer.observe(node); return () => observer.disconnect(); }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
