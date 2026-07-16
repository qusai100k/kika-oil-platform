import { describe,expect,it } from "vitest";
import { calculateCouponDiscount,canCancel,clampDiscount,money,normalizeCouponCode,safeOrderReference } from "./rules";
const now=new Date("2026-07-16T12:00:00Z");const base={type:"FIXED" as const,value:25,isActive:true,usageCount:0};
describe("commerce money and coupon rules",()=>{
  it("rounds money half up to two decimals",()=>expect(money("10.125").toString()).toBe("10.13"));
  it("normalizes coupon codes",()=>expect(normalizeCouponCode(" kika 10 ")).toBe("KIKA10"));
  it("applies fixed discounts",()=>expect(calculateCouponDiscount(base,200,now).discount.toString()).toBe("25"));
  it("applies percentage discounts",()=>expect(calculateCouponDiscount({...base,type:"PERCENTAGE",value:10},200,now).discount.toString()).toBe("20"));
  it("caps percentage discounts",()=>expect(calculateCouponDiscount({...base,type:"PERCENTAGE",value:50,maximumDiscount:30},200,now).discount.toString()).toBe("30"));
  it("prevents negative totals",()=>expect(clampDiscount(money(20),money(50)).toString()).toBe("20"));
  it("rejects inactive coupons",()=>expect(calculateCouponDiscount({...base,isActive:false},200,now).reason).toBe("INACTIVE"));
  it("rejects coupons before start",()=>expect(calculateCouponDiscount({...base,startsAt:new Date("2026-07-17")},200,now).reason).toBe("NOT_STARTED"));
  it("rejects expired coupons",()=>expect(calculateCouponDiscount({...base,endsAt:new Date("2026-07-15")},200,now).reason).toBe("EXPIRED"));
  it("enforces minimum subtotal",()=>expect(calculateCouponDiscount({...base,minimumSubtotal:250},200,now).reason).toBe("MINIMUM"));
  it("enforces total usage limit",()=>expect(calculateCouponDiscount({...base,usageLimit:2,usageCount:2},200,now).reason).toBe("LIMIT_REACHED"));
  it("accepts usage below limit",()=>expect(calculateCouponDiscount({...base,usageLimit:2,usageCount:1},200,now).valid).toBe(true));
});
describe("order safety rules",()=>{
  it("allows cancellation before fulfillment",()=>expect(canCancel("CONFIRMED")).toBe(true));
  it("allows awaiting transfer cancellation",()=>expect(canCancel("PENDING_PAYMENT")).toBe(true));
  it("prevents cancellation after shipment",()=>expect(canCancel("SHIPPED")).toBe(false));
  it("prevents repeated cancelled-state cancellation",()=>expect(canCancel("CANCELLED")).toBe(false));
  it("accepts generated order reference shape",()=>expect(safeOrderReference("KIKA-260716-AB12")).toBe(true));
  it("rejects enumerable malformed references",()=>expect(safeOrderReference("1")).toBe(false));
});
