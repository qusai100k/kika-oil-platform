import { Prisma } from "../../../generated/prisma/client";

type MoneyInput = string | number | Prisma.Decimal;
export const money = (value: MoneyInput) => new Prisma.Decimal(value).toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);
export const normalizeCouponCode = (value: string) => value.trim().toUpperCase().replace(/\s+/g, "");
export const clampDiscount = (subtotal: Prisma.Decimal, discount: Prisma.Decimal) => Prisma.Decimal.max(0, Prisma.Decimal.min(subtotal, discount)).toDecimalPlaces(2);

export type CouponRule = { type:"FIXED"|"PERCENTAGE"; value:MoneyInput; minimumSubtotal?:MoneyInput|null; maximumDiscount?:MoneyInput|null; startsAt?:Date|null; endsAt?:Date|null; isActive:boolean; usageLimit?:number|null; usageCount:number };
export function calculateCouponDiscount(rule:CouponRule, subtotalInput:MoneyInput, now=new Date()) {
  const subtotal=money(subtotalInput);
  if(!rule.isActive) return {valid:false,discount:money(0),reason:"INACTIVE"} as const;
  if(rule.startsAt&&rule.startsAt>now) return {valid:false,discount:money(0),reason:"NOT_STARTED"} as const;
  if(rule.endsAt&&rule.endsAt<now) return {valid:false,discount:money(0),reason:"EXPIRED"} as const;
  if(rule.usageLimit!==null&&rule.usageLimit!==undefined&&rule.usageCount>=rule.usageLimit) return {valid:false,discount:money(0),reason:"LIMIT_REACHED"} as const;
  if(rule.minimumSubtotal&&subtotal.lt(rule.minimumSubtotal)) return {valid:false,discount:money(0),reason:"MINIMUM"} as const;
  let discount=rule.type==="PERCENTAGE"?subtotal.mul(rule.value).div(100):money(rule.value);
  if(rule.maximumDiscount) discount=Prisma.Decimal.min(discount,rule.maximumDiscount);
  return {valid:true,discount:clampDiscount(subtotal,money(discount)),reason:null} as const;
}

export const cancellableStatuses = new Set(["PENDING_PAYMENT","PAYMENT_REVIEW","CONFIRMED"]);
export function canCancel(status:string){return cancellableStatuses.has(status)}
export function safeOrderReference(value:string){return /^KIKA-[A-Z0-9]{6}-[A-Z0-9]{4}$/.test(value)}
