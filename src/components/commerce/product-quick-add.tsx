import { addProductBySlug } from "@/server/commerce/cart-actions";
export function ProductQuickAdd({slug}:{slug:string}){return <form action={addProductBySlug} className="quick-add"><input type="hidden" name="slug" value={slug}/><button className="text-button">أضيفي إلى السلة</button></form>}
