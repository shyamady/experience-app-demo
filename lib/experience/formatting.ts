import type { AccessBadge } from "@/lib/experience/types";

export function formatExperiencePrice(
  price: number,
  priceType: "one-time" | "monthly",
): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return priceType === "monthly" ? `${formatted} / month` : formatted;
}

export function getAccessBadgeStyles(badge: AccessBadge): string {
  switch (badge) {
    case "Live Access":
      return "bg-fuchsia-600 text-white";
    case "Interactive Access":
      return "bg-violet-100 text-violet-700";
    case "VIP Access":
      return "bg-rose-500 text-white";
    case "Gift Access":
      return "bg-indigo-100 text-indigo-700";
    case "Monthly Support":
      return "bg-sky-100 text-sky-700";
    case "Sponsor Access":
      return "bg-amber-400 text-amber-950";
  }
}

export function getMaxQuantity(
  remainingSpots: number | undefined,
  availabilityKind: "unlimited" | "limited" | "open",
): number {
  if (availabilityKind === "unlimited" || availabilityKind === "open") {
    return 10;
  }

  return Math.max(1, remainingSpots ?? 1);
}

export function allowsQuantitySelector(
  product: {
    availabilityKind: "unlimited" | "limited" | "open";
    remainingSpots?: number;
  },
): boolean {
  if (product.availabilityKind === "unlimited" || product.availabilityKind === "open") {
    return true;
  }

  return (product.remainingSpots ?? 1) > 1;
}
