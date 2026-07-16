import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "اكتبي اسمًا من حرفين على الأقل").max(80),
  email: z.email("أدخلي بريدًا إلكترونيًا صحيحًا"),
  phone: z.string().trim().max(30).optional(),
  reason: z.enum(["product", "order", "guide", "partnership", "other"]),
  message: z.string().trim().min(10, "اكتبي تفاصيل أكثر قليلًا").max(1000),
});

export type ContactInput = z.infer<typeof contactSchema>;
