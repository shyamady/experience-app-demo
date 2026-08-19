import type { LaunchData, LaunchStatus } from "@/lib/launch/types";
import { getCampaignProgress } from "@/lib/dashboard/campaign-progress";

export type CampaignDisplayStatus =
  | "draft"
  | "live"
  | "greenlit"
  | "ended"
  | "cancelled";

export function getCampaignDisplayStatus(
  campaign: LaunchData,
): CampaignDisplayStatus {
  if (campaign.status === "cancelled" || campaign.validationDecision === "cancelled") {
    return "cancelled";
  }
  if (campaign.status === "ended") return "ended";
  if (campaign.status === "draft") return "draft";
  const progress = getCampaignProgress(campaign);
  if (progress.percent >= 100) return "greenlit";
  return "live";
}

export function displayStatusLabel(status: CampaignDisplayStatus): string {
  switch (status) {
    case "draft":
      return "DRAFT";
    case "live":
      return "LIVE";
    case "greenlit":
      return "GREENLIT";
    case "ended":
      return "ENDED";
    case "cancelled":
      return "CANCELLED";
  }
}

export function isCampaignLiveForSales(status: LaunchStatus): boolean {
  return status === "published" || status === "ended";
}
