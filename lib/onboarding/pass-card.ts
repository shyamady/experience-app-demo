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
    case "SUPPORT":
    case "SUPPORTER":
      return "SUPPORT";
    case "BEHIND THE SCENES":
    case "FOLLOW THE JOURNEY":
      return "BEHIND THE SCENES";
    case "HELP SHAPE IT":
    case "SHAPE IT":
      return "HELP SHAPE IT";
    case "TAKE PART":
    case "CO-CREATE":
    case "CONTRIBUTE":
      return "TAKE PART";
    case "JOIN IN PERSON":
    case "JOIN":
    case "IN PERSON":
    case "MULTI-DAY":
      return "IN PERSON";
    case "WORK WITH ME":
      return "WORK WITH ME";
    case "PARTNER":
    case "PRESENTING SPONSOR":
    case "SPONSOR":
      return "SPONSOR";
    case "LIVE ONLINE":
    case "ONLINE Q&A":
    case "INTERACTIVE":
      return "LIVE";
    case "ONLINE + GIFT":
      return "GIFT";
    default:
      return "OFFER";
  }
}

export function getPassBadgeTone(category: ExperienceCategory): PassBadgeTone {
  switch (category) {
    case "SUPPORT":
    case "SUPPORTER":
      return "supporter";
    case "BEHIND THE SCENES":
    case "FOLLOW THE JOURNEY":
      return "follow";
    case "HELP SHAPE IT":
    case "SHAPE IT":
      return "shape";
    case "TAKE PART":
    case "CO-CREATE":
      return "cocreate";
    case "CONTRIBUTE":
      return "contribute";
    case "JOIN IN PERSON":
    case "JOIN":
    case "IN PERSON":
    case "MULTI-DAY":
    case "WORK WITH ME":
      return "join";
    case "PARTNER":
    case "PRESENTING SPONSOR":
    case "SPONSOR":
      return "sponsor";
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
    case "SUPPORT":
    case "SUPPORTER":
      return "recognition, credits, and a place in the project story";
    case "BEHIND THE SCENES":
    case "FOLLOW THE JOURNEY":
      return "private updates, demos, and work-in-progress previews";
    case "HELP SHAPE IT":
    case "SHAPE IT":
      return "votes, feedback, and influence over real decisions";
    case "TAKE PART":
    case "CO-CREATE":
    case "CONTRIBUTE":
      return "a hands-on role or activity inside the project";
    case "JOIN IN PERSON":
    case "JOIN":
    case "IN PERSON":
    case "MULTI-DAY":
      return "a place in the real-world experience";
    case "WORK WITH ME":
      return "direct feedback, coaching, or collaboration with the creator";
    case "PARTNER":
    case "PRESENTING SPONSOR":
    case "SPONSOR":
      return "meaningful visibility and involvement as a project partner";
    default:
      return "a clear way to join and help make the project happen";
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
        ? "spot"
        : "spots";

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
