import type { ExperienceCategory } from "@/lib/onboarding/experiences";

export type PassBadgeTone =
  | "access"
  | "live"
  | "vip"
  | "gift"
  | "supporter"
  | "sponsor"
  | "shape"
  | "contribute"
  | "cocreate"
  | "join"
  | "follow"
  | "partner";

export function getPassBadgeLabel(category: ExperienceCategory): string {
  switch (category) {
    case "SHAPE IT":
      return "SHAPE IT";
    case "CONTRIBUTE":
      return "CONTRIBUTE";
    case "CO-CREATE":
      return "CO-CREATE";
    case "JOIN":
      return "JOIN";
    case "FOLLOW THE JOURNEY":
      return "FOLLOW";
    case "PARTNER":
      return "PARTNER";
    case "PRESENTING SPONSOR":
    case "SPONSOR":
      return "SPONSOR";
    case "SUPPORTER":
      return "SUPPORTER";
    case "IN PERSON":
    case "MULTI-DAY":
      return "VIP ACCESS";
    case "LIVE ONLINE":
    case "ONLINE Q&A":
    case "INTERACTIVE":
      return "LIVE ACCESS";
    case "ONLINE + GIFT":
      return "GIFT PASS";
    default:
      return "ACCESS";
  }
}

export function getPassBadgeTone(category: ExperienceCategory): PassBadgeTone {
  switch (category) {
    case "SHAPE IT":
      return "shape";
    case "CONTRIBUTE":
      return "contribute";
    case "CO-CREATE":
      return "cocreate";
    case "JOIN":
      return "join";
    case "FOLLOW THE JOURNEY":
      return "follow";
    case "PARTNER":
      return "partner";
    case "PRESENTING SPONSOR":
    case "SPONSOR":
      return "sponsor";
    case "SUPPORTER":
      return "supporter";
    case "IN PERSON":
    case "MULTI-DAY":
      return "vip";
    case "LIVE ONLINE":
    case "ONLINE Q&A":
    case "INTERACTIVE":
      return "live";
    case "ONLINE + GIFT":
      return "gift";
    default:
      return "access";
  }
}

export function getPassBadgeStyles(tone: PassBadgeTone): string {
  switch (tone) {
    case "shape":
      return "bg-violet-600 text-white shadow-violet-200/60";
    case "contribute":
      return "bg-sky-600 text-white shadow-sky-200/60";
    case "cocreate":
      return "bg-fuchsia-600 text-white shadow-fuchsia-200/60";
    case "join":
    case "vip":
      return "bg-rose-500 text-white shadow-rose-200/60";
    case "follow":
    case "access":
      return "bg-violet-100 text-violet-700 shadow-violet-100/80";
    case "live":
      return "bg-fuchsia-600 text-white shadow-fuchsia-200/60";
    case "gift":
      return "bg-indigo-100 text-indigo-700 shadow-indigo-100/80";
    case "supporter":
      return "bg-sky-100 text-sky-700 shadow-sky-100/80";
    case "partner":
    case "sponsor":
      return "bg-amber-400 text-amber-950 shadow-amber-200/70";
  }
}

export function getPassIncludesCopy(category: ExperienceCategory): string {
  switch (category) {
    case "SHAPE IT":
      return "votes, feedback, and a role in key creative decisions";
    case "CONTRIBUTE":
      return "a way to submit ideas, stories, music, design, or movement";
    case "CO-CREATE":
      return "planning, workshops, rehearsals, or the creative process";
    case "JOIN":
      return "a place to attend, perform, travel, or become part of the project";
    case "FOLLOW THE JOURNEY":
      return "private updates, behind-the-scenes access, and early previews";
    case "PARTNER":
      return "recognition for funding, space, expertise, or production support";
    case "PRESENTING SPONSOR":
      return "featured placement, campaign visibility, priority access";
    case "SPONSOR":
      return "logo placement, brand mentions, campaign visibility";
    case "SUPPORTER":
      return "mission support, exclusive updates, community recognition";
    case "IN PERSON":
      return "in-person access, creator time, exclusive moments";
    case "MULTI-DAY":
      return "multi-day access, itinerary, private group moments";
    case "LIVE ONLINE":
      return "live session access, Q&A, replay";
    case "ONLINE Q&A":
      return "private Q&A, priority questions, recording";
    case "INTERACTIVE":
      return "interactive sessions, votes, real-time participation";
    case "ONLINE + GIFT":
      return "online access plus exclusive gift";
    default:
      return "behind-the-scenes access, updates, exclusive content";
  }
}

export function getAvailabilityLabel(
  spots: number | "unlimited",
  category?: ExperienceCategory,
): {
  value: string;
  urgency: string | null;
} {
  if (spots === "unlimited") {
    return { value: "Open", urgency: null };
  }

  const unit =
    category === "PARTNER" ||
    category === "SPONSOR" ||
    category === "PRESENTING SPONSOR"
      ? spots === 1
        ? "partner"
        : "partners"
      : spots === 1
        ? "person"
        : "people";

  if (spots <= 2) {
    return { value: `${spots} ${unit}`, urgency: "EXTREMELY LIMITED" };
  }

  if (spots <= 10) {
    return { value: `${spots} ${unit}`, urgency: "LIMITED" };
  }

  return { value: `${spots} ${unit}`, urgency: null };
}

export function formatPassId(productId: string, indexHint?: string): string {
  const suffix = (indexHint ?? productId)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(-3)
    .toUpperCase()
    .padStart(3, "0");

  return `MEUSE-${suffix}`;
}
