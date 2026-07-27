"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [{ href: "/", label: "首页" }, { href: "/works/", label: "作品" }, { href: "/cases/", label: "案例" }, { href: "/about/", label: "关于" }, { href: "/contact/", label: "联系" }];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", escape); return () => window.removeEventListener("keydown", escape);
  }, []);
  return <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
    <Link className="brand" href="/" onClick={() => setMenuOpen(false)}>Ralph<span>Studio</span></Link>
    <nav className="desktop-nav" aria-label="主导航">{navItems.map((item) => <Link className={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "active" : ""} key={item.href} href={item.href}>{item.label}</Link>)}</nav>
    <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /><span className="sr-only">打开菜单</span></button>
    <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`} aria-label="移动导航">{navItems.map((item) => <Link className={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "active" : ""} key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}</nav>
  </header>;
}
