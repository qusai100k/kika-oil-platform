"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireSession } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { addVariant } from "./cart";
import { commerceConfig } from "@/config/commerce";

const quantitySchema=z.coerce.number().int().min(1).max(commerceConfig.maxCartQuantity);
const refresh=()=>{revalidatePath("/cart");revalidatePath("/checkout");revalidatePath("/", "layout")};
export async function addToCart(formData:FormData){const {user}=await requireSession();const variantId=z.string().uuid().parse(formData.get("variantId"));await addVariant(user.id,variantId,quantitySchema.parse(formData.get("quantity")??1));refresh();redirect("/cart");}
export async function addProductBySlug(formData:FormData){const {user}=await requireSession();const slug=z.string().trim().min(1).max(120).parse(formData.get("slug"));const variant=await getDb().productVariant.findFirst({where:{product:{slug,status:"ACTIVE",deletedAt:null},isActive:true,deletedAt:null,stock:{gt:0}},orderBy:{createdAt:"asc"}});if(!variant)throw new Error("UNAVAILABLE");await addVariant(user.id,variant.id,1);refresh();redirect("/cart");}
export async function setCartQuantity(itemId:string,formData:FormData){const {user}=await requireSession();const quantity=quantitySchema.parse(formData.get("quantity"));const item=await getDb().cartItem.findFirst({where:{id:itemId,cart:{userId:user.id}},include:{variant:true}});if(!item)throw new Error("NOT_FOUND");if(quantity>item.variant.stock)throw new Error("INSUFFICIENT_STOCK");await getDb().cartItem.update({where:{id:item.id},data:{quantity}});refresh();}
export async function removeCartItem(itemId:string){const {user}=await requireSession();await getDb().cartItem.deleteMany({where:{id:itemId,cart:{userId:user.id}}});refresh();}
export async function clearCart(){const {user}=await requireSession();const cart=await getDb().cart.findUnique({where:{userId:user.id}});if(cart)await getDb().cartItem.deleteMany({where:{cartId:cart.id}});refresh();}
