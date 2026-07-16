import { formatPrice } from "@/lib/utils";
export function PriceDisplay({ amount, currency }: { amount: number; currency: string }) { return <span className="price">{formatPrice(amount, currency)}</span>; }
