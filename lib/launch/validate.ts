import type { LaunchProduct, LaunchResponse } from "@/types/launch";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const match = value.replace(/,/g, "").match(/\d+/);
    if (match) return Number(match[0]);
  }
  return fallback;
}

function parseSpots(value: unknown, capacity?: unknown): number {
  const fromSpots = asNumber(value, 0);
  if (fromSpots > 0) return Math.round(fromSpots);
  if (typeof capacity === "string") {
    const match = capacity.match(/\d+/);
    if (match) return Number(match[0]);
  }
  return 10;
}

function normalizeProduct(value: unknown): LaunchProduct | null {
  if (!isRecord(value)) return null;
  if (
    typeof value.category !== "string" ||
    typeof value.title !== "string" ||
    typeof value.description !== "string"
  ) {
    return null;
  }

  const price = asNumber(value.price, 0);
  if (price < 0) return null;
  const spots = parseSpots(value.spots, value.capacity);

  return {
    category: value.category,
    title: value.title,
    description: value.description,
    howItHelps: asString(
      value.howItHelps,
      "This participation helps make the project possible.",
    ),
    access: asString(
      value.access,
      "Participants receive involvement tied to this role.",
    ),
    price,
    spots,
    capacity: `${spots} ${spots === 1 ? "spot" : "spots"}`,
    phase: asString(value.phase, ""),
    imageQuery: asString(value.imageQuery, value.title),
    imageUrl: typeof value.imageUrl === "string" ? value.imageUrl : undefined,
  };
}

export function normalizeLaunchResponse(
  value: unknown,
  fallbackGoal?: { type: "people" | "funding"; value: number },
): LaunchResponse | null {
  if (!isRecord(value)) return null;
  if (typeof value.heroTitle !== "string" || typeof value.heroDescription !== "string") {
    return null;
  }
  if (!Array.isArray(value.products)) return null;

  const products = value.products
    .map(normalizeProduct)
    .filter((product): product is LaunchProduct => product !== null)
    .slice(0, 10);

  if (products.length < 3) return null;

  const goalType: "people" | "funding" =
    fallbackGoal?.type ??
    (value.goalType === "people" || value.goalType === "funding"
      ? value.goalType
      : "funding");
  const goalValue = fallbackGoal?.value
    ? fallbackGoal.value
    : asNumber(value.goalValue, 0);

  const budgetLines = Array.isArray(value.budgetLines)
    ? value.budgetLines
        .map((item) => {
          if (!isRecord(item) || typeof item.label !== "string") return null;
          const amount = asNumber(item.amount, 0);
          if (amount <= 0) return null;
          return {
            label: item.label,
            amount,
            description: asString(item.description),
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)
        .slice(0, 8)
    : [];

  return {
    heroTitle: value.heroTitle,
    heroDescription: value.heroDescription,
    heroImageQuery: asString(
      value.heroImageQuery,
      products[0]?.imageQuery ?? "community creative project",
    ),
    heroImageUrl:
      typeof value.heroImageUrl === "string" ? value.heroImageUrl : undefined,
    goalType,
    goalValue,
    suggestedGoalRange: asString(
      value.suggestedGoalRange,
      goalType === "people" ? `${goalValue} people` : `$${goalValue.toLocaleString()}`,
    ),
    estimateAssumptions: asString(
      value.estimateAssumptions,
      "AI starting estimate. You can edit this later.",
    ),
    products,
    budgetLines,
    gapSuggestions: Array.isArray(value.gapSuggestions)
      ? value.gapSuggestions.filter((item): item is string => typeof item === "string").slice(0, 3)
      : [],
    whyItMatters:
      typeof value.whyItMatters === "string" ? value.whyItMatters : undefined,
    estimatedBudget:
      typeof value.estimatedBudget === "string"
        ? value.estimatedBudget
        : undefined,
    suggestedMinimumGoal:
      typeof value.suggestedMinimumGoal === "string"
        ? value.suggestedMinimumGoal
        : undefined,
    milestones: Array.isArray(value.milestones) ? [] : undefined,
  };
}
