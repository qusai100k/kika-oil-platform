ALTER TABLE "AssessmentQuestion" ADD COLUMN "templateId" UUID, ADD COLUMN "sectionId" UUID;
ALTER TABLE "SkinAssessment" ADD COLUMN "templateId" UUID;
CREATE UNIQUE INDEX "AssessmentQuestion_templateId_code_key" ON "AssessmentQuestion"("templateId", "code");
CREATE INDEX "AssessmentQuestion_templateId_sectionId_sortOrder_idx" ON "AssessmentQuestion"("templateId", "sectionId", "sortOrder");

CREATE TABLE "AssessmentSection" (
  "id" UUID NOT NULL,
  "templateId" UUID NOT NULL,
  "key" TEXT NOT NULL,
  "titleAr" TEXT NOT NULL,
  "descriptionAr" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AssessmentSection_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AssessmentSection_templateId_key_key" ON "AssessmentSection"("templateId", "key");
CREATE INDEX "AssessmentSection_templateId_sortOrder_idx" ON "AssessmentSection"("templateId", "sortOrder");

CREATE TABLE "AssessmentSubmissionRevision" (
  "id" UUID NOT NULL,
  "assessmentId" UUID NOT NULL,
  "revision" INTEGER NOT NULL,
  "outcome" "AssessmentOutcome" NOT NULL,
  "resultMessageAr" TEXT NOT NULL,
  "templateSnapshot" JSONB NOT NULL,
  "answersSnapshot" JSONB NOT NULL,
  "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AssessmentSubmissionRevision_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AssessmentSubmissionRevision_assessmentId_revision_key" ON "AssessmentSubmissionRevision"("assessmentId", "revision");
CREATE INDEX "AssessmentSubmissionRevision_assessmentId_submittedAt_idx" ON "AssessmentSubmissionRevision"("assessmentId", "submittedAt");

ALTER TABLE "AssessmentQuestion" ADD CONSTRAINT "AssessmentQuestion_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "AssessmentTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AssessmentQuestion" ADD CONSTRAINT "AssessmentQuestion_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "AssessmentSection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SkinAssessment" ADD CONSTRAINT "SkinAssessment_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "AssessmentTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AssessmentSection" ADD CONSTRAINT "AssessmentSection_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "AssessmentTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssessmentSubmissionRevision" ADD CONSTRAINT "AssessmentSubmissionRevision_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "SkinAssessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

UPDATE "AssessmentQuestion" q SET "templateId" = t."id" FROM "AssessmentTemplate" t WHERE t."version" = q."version";
UPDATE "SkinAssessment" a SET "templateId" = t."id" FROM "AssessmentTemplate" t WHERE t."version" = a."questionnaireVersion";
