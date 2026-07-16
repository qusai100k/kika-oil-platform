"use client";import { deleteAddress } from "@/server/account/actions";
export function DeleteAddressButton({id}:{id:string}){return <button className="text-button danger" onClick={async()=>{if(window.confirm("هل تريدين حذف هذا العنوان؟"))await deleteAddress(id)}}>حذف</button>}
