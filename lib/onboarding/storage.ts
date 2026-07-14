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
  PARTICIPATION_OPTIONS,
  type ParticipationId,
} from "@/lib/onboarding/participation";

export type OnboardingData = {
  activity: string;
  dateMode: DateMode;
  singleDate: string;
  startDate: string;
  endDate: string;
  locationType: LocationType | null;
  locationCity: string;
  onlinePlatform: OnlinePlatform | null;
  onlinePlatformOther: string;
  frequencyId: FrequencyId | null;
  frequencyLabel: string;
  customInterval: number;
  customUnit: CustomFrequencyUnit;
  participationIds: ParticipationId[];
};

const STORAGE_KEY = "meuse-onboarding";

const DEFAULT_DATA: OnboardingData = {
  activity: "",
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

export function getOnboardingData(): OnboardingData {
  if (typeof window === "undefined") return DEFAULT_DATA;

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_DATA;
    return { ...DEFAULT_DATA, ...JSON.parse(stored) };
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
  if (!activity.trim()) return "Your activity";

  const normalized = activity.toLowerCase();

  if (normalized.includes("tokyo")) return "Tokyo trip";
  if (normalized.includes("nashville")) return "Nashville recording";
  if (normalized.includes("los angeles") || normalized.includes("la "))
    return "LA performance";
  if (normalized.includes("bali")) return "Bali retreat";
  if (normalized.includes("marathon")) return "Marathon training";
  if (normalized.includes("cohort")) return "Creator cohort";
  if (normalized.includes("restaurant")) return "Restaurant tour";

  const trimmed = activity
    .replace(/^I'm\s+/i, "")
    .replace(/\.$/, "")
    .trim();

  const words = trimmed.split(/\s+/).slice(0, 3);
  if (words.length === 0) return "Your activity";

  const summary = words.join(" ");
  return summary.charAt(0).toUpperCase() + summary.slice(1);
}

export function getFrequencyLabel(id: FrequencyId): string {
  const option = FREQUENCY_OPTIONS.find((item) => item.id === id);
  return option?.label ?? "Custom";
}

export function getParticipationLabels(ids: ParticipationId[]): string {
  return getParticipationLabelList(ids).join(" · ");
}

export function getParticipationLabelList(ids: ParticipationId[]): string[] {
  return ids.map(
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
