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
  const template=await prisma.assessmentTemplate.upsert({where:{key_version:{key:"skin-guidance-demo",version:1}},update:{status:RecordStatus.ACTIVE},create:{key:"skin-guidance-demo",nameAr:"تقييم تحضير إرشاد البشرة — مبدئي",version:1,status:RecordStatus.ACTIVE,consentVersion:"assessment-demo-v1",estimatedMinutes:7,isProvisional:true,publishedAt:new Date()}});
  const questions=[
    ["age_group","الفئة العمرية","basic",true,["أقل من 16","16–24","25–34","35–44","45 أو أكثر"]],
    ["after_cleansing","كيف يكون إحساس بشرتك عادة بعد التنظيف؟","characteristics",true,["مريح","مشدود أو جاف","دهني سريعًا","غير متأكدة"]],
    ["oiliness","كيف تصفين مستوى الزيوت الظاهرة؟","characteristics",true,["قليل","متوسط","مرتفع","يتغير"]],
    ["dryness","كيف تصفين الإحساس بالجفاف؟","characteristics",true,["لا يظهر عادة","أحيانًا","متكرر","غير متأكدة"]],
    ["sensitivity","هل تميل بشرتك إلى التحسس من منتجات العناية؟","safety",true,["لا","أحيانًا","نعم","غير متأكدة"]],
    ["known_allergy","هل تعرفين حساسية تجاه مكوّن عناية؟","safety",true,["لا","نعم","غير متأكدة"]],
    ["previous_reaction","هل سبق حدوث تفاعل قوي بعد منتج عناية؟","safety",true,["لا","نعم","غير متأكدة"]],
    ["prescription_topical","هل تستخدمين حاليًا منتجًا موضعيًا بوصفة؟","safety",true,["لا","نعم","أفضل عدم الإجابة"]],
    ["pregnancy","هل الحمل أو الرضاعة أمر ذو صلة الآن؟","safety",true,["لا","نعم","أفضل عدم الإجابة"]],
    ["open_wounds","هل توجد جروح مفتوحة أو حاجز جلدي متضرر بوضوح؟","screening",true,["لا","نعم"]],
    ["severe_irritation","هل يوجد تهيج شديد أو متفاقم أو مستمر؟","screening",true,["لا","نعم"]],
    ["suspected_infection","هل توجد علامة غير واضحة تعتقدين أنها قد تحتاج تقييمًا طبيًا؟","screening",true,["لا","نعم","غير متأكدة"]],
    ["recent_procedure","هل أجريتِ إجراءً جلديًا مهنيًا مؤخرًا؟","screening",true,["لا","نعم"]],
    ["cleanser","هل تستخدمين منظفًا؟","routine",false,["لا","نعم"]],
    ["moisturizer","هل تستخدمين مرطبًا؟","routine",false,["لا","نعم"]],
    ["sunscreen","هل تستخدمين واقي شمس؟","routine",false,["لا","أحيانًا","نعم"]],
    ["retinoid","هل تستخدمين ريتينويد ضمن روتينك؟","actives",false,["لا","نعم","غير متأكدة"]],
    ["exfoliating_acid","هل تستخدمين أحماض تقشير؟","actives",false,["لا","نعم","غير متأكدة"]],
    ["vitamin_c","هل تستخدمين فيتامين C؟","actives",false,["لا","نعم","غير متأكدة"]],
    ["main_goal","ما هدفك الأساسي من تنظيم الروتين؟","goals",true,["الترطيب","توازن الزيوت","ملمس أكثر نعومة بالمظهر","مظهر لون غير متجانس","دعم روتين عام"]],
    ["routine_preference","أي نمط تفضلين؟","preferences",true,["روتين بسيط","روتين تفصيلي","غير متأكدة"]]
  ] as const;
  for(let i=0;i<questions.length;i++){const [code,text,section,required,options]=questions[i];const q=await prisma.assessmentQuestion.upsert({where:{code_version:{code,version:1}},update:{textAr:text,sectionKey:section,isRequired:required,status:RecordStatus.ACTIVE,sortOrder:i},create:{code,version:1,textAr:text,sectionKey:section,type:"SINGLE_CHOICE",isRequired:required,isSensitive:section==="safety"||section==="screening",referralRelevant:section==="screening",requiresSpecialistReview:section==="safety",status:RecordStatus.ACTIVE,sortOrder:i,helpTextAr:"سؤال تطويري مبدئي يحتاج اعتماد المالكة ومختص مؤهل."}});for(let j=0;j<options.length;j++){const label=options[j],value=`v${j}`;await prisma.assessmentOption.upsert({where:{questionId_value:{questionId:q.id,value}},update:{labelAr:label,triggersReferral:["open_wounds","severe_irritation"].includes(code)&&j===1,triggersMoreInfo:["suspected_infection","prescription_topical","pregnancy","previous_reaction"].includes(code)&&j>0},create:{questionId:q.id,value,labelAr:label,sortOrder:j,triggersReferral:["open_wounds","severe_irritation"].includes(code)&&j===1,triggersMoreInfo:["suspected_infection","prescription_topical","pregnancy","previous_reaction"].includes(code)&&j>0}})}}
  const dependent=[
    ["allergy_detail","ما المكوّنات التي تعرفين أنها لا تناسبك؟","known_allergy","v1"],
    ["reaction_detail","صفي التفاعل السابق باختصار دون بيانات شخصية إضافية.","previous_reaction","v1"],
    ["prescription_detail","اكتبي اسم المنتج أو المكوّن الفعال إن كنت تعرفينه.","prescription_topical","v1"]
  ] as const;for(let i=0;i<dependent.length;i++){const [code,text,parentCode,show]=dependent[i],parent=await prisma.assessmentQuestion.findUniqueOrThrow({where:{code_version:{code:parentCode,version:1}}});await prisma.assessmentQuestion.upsert({where:{code_version:{code,version:1}},update:{textAr:text,parentQuestionId:parent.id,showWhenValue:show,status:RecordStatus.ACTIVE},create:{code,version:1,textAr:text,sectionKey:"safety",type:"LONG_TEXT",isRequired:true,isSensitive:true,status:RecordStatus.ACTIVE,sortOrder:100+i,parentQuestionId:parent.id,showWhenValue:show,maxLength:300,helpTextAr:"لا تكتبي تشخيصًا أو معلومات لا يحتاجها إعداد الإرشاد."}})}
  const ruleDefs=[["Severe irritation screen","severe_irritation","REFER_TO_SPECIALIST",100],["Open wound screen","open_wounds","REFER_TO_SPECIALIST",100],["Unclear infection concern","suspected_infection","NEEDS_MORE_INFORMATION",90],["Prescription review","prescription_topical","NEEDS_MORE_INFORMATION",80],["Pregnancy ingredient review","pregnancy","NEEDS_MORE_INFORMATION",80]] as const;for(const [name,questionCode,outcome,priority] of ruleDefs){const existing=await prisma.assessmentRule.findFirst({where:{templateId:template.id,name}});if(!existing)await prisma.assessmentRule.create({data:{templateId:template.id,name,questionCode,matchValue:"v1",outcome,priority,severity:"SAFETY",customerMessageAr:outcome==="REFER_TO_SPECIALIST"?"قد يكون من الأكثر أمانًا التحدث مع مختص مؤهل قبل إرشاد المنتجات.":"قد نحتاج معلومات إضافية أو مراجعة مهنية قبل إرشاد المنتجات.",internalMessage:"DEVELOPMENT ONLY — REQUIRES SPECIALIST APPROVAL",isProvisional:true,requiresSpecialistApproval:true}})}
}
main().finally(()=>prisma.$disconnect());
