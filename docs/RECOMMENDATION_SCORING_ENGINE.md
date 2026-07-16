# Recommendation Scoring Engine

Scores are deterministic integers clamped to `0..100`.

Current provisional contributions:

- Base available product score.
- Positive score for matching reported skin type.
- Positive score for matching reported concern mappings.
- Positive score for simple routine preference when the product ingredient list is simple.
- Negative score for sensitivity caution.
- Negative score for low stock.

Ranking order:

1. Eligible products only.
2. Final deterministic score.
3. Product owner sort order.
4. Variant availability.
5. Stable product ID.

Scores are recommendation strength, not medical confidence.
