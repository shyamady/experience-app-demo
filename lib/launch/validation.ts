import type { LaunchData } from "@/lib/launch/types";

function hasValidLocation(data: LaunchData): boolean {
  if (!data.locationType) return false;

  if (data.locationType === "in-person") {
    return data.city.trim().length > 0;
  }

  if (data.locationType === "online") {
    return data.onlinePlatform.trim().length > 0;
  }

  return (
    data.city.trim().length > 0 && data.onlinePlatform.trim().length > 0
  );
}

export function getPublishMissingRequirements(data: LaunchData): string[] {
  const missing: string[] = [];

  if (!data.title.trim()) missing.push("Launch title");
  if (!data.firstDate) missing.push("First date");
  if (!data.frequencyId) missing.push("Frequency");
  if (!hasValidLocation(data)) missing.push("Location");
  if (data.totalSpots !== "unlimited" && data.totalSpots < 1) {
    missing.push("Total spots");
  }
  if (!data.products.some((product) => product.active)) {
    missing.push("At least one active product");
  }

  if (data.demandValidationEnabled) {
    if (!data.cutOffDate) missing.push("Cut-off date");
    if (!data.fundingGoal || data.fundingGoal <= 0) {
      missing.push("Funding goal");
    }
  }

  return missing;
}

export function isLaunchPublishable(data: LaunchData): boolean {
  return getPublishMissingRequirements(data).length === 0;
}
