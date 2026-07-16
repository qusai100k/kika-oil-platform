import type { Metadata, Viewport } from "next";
import { Noto_Kufi_Arabic, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const bodyFont = Noto_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-arabic", display: "swap" });
const displayFont = Noto_Kufi_Arabic({ subsets: ["arabic"], weight: ["500", "600"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "زيت كيكا | عناية بهدوء ووضوح", template: "%s | زيت كيكا" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "ar_EG", siteName: siteConfig.name, url: "/", title: "منصة زيت كيكا", description: siteConfig.description, images: [{ url: "/images/hero-still-life.webp", width: 1536, height: 1024, alt: "عبوات عناية تجريبية غير موسومة" }] },
  twitter: { card: "summary_large_image", title: "منصة زيت كيكا", description: siteConfig.description, images: ["/images/hero-still-life.webp"] },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fbf7ef" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ar" dir="rtl" className={`${bodyFont.variable} ${displayFont.variable}`}><body><a className="skip-link" href="#main-content">تخطي إلى المحتوى</a><SiteHeader /><main className="page-main" id="main-content" tabIndex={-1}>{children}</main><SiteFooter /></body></html>; }
