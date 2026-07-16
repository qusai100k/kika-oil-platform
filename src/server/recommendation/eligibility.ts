import { AssessmentOutcome, AssessmentStatus } from "../../../generated/prisma/enums";

type AssessmentLike = {
  status: AssessmentStatus;
  resultStatus: AssessmentOutcome | null;
  consentVersion: string | null;
  templateSnapshot: unknown;
  answersSnapshot: unknown;
};

export function recommendationEligibility(assessment: AssessmentLike) {
  const reasons: string[] = [];
  if (assessment.status !== AssessmentStatus.READY_FOR_FUTURE_RECOMMENDATION)
    reasons.push("ASSESSMENT_NOT_READY");
  if (assessment.resultStatus !== AssessmentOutcome.READY_FOR_FUTURE_RECOMMENDATION)
    reasons.push("SAFETY_OUTCOME_BLOCKS_RECOMMENDATION");
  if (!assessment.consentVersion) reasons.push("MISSING_CONSENT");
  if (!Array.isArray(assessment.templateSnapshot) || !Array.isArray(assessment.answersSnapshot))
    reasons.push("INVALID_OR_OBSOLETE_ASSESSMENT_SNAPSHOT");
  return { allowed: reasons.length === 0, reasons };
}
