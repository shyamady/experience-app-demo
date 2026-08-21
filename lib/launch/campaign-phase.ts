import type { ExperienceProduct } from "@/lib/onboarding/experiences";
import { EXPERIENCE_IMAGES } from "@/lib/onboarding/experiences";
import type { LaunchData } from "@/lib/launch/types";
import { getGreenlightState } from "@/lib/launch/greenlight";
import { formatMoney } from "@/lib/dashboard/commerce";
import {
  formatDaysLeftCopy,
  getDaysLeftToJoin,
} from "@/lib/launch/public-view";

export type CampaignPhase = "funding" | "greenlit" | "during" | "after";

export const CAMPAIGN_PHASE_OPTIONS: {
  id: CampaignPhase;
  label: string;
}[] = [
  { id: "funding", label: "Greenlight" },
  { id: "greenlit", label: "Greenlit / Live Sale" },
  { id: "during", label: "During" },
  { id: "after", label: "After" },
];

export function getDefaultCampaignPhase(data: LaunchData): CampaignPhase {
  if (data.status === "ended") return "after";
  const greenlight = getGreenlightState(data);
  if (greenlight.isGreenlit) return "greenlit";
  return "funding";
}

export type PhaseHeadline = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  meta: string[];
};

export function getPhaseHeadline(
  data: LaunchData,
  phase: CampaignPhase,
): PhaseHeadline {
  const daysCopy = formatDaysLeftCopy(getDaysLeftToJoin(data));

  switch (phase) {
    case "funding":
      return {
        eyebrow: "Help make this happen",
        title: "Join to greenlight this project",
        subtitle: "When enough people are in, it happens.",
        meta: [
          daysCopy ?? "Join early to help make it real",
        ].filter(Boolean),
      };
    case "greenlit":
      return {
        eyebrow: "✓ Greenlit",
        title: "It’s happening",
        subtitle: data.firstDate
          ? `Confirmed · ${new Date(`${data.firstDate}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
          : "The project is confirmed",
        meta: [
          daysCopy ?? "Spots still open",
        ],
      };
    case "during":
      return {
        eyebrow: "It’s happening now",
        title: data.city ? `Live from ${data.city.split(",")[0]}` : "Live now",
        subtitle: "Day 2 of 5",
        meta: ["Follow along or jump in while it’s happening"],
      };
    case "after":
      return {
        eyebrow: "The experience lives on",
        title: "Relive what we made together",
        subtitle: "Replay, recap, and keep a piece of the project.",
        meta: ["Post-project offers are available now"],
      };
  }
}

function offer(
  id: string,
  category: ExperienceProduct["category"],
  title: string,
  description: string,
  price: number,
  spots: number | "unlimited",
  imageUrl: string,
  earlyPrice?: number,
): ExperienceProduct {
  return {
    id,
    category,
    title,
    description,
    price,
    spots,
    imageUrl,
    active: true,
    howItHelps: description,
    access: description,
    benefits: earlyPrice
      ? [`Was ${formatMoney(earlyPrice)} for early supporters`]
      : undefined,
  };
}

export function getPhaseOffers(
  data: LaunchData,
  phase: CampaignPhase,
): ExperienceProduct[] {
  const base = data.products.filter((product) => product.active);

  if (phase === "during") {
    return [
      offer(
        "live-diary",
        "BEHIND THE SCENES",
        "Tokyo Diary",
        "Private daily notes and peeks while the project is underway.",
        15,
        200,
        EXPERIENCE_IMAGES.stage,
      ),
      offer(
        "live-private",
        "TAKE PART",
        "Private Live",
        "Join a short live session directly from the project.",
        25,
        40,
        EXPERIENCE_IMAGES.acoustic,
      ),
      offer(
        "live-dinner",
        "JOIN IN PERSON",
        "Last-minute Dinner Seat",
        "A remaining seat at tonight’s community table.",
        150,
        4,
        EXPERIENCE_IMAGES.dinner,
      ),
      ...base.filter((product) => product.category === "JOIN IN PERSON" || product.category === "JOIN").slice(0, 2),
    ];
  }

  if (phase === "after") {
    return [
      offer(
        "replay-recap",
        "BEHIND THE SCENES",
        "Full Recap",
        "The story of the project in one complete recap.",
        20,
        "unlimited",
        EXPERIENCE_IMAGES.crowd,
      ),
      offer(
        "replay-photo",
        "SUPPORT",
        "Photo Pack / Mini Film",
        "Selected photos and a short film from the experience.",
        30,
        "unlimited",
        EXPERIENCE_IMAGES.group,
      ),
      offer(
        "replay-session",
        "TAKE PART",
        "Recorded Session",
        "A recorded session you can revisit anytime.",
        50,
        "unlimited",
        EXPERIENCE_IMAGES.studio,
      ),
      offer(
        "replay-archive",
        "BEHIND THE SCENES",
        "Behind-the-Scenes Archive",
        "Private diaries, drafts, and moments from the making of it.",
        25,
        "unlimited",
        EXPERIENCE_IMAGES.backstage,
      ),
    ];
  }

  if (phase === "greenlit") {
    return base.map((product, index) => {
      if (index < 2 || product.price < 40) return product;
      const early = Math.max(15, Math.round(product.price * 0.75));
      return {
        ...product,
        benefits: [
          `Early supporters paid ${formatMoney(early)}`,
          "Early supporters helped make this happen, so they received the best price.",
        ],
      };
    });
  }

  return base;
}

export function canPurchaseInPhase(_phase: CampaignPhase): boolean {
  return true;
}

export function phasePrimaryCta(phase: CampaignPhase): string {
  switch (phase) {
    case "funding":
      return "Choose how to join";
    case "greenlit":
      return "Join before it happens";
    case "during":
      return "Join what’s happening now";
    case "after":
      return "Explore the archive";
  }
}
