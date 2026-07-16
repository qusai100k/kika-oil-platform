import Image from "next/image";
import { cn } from "@/lib/utils";

export function ResponsiveImage({ alt, tone = "sand", position = "center", priority = false }: { alt: string; tone?: "sand" | "rose" | "sage"; position?: string; priority?: boolean }) {
  return <div className={cn("product-visual", `product-visual--${tone}`)}><Image src="/images/product-still-life.webp" alt={alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={priority} style={{ objectFit: "cover", objectPosition: position }} /><span className="product-visual__wash" aria-hidden /></div>;
}
