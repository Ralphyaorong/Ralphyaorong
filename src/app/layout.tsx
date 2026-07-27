import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/config/site";

export const metadata: Metadata = { title: { default: "Ralph Studio｜Visual Creator & AI Workflow Builder", template: "%s｜Ralph Studio" }, description: site.description, icons: { icon: "/favicon.svg" }, manifest: "/manifest.webmanifest", robots: { index: true, follow: true }, openGraph: { title: "Ralph Studio｜Visual Creator & AI Workflow Builder", description: site.description, type: "website" } };
export const viewport: Viewport = { themeColor: "#080C0E", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body><Header /><main>{children}</main><Footer /></body></html>; }
