import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ProductStatus, RecordStatus } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required to seed DEMO DATA.");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  // DEMO DATA — UNVERIFIED — NOT APPROVED FOR REAL COMMERCIAL USE.
  const face = await prisma.productCategory.upsert({ where: { slug: "demo-face-oils" }, update: {}, create: { slug: "demo-face-oils", nameAr: "زيوت الوجه التجريبية", descriptionAr: "فئة عرض غير معتمدة.", status: RecordStatus.ACTIVE } });
  const simple = await prisma.productCategory.upsert({ where: { slug: "demo-simple-care" }, update: {}, create: { slug: "demo-simple-care", nameAr: "العناية البسيطة التجريبية", descriptionAr: "فئة عرض غير معتمدة.", status: RecordStatus.ACTIVE } });

  const products = [
    { slug: "daily-balance-oil", nameAr: "زيت التوازن اليومي", categoryId: face.id, price: "180.00", sku: "DEMO-DBO-15", size: "15 مل" },
    { slug: "gentle-night-oil", nameAr: "زيت المساء اللطيف", categoryId: face.id, price: "220.00", sku: "DEMO-GNO-30", size: "30 مل" },
    { slug: "simple-care-oil", nameAr: "زيت العناية البسيطة", categoryId: simple.id, price: "160.00", sku: "DEMO-SCO-15", size: "15 مل" },
  ];
  for (const item of products) {
    await prisma.product.upsert({ where: { slug: item.slug }, update: {}, create: { slug: item.slug, nameAr: item.nameAr, categoryId: item.categoryId, shortDescriptionAr: "وصف تجريبي غير موثق، للعرض التقني فقط.", descriptionAr: "منتج خيالي لا يمثل تركيبة أو ادعاء تجاريًا حقيقيًا.", usageAr: "طريقة الاستخدام قيد الاعتماد.", safetyNoticeAr: "تحذيرات السلامة قيد مراجعة مختص.", status: ProductStatus.DRAFT, variants: { create: { sku: item.sku, nameAr: item.size, sizeLabel: item.size, price: item.price, currency: "XXX", stock: 12 } } } });
  }

  for (const item of [{ slug: "demo-botanical-base", nameAr: "مكوّن نباتي تجريبي" }, { slug: "demo-neutral-oil", nameAr: "زيت محايد تجريبي" }]) await prisma.ingredient.upsert({ where: { slug: item.slug }, update: {}, create: { ...item, descriptionAr: "اسم عام غير معتمد ولا يصف منتجًا حقيقيًا.", isDemo: true } });
  for (const item of [{ slug: "demo-dry", nameAr: "جافة — تصنيف تجريبي" }, { slug: "demo-combination", nameAr: "مختلطة — تصنيف تجريبي" }, { slug: "demo-unsure", nameAr: "غير متأكدة" }]) await prisma.skinType.upsert({ where: { slug: item.slug }, update: {}, create: item });
  for (const item of [{ slug: "demo-comfort", nameAr: "الشعور بالراحة — تجريبي" }, { slug: "demo-simple-routine", nameAr: "روتين أبسط — تجريبي" }]) await prisma.skinConcern.upsert({ where: { slug: item.slug }, update: {}, create: item });
  await prisma.siteSetting.upsert({ where: { key: "demo_data_notice" }, update: {}, create: { key: "demo_data_notice", value: { demo: true, verified: false, commercialUseApproved: false }, isPublic: true } });
}

main().finally(() => prisma.$disconnect());
