import {
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "@/lib/launch/categories";
import type {
  ExperienceCategory,
  ExperienceProduct,
  ExperienceSpots,
} from "@/lib/onboarding/experiences";
import {
  EXPERIENCE_IMAGES,
  PARTICIPATION_IMAGE_KEYS,
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

  if (normalized.includes("BEHIND")) return "BEHIND THE SCENES";
  if (normalized.includes("WORK WITH") || normalized.includes("WORK-WITH")) {
    return "WORK WITH ME";
  }
  if (normalized.includes("HELP SHAPE") || normalized.includes("SHAPE")) {
    return "HELP SHAPE IT";
  }
  if (normalized.includes("TAKE PART") || normalized.includes("CO-CREATE")) {
    return "TAKE PART";
  }
  if (normalized.includes("IN PERSON") || normalized.includes("JOIN IN")) {
    return "JOIN IN PERSON";
  }
  if (normalized.includes("SUPPORT")) return "SUPPORT";
  if (normalized.includes("FOLLOW")) return "BEHIND THE SCENES";
  if (normalized.includes("CONTRIBUTE")) return "TAKE PART";
  if (normalized.includes("PARTNER") || normalized.includes("PRESENTING")) {
    return "SPONSOR";
  }
  if (normalized.includes("SPONSOR")) return "SPONSOR";
  if (normalized.includes("JOIN")) return "JOIN IN PERSON";
  if (normalized.includes("MULTI")) return "MULTI-DAY";
  if (normalized.includes("PERSON")) return "JOIN IN PERSON";
  if (normalized.includes("GIFT")) return "ONLINE + GIFT";
  if (normalized.includes("Q&A") || normalized.includes("QA")) {
    return "ONLINE Q&A";
  }
  if (normalized.includes("LIVE")) return "LIVE ONLINE";
  if (normalized.includes("INTERACT")) return "INTERACTIVE";

  return "SUPPORT";
}

function isProductCategory(value: string): value is ProductCategory {
  return PRODUCT_CATEGORIES.includes(value as ProductCategory);
}

function parseCapacity(capacity: string, spots?: number): ExperienceSpots {
  if (typeof spots === "number" && Number.isFinite(spots) && spots > 0) {
    return spots;
  }
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
  return products.map((product, index) => {
    const category = isProductCategory(product.category)
      ? product.category
      : normalizeCategory(product.category);
    const imageUrl =
      product.imageUrl ??
      (category === "PARTNER" ||
      category === "SPONSOR" ||
      category === "PRESENTING SPONSOR"
        ? EXPERIENCE_IMAGES.sponsor
        : EXPERIENCE_IMAGES[
            PARTICIPATION_IMAGE_KEYS[index % PARTICIPATION_IMAGE_KEYS.length]
          ]) ??
      getPlaceholderImageUrl();

    return {
      id: createId(),
      category,
      title: product.title.trim(),
      description: product.description.trim(),
      howItHelps: product.howItHelps?.trim(),
      access: product.access?.trim(),
      phase: product.phase?.trim(),
      price: product.price,
      spots: parseCapacity(product.capacity, product.spots),
      imageUrl,
      active: true,
    };
  });
}
