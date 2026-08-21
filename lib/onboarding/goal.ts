export type GoalType = "people" | "funding";

export const PEOPLE_MIN = 5;
export const PEOPLE_MAX = 500;
export const PEOPLE_STEP = 5;
export const PEOPLE_MILESTONES = [5, 100, 250, 500] as const;

export const FUNDING_MIN = 500;
export const FUNDING_MAX = 5_000;
export const FUNDING_STEP = 100;
export const FUNDING_MILESTONES = [500, 1000, 2000, 3000, 4000, 5000] as const;

export const RECOMMENDED_PEOPLE = 50;
export const RECOMMENDED_FUNDING = 2_500;

export function snapGoalValue(type: GoalType, value: number): number {
  if (type === "people") {
    const snapped = Math.round(value / PEOPLE_STEP) * PEOPLE_STEP;
    return Math.min(PEOPLE_MAX, Math.max(PEOPLE_MIN, snapped));
  }
  const snapped = Math.round(value / FUNDING_STEP) * FUNDING_STEP;
  return Math.min(FUNDING_MAX, Math.max(FUNDING_MIN, snapped));
}

export function formatPeopleGoal(value: number): string {
  if (value >= PEOPLE_MAX) return "500+ people";
  return `${value} ${value === 1 ? "person" : "people"}`;
}

export function formatFundingGoal(value: number): string {
  if (value >= FUNDING_MAX) {
    return "$5,000";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatStepLabel(type: GoalType, value: number): string {
  if (type === "people") {
    return value >= PEOPLE_MAX ? "500+" : String(value);
  }
  if (value >= 1000) {
    const thousands = value / 1000;
    return Number.isInteger(thousands)
      ? `$${thousands}K`
      : `$${thousands.toFixed(1)}K`;
  }
  return formatFundingGoal(value);
}

export function peopleContextLabel(value: number): string {
  if (value <= 15) return "A small first gathering.";
  if (value <= 30) return "A close group of early believers.";
  if (value <= 60) return "A great size for an intimate community experience.";
  if (value <= 120) return "A full room of people making it real.";
  if (value <= 300) return "A sizable community launch.";
  return "A major community moment.";
}

export function fundingContextLabel(value: number): string {
  if (value <= 500) return "Enough to get a small idea moving.";
  if (value <= 1000) {
    return "A simple target for testing an idea with your community.";
  }
  if (value <= 2500) {
    return "A solid starting point for a meaningful project.";
  }
  if (value <= 4000) {
    return "Enough room to create something more ambitious.";
  }
  return "A strong target for bringing a bigger idea to life.";
}

export function parseMoneyInput(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s]/g, "").replace(/\+$/, "");
  if (!cleaned) return null;
  const thousands = cleaned.toLowerCase().endsWith("k");
  const numeric = Number(thousands ? cleaned.slice(0, -1) : cleaned);
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  const value = thousands ? numeric * 1000 : numeric;
  return Math.round(value);
}
