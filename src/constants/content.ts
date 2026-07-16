export const uiText = {
  demoNotice: "الأسماء والأسعار والأحجام في نسخة العرض مبدئية، وتُستبدل بالكتالوج الرسمي قبل الإطلاق.",
  medicalNotice: "هذه المنصة لا تقدم تشخيصًا طبيًا ولا تغني عن استشارة مختص مؤهل.",
  seriousNotice: "عند وجود أعراض شديدة أو مستمرة أو متفاقمة، يرجى مراجعة مختص مؤهل.",
} as const;

export const contactInfo = {
  email: "البريد الرسمي قيد الربط",
  phone: "قناة WhatsApp قيد الربط",
  instagram: "حساب Instagram الرسمي قيد الربط",
  hours: "مواعيد الرد تُعلن عند الإطلاق",
} as const;

export const categories = [
  { slug: "face-oils", name: "زيوت الوجه", description: "نماذج لخطوات عناية بسيطة وواضحة.", accent: "sand" },
  { slug: "night-care", name: "العناية المسائية", description: "مساحة هادئة لختام روتين اليوم.", accent: "rose" },
  { slug: "simple-routine", name: "الروتين البسيط", description: "خيارات قليلة ومعلومات مرتبة.", accent: "sage" },
] as const;

export type DemoProduct = {
  slug: string; name: string; category: string; categorySlug: string; description: string;
  overview: string; price: number; currency: string; sizes: string[];
  availability: "متاح للمعاينة" | "قريبًا"; available: boolean; featured: boolean;
  badge?: string; tone: "sand" | "rose" | "sage"; imagePosition: string;
  skinTypes: string[]; concerns: string[];
};

export const demoProducts: DemoProduct[] = [
  { slug: "daily-balance-oil", name: "زيت التوازن اليومي", category: "زيوت الوجه", categorySlug: "face-oils", description: "خطوة يومية خفيفة صُممت لتنسجم بسهولة مع روتين عناية بسيط.", overview: "زيت يومي بقوام خفيف وحضور هادئ داخل الروتين. ستظهر هنا التركيبة والمزايا المعتمدة بالتفصيل.", price: 180, currency: "وحدة*", sizes: ["15 مل", "30 مل"], availability: "متاح للمعاينة", available: true, featured: true, badge: "اختيار مميز", tone: "sand", imagePosition: "center", skinTypes: ["العادية", "المختلطة"], concerns: ["روتين أبسط", "إحساس بالراحة"] },
  { slug: "gentle-night-oil", name: "زيت المساء اللطيف", category: "العناية المسائية", categorySlug: "night-care", description: "خطوة مسائية هادئة تمنح نهاية الروتين إحساسًا أكثر ترتيبًا وراحة.", overview: "مساحة لمنتج مسائي تُعرض فيها طريقة الاستخدام والمكونات والتحذيرات بوضوح بعد اعتمادها.", price: 220, currency: "وحدة*", sizes: ["30 مل"], availability: "متاح للمعاينة", available: true, featured: true, badge: "عرض جديد", tone: "rose", imagePosition: "55% center", skinTypes: ["الجافة", "العادية"], concerns: ["روتين مسائي", "إحساس بالراحة"] },
  { slug: "simple-care-oil", name: "زيت العناية البسيطة", category: "الروتين البسيط", categorySlug: "simple-routine", description: "اختيار مباشر لروتين يفضّل القليل الواضح على الخطوات الكثيرة.", overview: "خطوة واحدة بتفاصيل واضحة، لعميلة تبحث عن روتين أكثر بساطة.", price: 160, currency: "وحدة*", sizes: ["15 مل", "30 مل"], availability: "قريبًا", available: false, featured: true, tone: "sage", imagePosition: "45% center", skinTypes: ["غير متأكدة", "العادية"], concerns: ["روتين أبسط"] },
  { slug: "soft-routine-oil", name: "زيت الروتين الهادئ", category: "زيوت الوجه", categorySlug: "face-oils", description: "زيت هادئ لروتين متوازن، بلغة واضحة بعيدة عن الوعود المبالغ فيها.", overview: "مساحة متكاملة لعرض القوام وطريقة الاستخدام وما يجب معرفته قبل الاختيار.", price: 195, currency: "وحدة*", sizes: ["30 مل"], availability: "متاح للمعاينة", available: true, featured: false, tone: "sand", imagePosition: "60% center", skinTypes: ["الجافة", "المختلطة"], concerns: ["إحساس بالراحة"] },
  { slug: "evening-ritual-oil", name: "زيت طقس المساء", category: "العناية المسائية", categorySlug: "night-care", description: "طقس مسائي بسيط يضع المعلومة الواضحة في قلب تجربة العناية.", overview: "تجربة منتج مسائي متكاملة، من الفكرة حتى تفاصيل الاستخدام والتخزين.", price: 245, currency: "وحدة*", sizes: ["15 مل"], availability: "قريبًا", available: false, featured: false, tone: "rose", imagePosition: "40% center", skinTypes: ["الجافة"], concerns: ["روتين مسائي"] },
  { slug: "everyday-oil", name: "زيت كل يوم", category: "الروتين البسيط", categorySlug: "simple-routine", description: "اختيار يومي مباشر لمن تفضّل روتينًا واضحًا وسهل التكرار.", overview: "مكان واحد يجمع وصف المنتج وطريقته وتحذيراته بعد اعتماد ملفه الرسمي.", price: 150, currency: "وحدة*", sizes: ["15 مل"], availability: "متاح للمعاينة", available: true, featured: false, tone: "sage", imagePosition: "center", skinTypes: ["العادية", "غير متأكدة"], concerns: ["روتين أبسط"] },
];

