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
  revenue: number;
  people: number;
  percent: number;
  remaining: number;
  viablePercent: number;
  toViable: number;
  daysLeft: number | null;
  offers: OfferFill[];
  participationOffers: OfferFill[];
  soldOutPotential: number;
};

export type NextAction = {
  id: string;
  title: string;
  detail: string;
  cta: string;
  href: string;
};

export function getCampaignProgress(campaign: LaunchData): CampaignProgress {
  const commerce = getLaunchCommerce(campaign);
  const goalType = getCampaignGoalType(campaign);
  const goalValue = getCampaignGoalValue(campaign);
  const raised = commerce.total;
  const revenue = commerce.participationRevenue;
  const people = commerce.participants;
  const covered = goalType === "people" ? people : raised;
  const percent =
    goalValue > 0 ? Math.min(100, Math.round((covered / goalValue) * 100)) : 0;
  const remaining = Math.max(0, goalValue - covered);
  const viableCovered = goalType === "people" ? people : revenue;
  const viablePercent =
    goalValue > 0
      ? Math.min(100, Math.round((viableCovered / goalValue) * 100))
      : 0;
  const toViable = Math.max(0, goalValue - viableCovered);
  const rawDays = getDaysLeft(campaign.cutOffDate);
  const daysLeft = rawDays === null || rawDays < 0 ? null : rawDays;

  const offers = campaign.products
    .filter((product) => product.active)
    .map((product) => toOfferFill(product, commerce));
  const participationOffers = offers.filter((offer) => !offer.isSponsor);
  const soldOutPotential = participationOffers.reduce((sum, offer) => {
    const capacity = offer.capacity ?? Math.max(offer.sold, 1);
    return sum + offer.price * capacity;
  }, 0);

  return {
    goalType,
    goalValue,
    raised,
    revenue,
    people,
    percent,
    remaining,
    viablePercent,
    toViable,
    daysLeft,
    offers,
    participationOffers,
    soldOutPotential: Math.max(
      soldOutPotential,
      revenue,
      goalType === "funding" ? goalValue : 0,
    ),
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
  const leftover = Math.max(0, progress.toViable - partner.price);
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

export type ViabilityMix = {
  quantity: number;
  title: string;
};

/** Fewest higher-value sales that close the remaining viability gap. */
export function getViabilityMix(progress: CampaignProgress): ViabilityMix[] {
  if (progress.toViable <= 0) return [];

  const available = progress.participationOffers
    .filter((offer) => offer.price > 0 && (offer.remaining === null || offer.remaining > 0))
    .sort((a, b) => b.price - a.price);

  if (available.length === 0) return [];

  const mix: ViabilityMix[] = [];
  let leftover = progress.toViable;

  for (const offer of available) {
    if (leftover <= 0 || mix.length >= 2) break;
    const remainingSpots = offer.remaining ?? Math.ceil(leftover / offer.price);
    const needed =
      progress.goalType === "people"
        ? Math.min(remainingSpots, leftover)
        : Math.min(
            remainingSpots,
            Math.max(1, Math.ceil(leftover / offer.price)),
          );
    if (needed <= 0) continue;
    mix.push({ quantity: needed, title: offer.title });
    leftover -=
      progress.goalType === "people" ? needed : needed * offer.price;
  }

  return mix;
}

export function formatViabilityMix(mix: ViabilityMix[]): string {
  return mix
    .map((item) => `${item.quantity} ${item.title}`)
    .join(" + ");
}

export function getFeaturedParticipation(
  progress: CampaignProgress,
  limit = 4,
): OfferFill[] {
  return [...progress.participationOffers]
    .sort((a, b) => {
      const aScarce =
        a.remaining !== null && a.remaining > 0 && a.remaining <= 3 ? 1 : 0;
      const bScarce =
        b.remaining !== null && b.remaining > 0 && b.remaining <= 3 ? 1 : 0;
      if (aScarce !== bScarce) return bScarce - aScarce;
      if (b.revenue !== a.revenue) return b.revenue - a.revenue;
      return b.sold - a.sold;
    })
    .slice(0, limit);
}

export function getOverviewNextActions(
  progress: CampaignProgress,
): NextAction[] {
  const actions: NextAction[] = [];
  const open = progress.participationOffers.filter(
    (offer) => offer.remaining === null || offer.remaining > 0,
  );

  const scarce = open
    .filter((offer) => offer.remaining !== null && offer.remaining > 0 && offer.remaining <= 3)
    .sort((a, b) => (a.remaining ?? 99) - (b.remaining ?? 99))[0];

  const plentiful = [...open]
    .filter((offer) => (offer.remaining ?? 20) >= 8)
    .sort((a, b) => (b.remaining ?? 0) - (a.remaining ?? 0))[0];

  if (plentiful) {
    actions.push({
      id: "promote-availability",
      title: `Promote ${plentiful.title}`,
      detail:
        plentiful.remaining === null
          ? "Open availability — an easy offer to share."
          : `${plentiful.remaining} spots still available — an easy offer to share.`,
      cta: "Create Post →",
      href: "/dashboard/updates",
    });
  }

  if (scarce) {
    actions.push({
      id: "highlight-scarcity",
      title: `${scarce.title} is almost gone`,
      detail: `Only ${scarce.remaining} ${scarce.remaining === 1 ? "spot" : "spots"} left. Share it while it still feels special.`,
      cta: "Share Offer →",
      href: "/dashboard/products",
    });
  }

  const mix = getViabilityMix(progress);
  if (mix.length > 0 && progress.toViable > 0) {
    actions.push({
      id: "viability-mix",
      title: "A simple path to viable",
      detail: `Sell ${formatViabilityMix(mix)} to cover the remaining ${
        progress.goalType === "people"
          ? `${progress.toViable} participants`
          : formatMoney(progress.toViable)
      }.`,
      cta: "See Recommendation →",
      href: "#path-to-viability",
    });
  } else if (progress.toViable <= 0) {
    actions.push({
      id: "keep-momentum",
      title: "This project is viable",
      detail: "Keep sharing the offers that are still open to grow the room.",
      cta: "Share Offer →",
      href: "/dashboard/products",
    });
  }

  if (actions.length < 3) {
    const topSeller = [...progress.participationOffers].sort(
      (a, b) => b.sold - a.sold,
    )[0];
    if (topSeller && !actions.some((action) => action.title.includes(topSeller.title))) {
      actions.push({
        id: "top-seller",
        title: `${topSeller.title} is leading`,
        detail: "Lean into what’s already converting — share this offer with your closest supporters.",
        cta: "Create Post →",
        href: "/dashboard/updates",
      });
    }
  }

  return actions.slice(0, 3);
}
