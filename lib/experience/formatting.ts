import type {
  AccessBadge,
  ProductInventory,
} from "@/lib/experience/types";

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
      return "bg-fuchsia-600 text-white shadow-fuchsia-200/60";
    case "Interactive Access":
      return "bg-violet-100 text-violet-700 shadow-violet-100/80";
    case "VIP Access":
      return "bg-rose-500 text-white shadow-rose-200/60";
    case "Gift Access":
      return "bg-indigo-100 text-indigo-700 shadow-indigo-100/80";
    case "Monthly Support":
      return "bg-sky-100 text-sky-700 shadow-sky-100/80";
    case "Sponsor Access":
      return "bg-amber-400 text-amber-950 shadow-amber-200/70";
  }
}

export function getMaxQuantity(
  remainingSpots: number | null | undefined,
  availabilityKind: "unlimited" | "limited" | "open",
): number {
  if (
    availabilityKind === "unlimited" ||
    availabilityKind === "open" ||
    remainingSpots === null ||
    remainingSpots === undefined
  ) {
    return 10;
  }

  return Math.max(1, remainingSpots);
}

export function allowsQuantitySelector(inventory: ProductInventory): boolean {
  if (inventory.soldOut) return false;
  if (inventory.remaining === null) return true;
  return inventory.remaining > 1;
}

export type InventoryStatusDisplay = {
  label: string;
  urgency: string | null;
  tone: "sold-out" | "urgent" | "available" | "open";
};

export function getInventoryStatusDisplay(
  inventory: ProductInventory,
): InventoryStatusDisplay {
  if (inventory.soldOut || inventory.remaining === 0) {
    return { label: "Sold out", urgency: null, tone: "sold-out" };
  }

  if (inventory.remaining === null) {
    return { label: "Available", urgency: null, tone: "open" };
  }

  if (inventory.remaining <= 2) {
    return {
      label: `Only ${inventory.remaining} left`,
      urgency: "EXTREMELY LIMITED",
      tone: "urgent",
    };
  }

  if (inventory.remaining <= 10) {
    return {
      label: `${inventory.remaining} spots remaining`,
      urgency: "LIMITED",
      tone: "urgent",
    };
  }

  return {
    label: `${inventory.remaining} spots remaining`,
    urgency: null,
    tone: "available",
  };
}
