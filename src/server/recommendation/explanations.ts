import type { ScoredProduct } from "./types";

const banned = /سيعالج|سيشفي|مضمون|الأفضل طبيًا|مناسب 100%|نتيجة مؤكدة/i;

export function explanationFor(item: ScoredProduct) {
  const parts = [
    `تم اختيار ${item.product.nameAr} لأنه حقق مستوى مطابقة ${item.matchLevel} بناءً على المعلومات المنظمة المتاحة.`,
    ...item.contributions
      .filter((contribution) => contribution.delta > 0 && contribution.code !== "base")
      .slice(0, 3)
      .map((contribution) => contribution.labelAr),
    item.contributions.some((contribution) => contribution.delta < 0)
      ? "توجد ملاحظات احترازية خفّضت قوة المطابقة، لذلك يلزم مراجعة المكونات المعتمدة قبل الاستخدام."
      : "يحتاج الاستخدام النهائي إلى مراجعة المكونات والتعليمات المعتمدة.",
    "لا تمثل هذه النتيجة تشخيصًا طبيًا ولا ضمانًا للملاءمة.",
  ];
  const text = parts.filter(Boolean).join(" ");
  return banned.test(text) ? "نتيجة إرشادية آمنة بناءً على معلومات منظمة، وليست تشخيصًا طبيًا أو ضمانًا للملاءمة." : text;
}

export function safetyNotice() {
  return "هذه توصية إرشادية Deterministic مبنية على بيانات تطويرية ومعلومات منتجات غير معتمدة تجاريًا. لا توجد توصية طبية أو تشخيص أو ضمان ملاءمة.";
}
