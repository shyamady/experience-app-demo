import type {
  LaunchProduct,
  LaunchResponse,
  ProjectMilestone,
} from "@/types/launch";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function isLaunchProduct(value: unknown): value is LaunchProduct {
  if (!isRecord(value)) return false;

  return (
    typeof value.category === "string" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.howItHelps === "string" &&
    typeof value.access === "string" &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    typeof value.capacity === "string" &&
    typeof value.phase === "string" &&
    typeof value.imageQuery === "string" &&
    (value.imageUrl === undefined || typeof value.imageUrl === "string")
  );
}

function isProjectMilestone(value: unknown): value is ProjectMilestone {
  if (!isRecord(value)) return false;

  return typeof value.title === "string" && typeof value.description === "string";
}

export function isLaunchResponse(value: unknown): value is LaunchResponse {
  if (!isRecord(value)) return false;

  if (
    typeof value.heroTitle !== "string" ||
    typeof value.heroDescription !== "string" ||
    typeof value.whyItMatters !== "string" ||
    typeof value.communityMakesPossible !== "string" ||
    typeof value.heroImageQuery !== "string" ||
    typeof value.estimatedBudget !== "string" ||
    typeof value.estimatedTimeToLaunch !== "string" ||
    typeof value.suggestedMinimumGoal !== "string" ||
    typeof value.recommendedCampaignLength !== "string" ||
    typeof value.estimateAssumptions !== "string" ||
    !Array.isArray(value.milestones) ||
    !Array.isArray(value.products)
  ) {
    return false;
  }

  if (value.milestones.length !== 3) return false;
  if (value.products.length < 4 || value.products.length > 6) return false;
  if (value.heroImageUrl !== undefined && typeof value.heroImageUrl !== "string") {
    return false;
  }
  if (
    value.estimatedRevenue !== undefined &&
    typeof value.estimatedRevenue !== "string"
  ) {
    return false;
  }

  return (
    value.milestones.every(isProjectMilestone) &&
    value.products.every(isLaunchProduct)
  );
}

function normalizeProduct(value: unknown): LaunchProduct | null {
  if (!isRecord(value)) return null;
  if (
    typeof value.category !== "string" ||
    typeof value.title !== "string" ||
    typeof value.description !== "string" ||
    typeof value.price !== "number" ||
    !Number.isFinite(value.price) ||
    typeof value.capacity !== "string" ||
    typeof value.imageQuery !== "string"
  ) {
    return null;
  }

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
      "Participants receive updates and involvement tied to this role.",
    ),
    price: value.price,
    capacity: value.capacity,
    phase: asString(value.phase, "Produce and deliver"),
    imageQuery: value.imageQuery,
    imageUrl: typeof value.imageUrl === "string" ? value.imageUrl : undefined,
  };
}

const DEFAULT_MILESTONES: ProjectMilestone[] = [
  {
    title: "Validate the idea",
    description:
      "Share the project with your community and confirm there is enough energy to move forward.",
  },
  {
    title: "Reach the minimum goal",
    description:
      "Gather the people, funding, or partners needed to make production realistic.",
  },
  {
    title: "Produce and deliver the project",
    description:
      "Create the work and bring the community into the final experience.",
  },
];

export function normalizeLaunchResponse(value: unknown): LaunchResponse | null {
  if (!isRecord(value)) return null;
  if (typeof value.heroTitle !== "string" || typeof value.heroDescription !== "string") {
    return null;
  }
  if (!Array.isArray(value.products)) return null;

  const products = value.products
    .map(normalizeProduct)
    .filter((product): product is LaunchProduct => product !== null);

  if (products.length < 4) return null;

  const milestones = Array.isArray(value.milestones)
    ? value.milestones.filter(isProjectMilestone).slice(0, 3)
    : [];

  while (milestones.length < 3) {
    milestones.push(DEFAULT_MILESTONES[milestones.length]);
  }

  return {
    heroTitle: value.heroTitle,
    heroDescription: value.heroDescription,
    whyItMatters: asString(value.whyItMatters, value.heroDescription),
    communityMakesPossible: asString(
      value.communityMakesPossible,
      "Your community can help shape, fund, and join this project so it can actually happen.",
    ),
    heroImageQuery: asString(
      value.heroImageQuery,
      products[0]?.imageQuery ?? "community creative project",
    ),
    heroImageUrl:
      typeof value.heroImageUrl === "string" ? value.heroImageUrl : undefined,
    estimatedBudget: asString(value.estimatedBudget, "$8,000–$12,000"),
    estimatedTimeToLaunch: asString(value.estimatedTimeToLaunch, "60–90 days"),
    suggestedMinimumGoal: asString(value.suggestedMinimumGoal, "$8,000"),
    recommendedCampaignLength: asString(
      value.recommendedCampaignLength,
      "30 days",
    ),
    estimateAssumptions: asString(
      value.estimateAssumptions,
      "These are AI-generated starting estimates based on similar one-time projects. They are not guaranteed.",
    ),
    milestones,
    products: products.slice(0, 8),
    estimatedRevenue:
      typeof value.estimatedRevenue === "string"
        ? value.estimatedRevenue
        : undefined,
  };
}
