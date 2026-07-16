import Link from "next/link";
import type { DemoProduct } from "@/constants/content";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PriceDisplay } from "@/components/product/price-display";
import { ResponsiveImage } from "@/components/shared/responsive-image";
export function ProductCard({ product }: { product: DemoProduct }) { return <Card className="product-card"><Link className="product-card__image-link" href={`/products/${product.slug}`} aria-label={`عرض ${product.name}`}><ResponsiveImage alt={`صورة عبوة ${product.name}`} tone={product.tone} position={product.imagePosition} />{product.badge ? <span className="product-card__badge">{product.badge}</span> : null}</Link><div className="product-card__body"><div className="product-card__meta"><Badge>{product.category}</Badge><span className={product.available ? "availability" : "availability availability--soon"}>{product.availability}</span></div><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3><p>{product.description}</p><div className="product-card__footer"><PriceDisplay amount={product.price} currency={product.currency} /><span>{product.sizes.join(" · ")}</span></div></div></Card>; }
