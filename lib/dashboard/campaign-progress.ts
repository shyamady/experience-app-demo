import { isSponsorProduct } from "@/lib/dashboard/commerce";
import {
  formatMoney,
  getDaysLeft,
  getLaunchCommerce,
} from "@/lib/dashboard/commerce";
import type { LaunchData } from "@/lib/launch/types";
import type { ExperienceProduct, ExperienceSpots } from "@/lib/onboarding/experiences";
import type { GoalType } from "@/lib/onboarding/goal";

export function numericCapacity(spots: ExperienceSpots): number | null {
  return typeof spots === "number" && spots > 0 ? spots : null;
}

export function getCampaignGoalType(campaign: LaunchData): GoalType {
  if (campaign.goalType === "people" || campaign.goalType === "funding") {
    return campaign.goalType;
  }
  if (campaign.fundingGoal > 0) return "funding";
  return "people";
}

export function getCampaignGoalValue(campaign: LaunchData): number {
  if (campaign.goalValue && campaign.goalValue > 0) return campaign.goalValue;
  const type = getCampaignGoalType(campaign);
  if (type === "funding") {
    return campaign.fundingGoal > 0 ? campaign.fundingGoal : 12000;
  }
  if (campaign.totalSpots !== "unlimited" && campaign.totalSpots > 0) {
    return campaign.totalSpots;
  }
  return 100;
}

export type OfferFill = {
  id: string;
  title: string;
  price: number;
  sold: number;
  capacity: number | null;
  remaining: number | null;
  revenue: number;
  isSponsor: boolean;
};

export type CampaignProgress = {
  goalType: GoalType;
  goalValue: number;
  raised: number;
  people: number;
  percent: number;
  remaining: number;
  daysLeft: number | null;
  offers: OfferFill[];
};

export function getCampaignProgress(campaign: LaunchData): CampaignProgress {
  const commerce = getLaunchCommerce(campaign);
  const goalType = getCampaignGoalType(campaign);
  const goalValue = getCampaignGoalValue(campaign);
  const raised = commerce.total;
  const people = commerce.participants;
  const covered = goalType === "people" ? people : raised;
  const percent =
    goalValue > 0 ? Math.min(100, Math.round((covered / goalValue) * 100)) : 0;
  const remaining = Math.max(0, goalValue - covered);
  const rawDays = getDaysLeft(campaign.cutOffDate);
  const daysLeft = rawDays === null || rawDays < 0 ? null : rawDays;

  const offers = campaign.products
    .filter((product) => product.active)
    .map((product) => toOfferFill(product, commerce));

  return {
    goalType,
    goalValue,
    raised,
    people,
    percent,
    remaining,
    daysLeft,
    offers,
  };
}

function toOfferFill(
  product: ExperienceProduct,
  commerce: ReturnType<typeof getLaunchCommerce>,
): OfferFill {
  const line = [...commerce.participationLines, ...commerce.sponsorshipLines].find(
    (item) => item.id === product.id,
  );
  const capacity = numericCapacity(product.spots);
  const sold = line?.sold ?? 0;
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    sold,
    capacity,
    remaining: capacity === null ? null : Math.max(0, capacity - sold),
    revenue: line?.revenue ?? sold * product.price,
    isSponsor: isSponsorProduct(product),
  };
}

export function getGapSuggestions(progress: CampaignProgress): string[] {
  const remainingOffers = progress.offers.filter(
    (offer) => offer.remaining === null || offer.remaining > 0,
  );
  if (progress.remaining <= 0 || remainingOffers.length === 0) return [];

  if (progress.goalType === "people") {
    return remainingOffers
      .filter((offer) => !offer.isSponsor && offer.remaining)
      .slice(0, 3)
      .map((offer) => `${offer.remaining} ${offer.title} spots`);
  }

  const suggestions: string[] = [];
  let leftover = progress.remaining;
  for (const offer of remainingOffers) {
    if (leftover <= 0 || suggestions.length >= 3) break;
    const remainingSpots = offer.remaining ?? Math.ceil(leftover / offer.price);
    const needed = Math.min(
      remainingSpots,
      Math.max(1, Math.ceil(leftover / offer.price)),
    );
    suggestions.push(
      `${needed} ${offer.title} ${needed === 1 ? "spot" : "spots"}`,
    );
    leftover -= needed * offer.price;
  }
  return suggestions;
}

export function getAlternateGapClose(progress: CampaignProgress): string | null {
  if (progress.goalType !== "funding" || progress.remaining <= 0) return null;
  const partner = progress.offers.find(
    (offer) => offer.isSponsor && (offer.remaining === null || offer.remaining > 0),
  );
  const general = progress.offers.find(
    (offer) => !offer.isSponsor && (offer.remaining === null || offer.remaining > 0),
  );
  if (!partner || !general) return null;
  const leftover = Math.max(0, progress.remaining - partner.price);
  const extra = leftover > 0 ? Math.ceil(leftover / general.price) : 0;
  if (extra <= 0) return `1 ${partner.title}`;
  return `1 ${partner.title} + ${extra} ${general.title} spots`;
}

export function formatGoalMetric(progress: CampaignProgress): string {
  if (progress.goalType === "people") {
    return `${progress.people.toLocaleString()} / ${progress.goalValue.toLocaleString()} people`;
  }
  return `${formatMoney(progress.raised)} / ${formatMoney(progress.goalValue)}`;
}
