import {
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "@/lib/launch/categories";
import type {
  ExperienceCategory,
  ExperienceProduct,
  ExperienceSpots,
} from "@/lib/onboarding/experiences";
import { getPlaceholderImageUrl } from "@/lib/unsplash/search-photos";
import type { LaunchProduct } from "@/types/launch";

function createId(): string {
  return `exp-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeCategory(category: string): ExperienceCategory {
  const normalized = category.trim().toUpperCase();

  const exact = PRODUCT_CATEGORIES.find((value) => value === normalized);
  if (exact) return exact;

  if (normalized.includes("PRESENTING")) return "PRESENTING SPONSOR";
  if (normalized.includes("SPONSOR")) return "SPONSOR";
  if (normalized.includes("MULTI")) return "MULTI-DAY";
  if (normalized.includes("PERSON")) return "IN PERSON";
  if (normalized.includes("SUPPORT")) return "SUPPORTER";
  if (normalized.includes("GIFT")) return "ONLINE + GIFT";
  if (normalized.includes("Q&A") || normalized.includes("QA")) {
    return "ONLINE Q&A";
  }
  if (normalized.includes("LIVE")) return "LIVE ONLINE";
  if (normalized.includes("INTERACT")) return "INTERACTIVE";

  return "ONLINE ACCESS";
}

function isProductCategory(value: string): value is ProductCategory {
  return PRODUCT_CATEGORIES.includes(value as ProductCategory);
}

function parseCapacity(capacity: string): ExperienceSpots {
  const normalized = capacity.trim().toLowerCase();

  if (normalized.includes("unlimited")) {
    return "unlimited";
  }

  const match = normalized.match(/\d+/);
  if (!match) return 50;

  const value = Number(match[0]);
  return Number.isFinite(value) && value > 0 ? value : 50;
}

export function mapLaunchProducts(
  products: LaunchProduct[],
): ExperienceProduct[] {
  return products.map((product) => ({
    id: createId(),
    category: isProductCategory(product.category)
      ? product.category
      : normalizeCategory(product.category),
    title: product.title.trim(),
    description: product.description.trim(),
    price: product.price,
    spots: parseCapacity(product.capacity),
    imageUrl: product.imageUrl ?? getPlaceholderImageUrl(),
    active: true,
  }));
}
