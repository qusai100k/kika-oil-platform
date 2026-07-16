import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { demoProducts } from "@/constants/content";
export default function sitemap(): MetadataRoute.Sitemap { const routes = ["", "/products", "/about", "/contact", "/skin-assessment", "/faq", "/privacy", "/terms", "/shipping", "/returns", "/product-disclaimer", "/consultation-disclaimer"]; return [...routes.map((route) => ({ url: `${siteConfig.url}${route}`, changeFrequency: "weekly" as const, priority: route === "" ? 1 : .7 })), ...demoProducts.map((product) => ({ url: `${siteConfig.url}/products/${product.slug}`, changeFrequency: "weekly" as const, priority: .6 }))]; }
