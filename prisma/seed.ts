import { PrismaPg } from "@prisma/adapter-pg";
import { CouponType, PrismaClient, ProductStatus, RecordStatus } from "../generated/prisma/client";

const connectionString=process.env.DATABASE_URL;if(!connectionString)throw new Error("DATABASE_URL is required to seed DEMO DATA.");const prisma=new PrismaClient({adapter:new PrismaPg({connectionString})});
async function main(){
  const face=await prisma.productCategory.upsert({where:{slug:"demo-face-oils"},update:{status:RecordStatus.ACTIVE},create:{slug:"demo-face-oils",nameAr:"زيوت الوجه التجريبية",descriptionAr:"فئة تطوير غير معتمدة تجاريًا.",status:RecordStatus.ACTIVE}});
  const simple=await prisma.productCategory.upsert({where:{slug:"demo-simple-care"},update:{status:RecordStatus.ACTIVE},create:{slug:"demo-simple-care",nameAr:"العناية البسيطة التجريبية",descriptionAr:"فئة تطوير غير معتمدة تجاريًا.",status:RecordStatus.ACTIVE}});
  const products=[
    {slug:"daily-balance-oil",nameAr:"زيت التوازن اليومي",categoryId:face.id,sku:"DEMO-DBO-15",size:"15 مل",price:"180.00",stock:12},
    {slug:"gentle-night-oil",nameAr:"زيت المساء اللطيف",categoryId:face.id,sku:"DEMO-GNO-30",size:"30 مل",price:"220.00",stock:2},
    {slug:"simple-care-oil",nameAr:"زيت العناية البسيطة",categoryId:simple.id,sku:"DEMO-SCO-15",size:"15 مل",price:"160.00",stock:0},
    {slug:"soft-routine-oil",nameAr:"زيت الروتين الهادئ",categoryId:face.id,sku:"DEMO-SRO-30",size:"30 مل",price:"195.00",stock:8},
    {slug:"everyday-oil",nameAr:"زيت كل يوم",categoryId:simple.id,sku:"DEMO-EDO-15",size:"15 مل",price:"150.00",stock:6},
  ];
  for(const item of products){const product=await prisma.product.upsert({where:{slug:item.slug},update:{nameAr:item.nameAr,categoryId:item.categoryId,status:ProductStatus.ACTIVE,deletedAt:null},create:{slug:item.slug,nameAr:item.nameAr,categoryId:item.categoryId,shortDescriptionAr:"بيانات تجريبية للعرض التقني فقط.",descriptionAr:"منتج خيالي لا يمثل تركيبة أو ادعاء تجاريًا حقيقيًا.",usageAr:"طريقة الاستخدام قيد الاعتماد.",safetyNoticeAr:"تحذيرات السلامة قيد مراجعة مختص.",status:ProductStatus.ACTIVE}});await prisma.productVariant.upsert({where:{sku:item.sku},update:{productId:product.id,nameAr:item.size,sizeLabel:item.size,price:item.price,currency:"XXX",stock:item.stock,isActive:true,deletedAt:null},create:{productId:product.id,sku:item.sku,nameAr:item.size,sizeLabel:item.size,price:item.price,currency:"XXX",stock:item.stock,isActive:true}});}
  const now=new Date(),yesterday=new Date(now.getTime()-86400000),tomorrow=new Date(now.getTime()+86400000*30);
  const coupons=[
    {code:"KIKA10",type:CouponType.PERCENTAGE,value:"10",minimumSubtotal:"100",maximumDiscount:"50",startsAt:yesterday,endsAt:tomorrow,usageLimit:100,perCustomerLimit:1,isActive:true},
    {code:"WELCOME25",type:CouponType.FIXED,value:"25",minimumSubtotal:"200",maximumDiscount:null,startsAt:yesterday,endsAt:tomorrow,usageLimit:20,perCustomerLimit:1,isActive:true},
    {code:"EXPIRED10",type:CouponType.PERCENTAGE,value:"10",minimumSubtotal:null,maximumDiscount:null,startsAt:new Date(now.getTime()-86400000*30),endsAt:yesterday,usageLimit:100,perCustomerLimit:1,isActive:true},
    {code:"LIMITED5",type:CouponType.FIXED,value:"5",minimumSubtotal:null,maximumDiscount:null,startsAt:yesterday,endsAt:tomorrow,usageLimit:1,perCustomerLimit:1,isActive:true},
  ];
  for(const c of coupons)await prisma.coupon.upsert({where:{code:c.code},update:{...c,currency:"XXX",isDemo:true},create:{...c,currency:"XXX",isDemo:true}});
  await prisma.siteSetting.upsert({where:{key:"phase4_commerce_demo"},update:{value:{demo:true,currency:"XXX",shipping:25,cod:true,bankTransfer:true}},create:{key:"phase4_commerce_demo",value:{demo:true,currency:"XXX",shipping:25,cod:true,bankTransfer:true},isPublic:false}});
}
main().finally(()=>prisma.$disconnect());
