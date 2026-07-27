import Link from "next/link";
export default function NotFound() { return <section className="not-found"><p className="eyebrow">404</p><h1>页面未找到</h1><p>这个页面可能尚未生成，或链接地址需要确认。</p><Link className="button button--primary" href="/">返回首页</Link></section>; }
