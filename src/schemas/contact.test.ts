import { describe, expect, it } from "vitest";
import { contactSchema } from "@/schemas/contact";
describe("contactSchema", () => {
  it("accepts valid demo input", () => expect(contactSchema.safeParse({ name: "اختبار", email: "test@example.test", reason: "product", message: "هذه رسالة تجريبية كاملة." }).success).toBe(true));
  it("rejects invalid input", () => expect(contactSchema.safeParse({ name: "ا", email: "bad", reason: "other", message: "قصير" }).success).toBe(false));
});
