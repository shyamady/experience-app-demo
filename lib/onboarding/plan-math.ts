import { isSponsorProduct } from "@/lib/dashboard/commerce";
import type { ExperienceProduct, ExperienceSpots } from "@/lib/onboarding/experiences";
import type { GoalType } from "@/lib/onboarding/goal";
import { formatFundingGoal, formatPeopleGoal } from "@/lib/onboarding/goal";

export function numericSpots(spots: ExperienceSpots): number {
  return typeof spots === "number" && Number.isFinite(spots) && spots > 0
    ? spots
    : 0;
}

export function offerPotential(product: ExperienceProduct): number {
  return product.price * numericSpots(product.spots);
}

export type PlanMetrics = {
  goalType: GoalType;
  goalValue: number;
  active: ExperienceProduct[];
  participants: ExperienceProduct[];
  sponsors: ExperienceProduct[];
  people: number;
  partnerCount: number;
  revenue: number;
  participantRevenue: number;
  sponsorRevenue: number;
  covered: number;
  coveragePercent: number;
  gap: number;
};

export function getPlanMetrics(
  products: ExperienceProduct[],
  goalType: GoalType,
  goalValue: number,
): PlanMetrics {
  const active = products.filter((product) => product.active);
  const sponsors = active.filter(isSponsorProduct);
  const participants = active.filter((product) => !isSponsorProduct(product));
  const people = participants.reduce(
    (sum, product) => sum + numericSpots(product.spots),
    0,
  );
  const partnerCount = sponsors.reduce(
    (sum, product) => sum + numericSpots(product.spots),
    0,
  );
  const participantRevenue = participants.reduce(
    (sum, product) => sum + offerPotential(product),
    0,
  );
  const sponsorRevenue = sponsors.reduce(
    (sum, product) => sum + offerPotential(product),
    0,
  );
  const revenue = participantRevenue + sponsorRevenue;
  const covered = goalType === "people" ? people : revenue;
  const safeGoal = goalValue > 0 ? goalValue : covered;
  const coveragePercent =
    safeGoal > 0 ? Math.round((covered / safeGoal) * 100) : 100;
  const gap = Math.max(0, safeGoal - covered);

  return {
    goalType,
    goalValue: safeGoal,
    active,
    participants,
    sponsors,
    people,
    partnerCount,
    revenue,
    participantRevenue,
    sponsorRevenue,
    covered,
    coveragePercent,
    gap,
  };
}

export function formatGoalAmount(type: GoalType, value: number): string {
  return type === "people" ? formatPeopleGoal(value) : formatFundingGoal(value);
}

export function formatMoney(value: number): string {
  return formatFundingGoal(value);
}

export function closeCoverageGap(
  products: ExperienceProduct[],
  goalType: GoalType,
  goalValue: number,
): ExperienceProduct[] {
  const metrics = getPlanMetrics(products, goalType, goalValue);
  if (metrics.gap <= 0) return products;

  const targetId =
    metrics.participants[0]?.id ?? metrics.active[0]?.id ?? null;
  if (!targetId) return products;

  return products.map((product) => {
    if (product.id !== targetId) return product;
    const currentSpots = numericSpots(product.spots) || 1;
    if (goalType === "people") {
      return { ...product, spots: currentSpots + metrics.gap };
    }
    const price = product.price > 0 ? product.price : 75;
    const extra = Math.max(1, Math.ceil(metrics.gap / price));
    return { ...product, spots: currentSpots + extra };
  });
}

export function categoryEmoji(category: string): string {
  const value = category.toUpperCase();
  if (value.includes("SHAPE")) return "🗳️";
  if (value.includes("CONTRIBUTE")) return "📝";
  if (value.includes("CO-CREATE")) return "✨";
  if (value.includes("FOLLOW")) return "👀";
  if (value.includes("PARTNER") || value.includes("SPONSOR")) return "🤝";
  if (value.includes("JOIN")) return "🎟";
  return "✨";
}
