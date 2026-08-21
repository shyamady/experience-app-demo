import {
  getCampaignProgress,
  type CampaignProgress,
} from "@/lib/dashboard/campaign-progress";
import { getCampaignDisplayStatus } from "@/lib/dashboard/campaign-status";
import type { LaunchData } from "@/lib/launch/types";

export type GreenlightState = {
  percent: number;
  people: number;
  daysLeft: number | null;
  minimumNeeded: number;
  isGreenlit: boolean;
  goalType: CampaignProgress["goalType"];
};

export function getGreenlightState(data: LaunchData): GreenlightState {
  const progress = getCampaignProgress(data);
  const status = getCampaignDisplayStatus(data);
  const percent = greenlightPercent(progress);
  const isGreenlit =
    status === "greenlit" || percent >= 100 || progress.viablePercent >= 100;

  return {
    percent: isGreenlit ? 100 : percent,
    people: progress.people,
    daysLeft: progress.daysLeft,
    minimumNeeded: progress.goalValue,
    isGreenlit,
    goalType: progress.goalType,
  };
}

function greenlightPercent(progress: CampaignProgress): number {
  if (progress.goalType === "people") return progress.percent;
  return progress.viablePercent;
}

export function formatGreenlightDays(daysLeft: number | null): string | null {
  if (daysLeft === null) return null;
  if (daysLeft <= 0) return "Last day to make it happen";
  if (daysLeft === 1) return "1 day left to make it happen";
  return `${daysLeft} days left to make it happen`;
}

export function formatPeopleIn(people: number): string {
  if (people <= 0) return "Be one of the first to join";
  if (people === 1) return "1 person is already in";
  return `${people} people are already in`;
}