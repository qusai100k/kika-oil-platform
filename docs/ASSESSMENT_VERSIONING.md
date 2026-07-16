# Assessment Versioning

Templates use `(key, version)` uniqueness. Questions use `(code, version)` and options belong to their question version. Published template content is not edited in place. Submission stores template and answer snapshots so history remains interpretable after later drafts. Phase 7 must consume only an approved immutable version.

## Closure Notes

- Development template v1 was archived after v2 became the active version.
- QA duplication of v2 produced draft v3 with 25 questions, 68 options, and zero option links pointing back to source questions.
- Submitted assessments keep immutable `templateSnapshot`, `answersSnapshot`, and `AssessmentSubmissionRevision` records.
- Needs-more-information correction reopens the same assessment as a draft and preserves the prior submitted revision instead of creating a duplicate assessment.
