import {
  AssessmentOutcome,
  Prisma,
  QuestionType,
  RecordStatus,
  UserRole,
} from "../../../generated/prisma/client";
import { z } from "zod";
import { getDb } from "@/server/db/client";
import { assertPermission, can } from "@/server/auth/authorization";
import { redactAudit, sanitizePlainText } from "@/server/admin/rules";

export type AssessmentActor = { id: string; role: UserRole };
const text = (min: number, max: number) =>
  z.string().trim().min(min).max(max).transform(sanitizePlainText);
export const templateInput = z.object({
  key: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]{3,60}$/),
  nameAr: text(3, 120),
  consentVersion: z.string().trim().min(3).max(60),
  estimatedMinutes: z.coerce.number().int().min(1).max(60),
});
export const sectionInput = z.object({
  key: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]{2,60}$/),
  titleAr: text(2, 120),
  descriptionAr: text(0, 300).optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).max(999),
});
export const questionInput = z.object({
  code: z
    .string()
    .trim()
    .regex(/^[a-z0-9_]{2,80}$/),
  sectionId: z.string().uuid(),
  textAr: text(3, 400),
  helpTextAr: text(0, 500).optional().or(z.literal("")),
  type: z.nativeEnum(QuestionType),
  isRequired: z.coerce.boolean(),
  isSensitive: z.coerce.boolean(),
  sortOrder: z.coerce.number().int().min(0).max(999),
  parentQuestionId: z.string().uuid().optional().or(z.literal("")),
  showWhenValue: z.string().trim().max(80).optional().or(z.literal("")),
});
export const optionInput = z.object({
  value: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9_-]{1,80}$/),
  labelAr: text(1, 160),
  sortOrder: z.coerce.number().int().min(0).max(999),
  triggersReferral: z.coerce.boolean(),
  triggersMoreInfo: z.coerce.boolean(),
});
export const ruleInput = z.object({
  name: text(3, 120),
  questionCode: z.string().trim().min(2).max(80),
  matchValue: z.string().trim().max(80).optional().or(z.literal("")),
  outcome: z.nativeEnum(AssessmentOutcome),
  priority: z.coerce.number().int().min(0).max(1000),
  customerMessageAr: text(10, 500),
  requiresSpecialistApproval: z.coerce.boolean(),
});

function configure(actor: AssessmentActor) {
  assertPermission(actor.role, "assessments:configure");
}
async function draft(id: string) {
  const row = await getDb().assessmentTemplate.findUnique({ where: { id } });
  if (!row) throw new Error("TEMPLATE_NOT_FOUND");
  if (row.status !== RecordStatus.DRAFT)
    throw new Error("PUBLISHED_TEMPLATE_IMMUTABLE");
  return row;
}
async function audit(
  tx: Prisma.TransactionClient,
  actor: AssessmentActor,
  action: string,
  type: string,
  id: string,
  metadata?: unknown,
) {
  await tx.auditLog.create({
    data: {
      actorUserId: actor.id,
      action,
      resourceType: type,
      resourceId: id,
      outcome: "SUCCESS",
      metadata: redactAudit(metadata) as Prisma.InputJsonValue | undefined,
    },
  });
}

