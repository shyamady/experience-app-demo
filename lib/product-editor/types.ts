import type {
  AccessBadge,
  AvailabilityKind,
  PriceType,
  PublicExperienceProduct,
} from "@/lib/experience/types";

export type ProductPublishStatus = "draft" | "published" | "hidden";

export type PreviewMode = "desktop" | "mobile" | "dark";

export type EditableProduct = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  accessBadge: AccessBadge;
  price: number;
  priceType: PriceType;
  availabilityKind: AvailabilityKind;
  spotCount: number;
  includes: string[];
  status: ProductPublishStatus;
  experienceTitle: string;
  creatorName: string;
  creatorAvatarUrl: string;
};

export const ACCESS_BADGE_OPTIONS: AccessBadge[] = [
  "Live Access",
  "VIP Access",
  "Sponsor Access",
  "Gift Access",
  "Monthly Support",
  "Interactive Access",
];

export function buildAvailabilityLabel(product: EditableProduct): string {
  switch (product.availabilityKind) {
    case "unlimited":
      return "Unlimited";
    case "open":
      return "Open";
    case "limited":
      return `${product.spotCount} spot${product.spotCount === 1 ? "" : "s"}`;
  }
}

export function toPreviewProduct(product: EditableProduct): PublicExperienceProduct {
  return {
    id: product.id,
    title: product.title || "Untitled product",
    description: product.description || "Add a description for your product.",
    imageUrl: product.imageUrl,
    accessBadge: product.accessBadge,
    price: product.price,
    priceType: product.priceType,
    availabilityKind: product.availabilityKind,
    availabilityLabel: buildAvailabilityLabel(product),
    remainingSpots:
      product.availabilityKind === "limited" ? product.spotCount : undefined,
    includes: product.includes.filter((item) => item.trim().length > 0),
  };
}
