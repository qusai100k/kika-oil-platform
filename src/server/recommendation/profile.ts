import type { AssessmentOutcome } from "../../../generated/prisma/enums";
import type { CustomerRecommendationProfile, ProfileAnswer } from "./types";

const byCode = (answers: ProfileAnswer[], code: string) =>
  answers.find((answer) => answer.questionCode === code);

const textAnswer = (answers: ProfileAnswer[], code: string) =>
  byCode(answers, code)?.valueText?.toLowerCase().trim() ?? "";

export function buildRecommendationProfile(
  answers: ProfileAnswer[],
  outcome?: AssessmentOutcome | null,
): CustomerRecommendationProfile {
  const oiliness = byCode(answers, "oiliness")?.optionValue;
  const dryness = byCode(answers, "dryness")?.optionValue;
  const sensitivity = byCode(answers, "sensitivity")?.optionValue;
  const goal = byCode(answers, "main_goal")?.optionValue;
  const routine = byCode(answers, "routine_preference")?.optionValue;
  const allergy = byCode(answers, "known_allergy")?.optionValue;
  const allergyDetail = textAnswer(answers, "allergy_detail");
  const previousReaction = byCode(answers, "previous_reaction")?.optionValue;
  const prescription = byCode(answers, "prescription_topical")?.optionValue;
  const pregnancy = byCode(answers, "pregnancy")?.optionValue;
  const severe = byCode(answers, "severe_irritation")?.optionValue;
  const wounds = byCode(answers, "open_wounds")?.optionValue;

  const concerns = new Set<string>();
  if (goal === "v0" || dryness === "v2") concerns.add("hydration");
  if (goal === "v1" || oiliness === "v2") concerns.add("balance");
  if (goal === "v2") concerns.add("texture");
  if (goal === "v3") concerns.add("tone-appearance");
  if (goal === "v4") concerns.add("routine-support");

  const safetyFlags: string[] = [];
  if (previousReaction && previousReaction !== "v0") safetyFlags.push("previous_reaction");
  if (prescription && prescription !== "v0") safetyFlags.push("prescription_use");
  if (pregnancy && pregnancy !== "v0") safetyFlags.push("pregnancy_or_breastfeeding");
  if (severe === "v1") safetyFlags.push("severe_irritation");
  if (wounds === "v1") safetyFlags.push("open_wounds");

  const allergies =
    allergy === "v1"
      ? allergyDetail
          .split(/[,،\n]/)
          .map((value) => value.trim())
          .filter(Boolean)
      : [];

  return {
    skinType:
      dryness === "v2" ? "dry" : oiliness === "v2" ? "oily" : oiliness === "v3" ? "combination" : "balanced",
    oiliness: oiliness === "v0" ? "low" : oiliness === "v1" ? "medium" : oiliness === "v2" ? "high" : oiliness === "v3" ? "variable" : "unknown",
    dryness: dryness === "v0" ? "none" : dryness === "v1" ? "occasional" : dryness === "v2" ? "frequent" : "unknown",
    sensitivity: sensitivity === "v0" ? "low" : sensitivity === "v1" ? "medium" : sensitivity === "v2" ? "high" : "unknown",
    concerns: [...concerns],
    allergies,
    previousReaction: previousReaction === "v1",
    prescriptionUse: prescription === "v1",
    pregnancyOrBreastfeeding: pregnancy === "v1",
    routinePreference: routine === "v0" ? "simple" : routine === "v1" ? "detailed" : "unknown",
    safetyFlags,
    assessmentOutcome: outcome,
  };
}
