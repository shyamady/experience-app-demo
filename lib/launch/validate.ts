import type { LaunchProduct, LaunchResponse } from "@/types/launch";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isLaunchProduct(value: unknown): value is LaunchProduct {
  if (!isRecord(value)) return false;

  return (
    typeof value.category === "string" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    typeof value.capacity === "string" &&
    typeof value.imageQuery === "string" &&
    (value.imageUrl === undefined || typeof value.imageUrl === "string")
  );
}

export function isLaunchResponse(value: unknown): value is LaunchResponse {
  if (!isRecord(value)) return false;

  if (
    typeof value.heroTitle !== "string" ||
    typeof value.heroDescription !== "string" ||
    typeof value.estimatedRevenue !== "string" ||
    !Array.isArray(value.products)
  ) {
    return false;
  }

  if (value.products.length < 5 || value.products.length > 8) {
    return false;
  }

  return value.products.every(isLaunchProduct);
}