export async function createTemplate(actor: AssessmentActor, input: unknown) {
  configure(actor);
  const x = templateInput.parse(input);
  const latest = await getDb().assessmentTemplate.findFirst({
    where: { key: x.key },
    orderBy: { version: "desc" },
  });
  return getDb().$transaction(async (tx) => {
    const row = await tx.assessmentTemplate.create({
      data: {
        ...x,
        version: (latest?.version || 0) + 1,
        status: RecordStatus.DRAFT,
        isProvisional: true,
      },
    });
    await audit(
      tx,
      actor,
      "ASSESSMENT_TEMPLATE_CREATED",
      "AssessmentTemplate",
      row.id,
      { version: row.version },
    );
    return row;
  });
}
export async function duplicateTemplate(actor: AssessmentActor, id: string) {
  configure(actor);
  const source = await getDb().assessmentTemplate.findUnique({
    where: { id },
    include: {
      sections: { orderBy: { sortOrder: "asc" } },
      questions: { include: { options: true }, orderBy: { sortOrder: "asc" } },
      rules: true,
    },
  });
  if (!source) throw new Error("TEMPLATE_NOT_FOUND");
  const latest = await getDb().assessmentTemplate.findFirst({
    where: { key: source.key },
    orderBy: { version: "desc" },
  });
  return getDb().$transaction(
    async (tx) => {
      const copy = await tx.assessmentTemplate.create({
        data: {
          key: source.key,
          nameAr: source.nameAr,
          version: (latest?.version || 0) + 1,
          status: RecordStatus.DRAFT,
          consentVersion: source.consentVersion,
          estimatedMinutes: source.estimatedMinutes,
          isProvisional: true,
        },
      });
      const sectionIds = new Map<string, string>();
      for (const s of source.sections) {
        const n = await tx.assessmentSection.create({
          data: {
            templateId: copy.id,
            key: s.key,
            titleAr: s.titleAr,
            descriptionAr: s.descriptionAr,
            sortOrder: s.sortOrder,
          },
        });
        sectionIds.set(s.id, n.id);
      }
      const questionIds = new Map<string, string>();
      for (const q of source.questions) {
        const n = await tx.assessmentQuestion.create({
          data: {
            templateId: copy.id,
            sectionId: q.sectionId ? sectionIds.get(q.sectionId) : null,
            code: q.code,
            version: copy.version,
            textAr: q.textAr,
            helpTextAr: q.helpTextAr,
            internalNotes: q.internalNotes,
            sectionKey: q.sectionKey,
            type: q.type,
            isRequired: q.isRequired,
            isSensitive: q.isSensitive,
            referralRelevant: q.referralRelevant,
            requiresSpecialistReview: q.requiresSpecialistReview,
            minValue: q.minValue,
            maxValue: q.maxValue,
            maxLength: q.maxLength,
            status: RecordStatus.DRAFT,
            sortOrder: q.sortOrder,
          },
        });
        questionIds.set(q.id, n.id);
        if (q.options.length)
          await tx.assessmentOption.createMany({
            data: q.options.map((o) => ({
              questionId: n.id,
              value: o.value,
              labelAr: o.labelAr,
              sortOrder: o.sortOrder,
              triggersReferral: o.triggersReferral,
              triggersMoreInfo: o.triggersMoreInfo,
            })),
          });
      }
      for (const q of source.questions) {
        if (q.parentQuestionId)
          await tx.assessmentQuestion.update({
            where: { id: questionIds.get(q.id)! },
            data: {
              parentQuestionId: questionIds.get(q.parentQuestionId),
              showWhenValue: q.showWhenValue,
            },
          });
      }
      if (source.rules.length)
        await tx.assessmentRule.createMany({
          data: source.rules.map((r) => ({
            templateId: copy.id,
            name: r.name,
            questionCode: r.questionCode,
            matchValue: r.matchValue,
            outcome: r.outcome,
            priority: r.priority,
            severity: r.severity,
            customerMessageAr: r.customerMessageAr,
            internalMessage: r.internalMessage,
            isActive: r.isActive,
            isProvisional: true,
            requiresSpecialistApproval: r.requiresSpecialistApproval,
          })),
        });
      await audit(
        tx,
        actor,
        "ASSESSMENT_TEMPLATE_DUPLICATED",
        "AssessmentTemplate",
        copy.id,
        { sourceId: id, version: copy.version },
      );
      return copy;
    },
    { timeout: 20_000 },
  );
}
export async function saveSection(
  actor: AssessmentActor,
  templateId: string,
  input: unknown,
  id?: string,
) {
  configure(actor);
  await draft(templateId);
  const x = sectionInput.parse(input);
  return getDb().$transaction(async (tx) => {
    const row = id
      ? await tx.assessmentSection.update({
          where: { id, templateId },
          data: x,
        })
      : await tx.assessmentSection.create({ data: { ...x, templateId } });
    await audit(
      tx,
      actor,
      id ? "ASSESSMENT_SECTION_UPDATED" : "ASSESSMENT_SECTION_CREATED",
      "AssessmentSection",
      row.id,
      { templateId, sortOrder: x.sortOrder },
    );
    return row;
  });
}
export async function saveQuestion(
  actor: AssessmentActor,
  templateId: string,
  input: unknown,
  id?: string,
) {
  configure(actor);
  const t = await draft(templateId),
    x = questionInput.parse(input);
  const section = await getDb().assessmentSection.findFirst({
    where: { id: x.sectionId, templateId },
  });
  if (!section) throw new Error("INVALID_SECTION");
  if (x.parentQuestionId) {
    const parent = await getDb().assessmentQuestion.findFirst({
      where: { id: x.parentQuestionId, templateId },
    });
    if (!parent || !x.showWhenValue) throw new Error("INVALID_CONDITION");
  }
  return getDb().$transaction(async (tx) => {
    const data = {
      ...x,
      parentQuestionId: x.parentQuestionId || null,
      showWhenValue: x.showWhenValue || null,
      helpTextAr: x.helpTextAr || null,
      templateId,
      version: t.version,
      sectionKey: section.key,
      status: RecordStatus.DRAFT,
    };
    const row = id
      ? await tx.assessmentQuestion.update({ where: { id, templateId }, data })
      : await tx.assessmentQuestion.create({ data });
    await audit(
      tx,
      actor,
      id ? "ASSESSMENT_QUESTION_UPDATED" : "ASSESSMENT_QUESTION_CREATED",
      "AssessmentQuestion",
      row.id,
      { templateId, code: x.code, sortOrder: x.sortOrder },
    );
    return row;
  });
}
export async function saveOption(
  actor: AssessmentActor,
  templateId: string,
  questionId: string,
  input: unknown,
  id?: string,
) {
  configure(actor);
  await draft(templateId);
  const q = await getDb().assessmentQuestion.findFirst({
    where: { id: questionId, templateId },
  });
  if (!q) throw new Error("QUESTION_NOT_FOUND");
  const x = optionInput.parse(input);
  return getDb().$transaction(async (tx) => {
    const row = id
      ? await tx.assessmentOption.update({ where: { id, questionId }, data: x })
      : await tx.assessmentOption.create({ data: { ...x, questionId } });
    await audit(
      tx,
      actor,
      id ? "ASSESSMENT_OPTION_UPDATED" : "ASSESSMENT_OPTION_CREATED",
      "AssessmentOption",
      row.id,
      {
        questionId,
        sortOrder: x.sortOrder,
        flags: { referral: x.triggersReferral, moreInfo: x.triggersMoreInfo },
      },
    );
    return row;
  });
}
export async function saveRule(
  actor: AssessmentActor,
  templateId: string,
  input: unknown,
  id?: string,
) {
  configure(actor);
  await draft(templateId);
  const x = ruleInput.parse(input);
  const q = await getDb().assessmentQuestion.findFirst({
    where: { templateId, code: x.questionCode },
  });
  if (!q) throw new Error("QUESTION_NOT_FOUND");
  if (x.requiresSpecialistApproval && !can(actor.role, "settings:write"))
    throw new Error("SAFETY_APPROVAL_FORBIDDEN");
  return getDb().$transaction(async (tx) => {
    const data = {
      ...x,
      matchValue: x.matchValue || null,
      templateId,
      isProvisional: true,
      isActive: true,
      severity: "SAFETY",
    };
    const row = id
      ? await tx.assessmentRule.update({ where: { id, templateId }, data })
      : await tx.assessmentRule.create({ data });
    await audit(
      tx,
      actor,
      id ? "ASSESSMENT_RULE_UPDATED" : "ASSESSMENT_RULE_CREATED",
      "AssessmentRule",
      row.id,
      { templateId, outcome: x.outcome, priority: x.priority },
    );
    return row;
  });
}
export async function validateTemplate(id: string) {
  const t = await getDb().assessmentTemplate.findUnique({
    where: { id },
    include: {
      sections: true,
      questions: { include: { options: true } },
      rules: true,
    },
  });
  if (!t) throw new Error("TEMPLATE_NOT_FOUND");
  const errors: string[] = [];
  if (!t.sections.length) errors.push("يلزم قسم واحد على الأقل");
  if (!t.questions.length) errors.push("يلزم سؤال واحد على الأقل");
  for (const q of t.questions) {
    if (!t.sections.some((s) => s.id === q.sectionId))
      errors.push(`السؤال ${q.code} غير مرتبط بقسم`);
    if (
      (q.type === QuestionType.SINGLE_CHOICE ||
        q.type === QuestionType.YES_NO ||
        q.type === QuestionType.BOOLEAN) &&
      q.options.length < 2
    )
      errors.push(`السؤال ${q.code} يحتاج خيارين على الأقل`);
    if (q.parentQuestionId && !q.showWhenValue)
      errors.push(`شرط السؤال ${q.code} غير مكتمل`);
  }
  for (const r of t.rules)
    if (!t.questions.some((q) => q.code === r.questionCode))
      errors.push(`القاعدة ${r.name} تشير إلى سؤال غير موجود`);
  return errors;
}
export async function publishTemplate(
  actor: AssessmentActor,
  id: string,
  confirmation: string,
) {
  configure(actor);
  const t = await draft(id);
  if (confirmation !== `PUBLISH v${t.version}`)
    throw new Error("PUBLISH_CONFIRMATION_REQUIRED");
  const errors = await validateTemplate(id);
  if (errors.length) throw new Error(`TEMPLATE_INVALID:${errors.join("|")}`);
  return getDb().$transaction(async (tx) => {
    await tx.assessmentQuestion.updateMany({
      where: { templateId: id },
      data: { status: RecordStatus.ACTIVE },
    });
    const row = await tx.assessmentTemplate.update({
      where: { id },
      data: { status: RecordStatus.ACTIVE, publishedAt: new Date() },
    });
    await audit(
      tx,
      actor,
      "ASSESSMENT_TEMPLATE_PUBLISHED",
      "AssessmentTemplate",
      id,
      { version: t.version, validation: "passed" },
    );
    return row;
  });
}
export async function archiveTemplate(
  actor: AssessmentActor,
  id: string,
  confirmation: string,
) {
  configure(actor);
  const t = await getDb().assessmentTemplate.findUnique({ where: { id } });
  if (!t) throw new Error("TEMPLATE_NOT_FOUND");
  if (confirmation !== `ARCHIVE v${t.version}`)
    throw new Error("ARCHIVE_CONFIRMATION_REQUIRED");
  return getDb().$transaction(async (tx) => {
    const row = await tx.assessmentTemplate.update({
      where: { id },
      data: { status: RecordStatus.ARCHIVED },
    });
    await audit(
      tx,
      actor,
      "ASSESSMENT_TEMPLATE_ARCHIVED",
      "AssessmentTemplate",
      id,
      { version: t.version, historicalSnapshotsPreserved: true },
    );
    return row;
  });
}
export async function viewSensitiveAssessment(
  actor: AssessmentActor,
  id: string,
  purpose: string,
) {
  assertPermission(actor.role, "customers:sensitive");
  assertPermission(actor.role, "assessments:read");
  const a = await getDb().skinAssessment.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      submissionRevisions: { orderBy: { revision: "desc" }, take: 1 },
    },
  });
  if (!a) throw new Error("ASSESSMENT_NOT_FOUND");
  await getDb().auditLog.create({
    data: {
      actorUserId: actor.id,
      action: "SENSITIVE_ASSESSMENT_VIEWED",
      resourceType: "SkinAssessment",
      resourceId: id,
      outcome: "SUCCESS",
      metadata: {
        purpose: sanitizePlainText(purpose).slice(0, 120),
        status: a.status,
        answerCount: Array.isArray(a.answersSnapshot)
          ? a.answersSnapshot.length
          : undefined,
      },
    },
  });
  return a;
}
