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

export type PathToGoalLine = {
  quantity: number;
  price: number;
  title: string;
  subtotal: number;
};

/** Build a realistic example mix that reaches the funding target. */
export function buildPathToGoal(
  products: ExperienceProduct[],
  goalValue: number,
): PathToGoalLine[] {
  const fans = products
    .filter((product) => product.active && !isSponsorProduct(product))
    .filter((product) => product.price > 0)
    .sort((a, b) => a.price - b.price);

  if (fans.length === 0 || goalValue <= 0) return [];

  const picks = fans.slice(0, Math.min(5, fans.length));
  const weights = [28, 22, 20, 16, 14].slice(0, picks.length);
  const weightSum = weights.reduce((sum, value) => sum + value, 0);
  let remaining = goalValue;
  const lines: PathToGoalLine[] = [];

  picks.forEach((product, index) => {
    const isLast = index === picks.length - 1;
    const share = isLast
      ? remaining
      : Math.round((goalValue * weights[index]) / weightSum);
    const capacity = numericSpots(product.spots) || 40;
    let quantity = Math.min(
      capacity,
      Math.max(1, Math.round(share / product.price)),
    );
    let subtotal = quantity * product.price;

    if (isLast && subtotal < remaining) {
      const needed = Math.ceil(remaining / product.price);
      quantity = Math.min(capacity, Math.max(quantity, needed));
      subtotal = quantity * product.price;
    }

    remaining = Math.max(0, remaining - subtotal);
    lines.push({
      quantity,
      price: product.price,
      title: product.title,
      subtotal,
    });
  });

  return lines;
}

export function pathToGoalTotal(lines: PathToGoalLine[]): number {
  return lines.reduce((sum, line) => sum + line.subtotal, 0);
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
  if (value.includes("SHAPE") || value.includes("INFLUENCE")) return "🗳️";
  if (value.includes("SUPPORT")) return "💗";
  if (value.includes("BEHIND") || value.includes("FOLLOW")) return "👀";
  if (value.includes("TAKE PART") || value.includes("CONTRIBUTE") || value.includes("CO-CREATE")) {
    return "✨";
  }
  if (value.includes("WORK WITH")) return "🎯";
  if (value.includes("PARTNER") || value.includes("SPONSOR")) return "🤝";
  if (value.includes("JOIN") || value.includes("PERSON")) return "🎟";
  return "✨";
}
