import {
  type CustomFrequencyUnit,
  type DateMode,
  FREQUENCY_OPTIONS,
  type FrequencyId,
} from "@/lib/onboarding/frequency";
import {
  type LocationType,
  ONLINE_PLATFORMS,
  type OnlinePlatform,
} from "@/lib/onboarding/location";
import {
  PROJECT_NEED_OPTIONS,
  type ProjectNeedId,
} from "@/lib/onboarding/needs";
import {
  PARTICIPATION_OPTIONS,
  type ParticipationId,
} from "@/lib/onboarding/participation";
import {
  SUGGESTIONS,
  type SuggestionId,
} from "@/lib/onboarding/suggestions";

export type OnboardingData = {
  activity: string;
  projectCategory: SuggestionId | null;
  needIds: ProjectNeedId[];
  knownDetails: string;
  dateMode: DateMode;
  singleDate: string;
  startDate: string;
  endDate: string;
  locationType: LocationType | null;
  locationCity: string;
  onlinePlatform: OnlinePlatform | null;
  onlinePlatformOther: string;
  /** Kept for older saved sessions; no longer collected in onboarding. */
  frequencyId: FrequencyId | null;
  frequencyLabel: string;
  customInterval: number;
  customUnit: CustomFrequencyUnit;
  participationIds: ParticipationId[];
};

const STORAGE_KEY = "meuse-onboarding";

const DEFAULT_DATA: OnboardingData = {
  activity: "",
  projectCategory: null,
  needIds: [],
  knownDetails: "",
  dateMode: "one-day",
  singleDate: "",
  startDate: "",
  endDate: "",
  locationType: null,
  locationCity: "",
  onlinePlatform: null,
  onlinePlatformOther: "",
  frequencyId: null,
  frequencyLabel: "",
  customInterval: 3,
  customUnit: "weeks",
  participationIds: [],
};

const LEGACY_PARTICIPATION_MAP: Record<string, ParticipationId> = {
  watch: "follow",
  influence: "shape",
  interact: "contribute",
  support: "partner",
};

function migrateParticipationIds(
  ids: ParticipationId[] | undefined,
): ParticipationId[] {
  if (!ids?.length) return [];

  const currentIds = new Set(PARTICIPATION_OPTIONS.map((option) => option.id));
  const next: ParticipationId[] = [];

  for (const id of ids) {
    const mapped = (LEGACY_PARTICIPATION_MAP[id] ?? id) as ParticipationId;
    if (currentIds.has(mapped) && !next.includes(mapped)) {
      next.push(mapped);
    }
  }

  return next;
}

function migrateStoredData(parsed: Partial<OnboardingData>): OnboardingData {
  const merged = { ...DEFAULT_DATA, ...parsed };
  merged.participationIds = migrateParticipationIds(parsed.participationIds);

  if ((!merged.needIds || merged.needIds.length === 0) && parsed.frequencyId) {
    merged.needIds = ["funding", "participants"];
  }

  return merged;
}

export function getOnboardingData(): OnboardingData {
  if (typeof window === "undefined") return DEFAULT_DATA;

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_DATA;
    return migrateStoredData(JSON.parse(stored) as Partial<OnboardingData>);
  } catch {
    return DEFAULT_DATA;
  }
}

export function saveOnboardingData(partial: Partial<OnboardingData>) {
  if (typeof window === "undefined") return;

  const current = getOnboardingData();
  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...current, ...partial }),
  );
}

export function summarizeActivity(activity: string): string {
  if (!activity.trim()) return "Your project";

  const normalized = activity.toLowerCase();

  if (normalized.includes("japan") || normalized.includes("tokyo")) {
    return "Community trip to Japan";
  }
  if (normalized.includes("ep") || normalized.includes("album")) {
    return "Record an EP";
  }
  if (normalized.includes("dance") || normalized.includes("stage show")) {
    return "Live stage show";
  }
  if (normalized.includes("pop-up") || normalized.includes("popup")) {
    return "Cultural pop-up";
  }
  if (normalized.includes("documentary")) return "Documentary";
  if (normalized.includes("music video")) return "Music video";

  const trimmed = activity
    .replace(/^I want to\s+/i, "")
    .replace(/^I'm\s+/i, "")
    .replace(/\.$/, "")
    .trim();

  const words = trimmed.split(/\s+/).slice(0, 5);
  if (words.length === 0) return "Your project";

  const summary = words.join(" ");
  return summary.charAt(0).toUpperCase() + summary.slice(1);
}

export function getProjectCategoryLabel(
  id: SuggestionId | null,
): string {
  if (!id) return "";
  return SUGGESTIONS.find((item) => item.id === id)?.label ?? "";
}

export function getFrequencyLabel(id: FrequencyId): string {
  const option = FREQUENCY_OPTIONS.find((item) => item.id === id);
  return option?.label ?? "Custom";
}

export function getNeedLabels(ids: ProjectNeedId[]): string {
  return getNeedLabelList(ids).join(" · ");
}

export function getNeedLabelList(ids: ProjectNeedId[]): string[] {
  return ids.map(
    (id) => PROJECT_NEED_OPTIONS.find((option) => option.id === id)?.title ?? id,
  );
}

export function getParticipationLabels(ids: ParticipationId[]): string {
  return getParticipationLabelList(ids).join(" · ");
}

export function getParticipationLabelList(ids: ParticipationId[]): string[] {
  const currentIds = new Set(PARTICIPATION_OPTIONS.map((option) => option.id));
  return ids
    .filter((id) => currentIds.has(id))
    .map(
      (id) =>
        PARTICIPATION_OPTIONS.find((option) => option.id === id)?.title ?? id,
    );
}

function formatDisplayDate(date: string): string {
  if (!date) return "";
  const parsed = new Date(`${date}T00:00:00`);
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatDateSummary(data: OnboardingData): string {
  if (data.dateMode === "one-day" && data.singleDate) {
    return formatDisplayDate(data.singleDate);
  }

  if (
    data.dateMode === "multiple-days" &&
    data.startDate &&
    data.endDate
  ) {
    return `${formatDisplayDate(data.startDate)} – ${formatDisplayDate(data.endDate)}`;
  }

  return "";
}

export function getLocationSummary(data: OnboardingData): string {
  if (data.locationType === "in-person") {
    return data.locationCity || "In person";
  }

  if (data.locationType === "online") {
    if (!data.onlinePlatform) return "Online";
    if (data.onlinePlatform === "other") {
      return data.onlinePlatformOther || "Online";
    }
    return (
      ONLINE_PLATFORMS.find((platform) => platform.id === data.onlinePlatform)
        ?.label ?? "Online"
    );
  }

  return "";
}