export const brandValues = [
  { title: "معلومة واضحة", text: "مكان منظم للاطلاع على التفاصيل التي تعتمدها العلامة لاحقًا." },
  { title: "اختيار بلا مبالغة", text: "لغة هادئة تتجنب الوعود وتشرح حدود كل خدمة." },
  { title: "الإنسان حاضر", text: "التقنية تساعد على الترتيب، والمختص يبقى للحالات التي تحتاجه." },
];

export const demoReviews = [
  { quote: "وجدت التفاصيل التي أبحث عنها في مكان واحد وبأسلوب هادئ.", context: "نص عرض خيالي — ليس تقييم عميلة" },
  { quote: "أعجبني أن حدود دليل الاختيار واضحة قبل البدء.", context: "نص عرض خيالي — ليس تقييم عميلة" },
  { quote: "التصفح بسيط، ولا أشعر أنني أمام وعود مبالغ فيها.", context: "نص عرض خيالي — ليس تقييم عميلة" },
];

export type FaqItem = { category: string; question: string; answer: string };
export const faqs: FaqItem[] = [
  { category: "المنتجات", question: "هل الأسعار والأحجام نهائية؟", answer: "تظهر في نسخة العرض بصيغة مبدئية، وتُحدّث مباشرة عند اعتماد الكتالوج الرسمي." },
  { category: "المنتجات", question: "أين أجد المكونات والتحذيرات؟", answer: "لكل منتج أقسام واضحة للمكونات والتحذيرات، وتُنشر تفاصيلها بعد اعتماد ملف المنتج الرسمي." },
  { category: "الاستخدام", question: "هل تعرض المنصة تعليمات استخدام؟", answer: "ستعرض تعليمات مالك المنتج المعتمدة مستقبلًا. لا نقدم الآن إرشادات علاجية أو جرعات." },
  { category: "الطلبات", question: "هل يمكنني إتمام طلب الآن؟", answer: "تجربة الطلب معروضة كخطوة قادمة، وتُفعّل بعد اعتماد الأسعار والشحن والدفع." },
  { category: "الشحن", question: "ما الدول ورسوم الشحن؟", answer: "لم تُحسم دولة التشغيل أو مناطق ورسوم الشحن بعد، لذلك لا ننشر سياسة افتراضية." },
  { category: "دليل البشرة", question: "هل دليل الاختيار يشخّص البشرة؟", answer: "لا. المسار المخطط ينظم الإجابات ويستخدم قواعد معتمدة لاقتراح منتج أو الإحالة، ولا يشخّص حالة طبية." },
  { category: "الاستشارة", question: "هل يمكن حجز مختص الآن؟", answer: "لا. عرض الاستشارة يشرح الاتجاه المستقبلي فقط ولا توجد ملفات مختصين أو حجوزات فعالة." },
  { category: "الخصوصية", question: "هل تُحفظ بيانات صحية الآن؟", answer: "لا يوجد تقييم بشرة فعّال في هذا الإصدار. نموذج التواصل يتحقق محليًا ولا يرسل رسائل." },
  { category: "الإرجاع", question: "ما سياسة الإرجاع والاسترداد؟", answer: "السياسة غير معتمدة حتى تحديد البلد ونموذج المنتج والقواعد القانونية والتشغيلية المناسبة." },
];
