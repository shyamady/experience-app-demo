import type {
  CustomFrequencyUnit,
  FrequencyId,
} from "@/lib/onboarding/frequency";
import type { LaunchData } from "@/lib/launch/types";

export function formatFirstDate(date: string): string {
  if (!date) return "";

  const parsed = new Date(`${date}T00:00:00`);
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getFrequencyDisplayLabel(
  frequencyId: FrequencyId | null,
  frequencyLabel: string,
  customInterval: number,
  customUnit: CustomFrequencyUnit,
): string {
  if (!frequencyId) return frequencyLabel;

  const labels: Record<FrequencyId, string> = {
    "one-time": "One time",
    "every-week": "Weekly",
    "every-other-week": "Every other week",
    "every-month": "Monthly",
    "every-quarter": "Quarterly",
    "every-year": "Yearly",
    custom: `Every ${customInterval} ${customUnit}`,
  };

  return labels[frequencyId] ?? frequencyLabel;
}

export function formatFirstDateWithFrequency(data: LaunchData): string {
  const date = formatFirstDate(data.firstDate);
  const frequency = getFrequencyDisplayLabel(
    data.frequencyId,
    data.frequencyLabel,
    data.customInterval,
    data.customUnit,
  );

  if (!date) return frequency;
  if (!frequency) return date;
  return `${date} · ${frequency}`;
}

export function formatSpotsAvailable(totalSpots: number | "unlimited"): string {
  if (totalSpots === "unlimited") return "Unlimited spots available";
  return `${totalSpots} spot${totalSpots === 1 ? "" : "s"} available`;
}

export function getLocationDisplay(data: LaunchData): string {
  if (data.locationType === "in-person") {
    return [data.city, data.venue].filter(Boolean).join(" · ") || data.city;
  }

  if (data.locationType === "online") {
    return data.onlinePlatform || "Online";
  }

  if (data.locationType === "hybrid") {
    const physical = [data.city, data.venue].filter(Boolean).join(", ");
    const online = data.onlinePlatform;
    if (physical && online) return `${physical} + ${online}`;
    return physical || online || "Hybrid";
  }

  return "";
}

export function getDaysUntilCutOff(cutOffDate: string): number | null {
  if (!cutOffDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cutOff = new Date(`${cutOffDate}T00:00:00`);
  const diff = cutOff.getTime() - today.getTime();

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function isCutOffPassed(cutOffDate: string): boolean {
  if (!cutOffDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cutOff = new Date(`${cutOffDate}T00:00:00`);

  return today > cutOff;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
