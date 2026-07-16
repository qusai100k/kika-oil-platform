"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PaymentMethod } from "../../../generated/prisma/client";
import { requireSession } from "@/server/auth/session";
import { cancelOrder, placeOrder } from "./checkout";

const schema=z.object({addressId:z.string().uuid(),couponCode:z.string().trim().max(40).optional(),paymentMethod:z.nativeEnum(PaymentMethod),paymentReference:z.string().trim().max(100).optional(),customerNotes:z.string().trim().max(300).optional(),idempotencyKey:z.string().uuid()});
export async function submitOrder(formData:FormData){const {user}=await requireSession();const data=schema.parse(Object.fromEntries(formData));const order=await placeOrder({...data,userId:user.id});revalidatePath("/cart");revalidatePath("/account/orders");redirect(`/checkout/confirmation/${order.reference}`)}
export async function requestCancellation(reference:string,formData:FormData){const {user}=await requireSession();const reason=z.string().trim().min(3).max(300).parse(formData.get("reason"));await cancelOrder(user.id,reference,reason);revalidatePath(`/account/orders/${reference}`);revalidatePath("/account/orders")}
