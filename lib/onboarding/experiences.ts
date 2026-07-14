import type { ProductCategory } from "@/lib/launch/categories";
import { PRODUCT_CATEGORIES } from "@/lib/launch/categories";
import type { OnboardingData } from "@/lib/onboarding/storage";

export type ExperienceCategory = ProductCategory | "ONLINE";

export type ExperienceSpots = number | "unlimited";

export type ExperienceProduct = {
  id: string;
  category: ExperienceCategory;
  title: string;
  description: string;
  price: number;
  spots: ExperienceSpots;
  imageUrl: string;
  active: boolean;
};

export const EXPERIENCE_CATEGORIES: ExperienceCategory[] = [
  ...PRODUCT_CATEGORIES,
];

export const EXPERIENCE_TEMPLATES: {
  id: string;
  label: string;
  category: ExperienceCategory;
  title: string;
  description: string;
  price: number;
  spots: ExperienceSpots;
  imageKey: keyof typeof EXPERIENCE_IMAGES;
}[] = [
  {
    id: "online-access",
    label: "Online access",
    category: "ONLINE",
    title: "Online Access",
    description:
      "Behind-the-scenes updates, photos, videos, and replay access.",
    price: 29,
    spots: "unlimited",
    imageKey: "travel",
  },
  {
    id: "live-online",
    label: "Live online pass",
    category: "ONLINE",
    title: "Live Online Pass",
    description:
      "Join a private live session, ask questions, and participate in real time.",
    price: 79,
    spots: 100,
    imageKey: "video",
  },
  {
    id: "gift-pass",
    label: "Online + gift pass",
    category: "ONLINE",
    title: "Online + Gift Pass",
    description:
      "Includes online access plus a digital or physical gift, such as a signed postcard, exclusive photo pack, or limited keepsake.",
    price: 49,
    spots: "unlimited",
    imageKey: "gift",
  },
  {
    id: "in-person",
    label: "In-person experience",
    category: "IN PERSON",
    title: "In-Person Experience",
    description:
      "Join the creator for a one-day or multi-day offline experience.",
    price: 450,
    spots: 8,
    imageKey: "group",
  },
  {
    id: "community-sponsor",
    label: "Community sponsor",
    category: "SPONSOR",
    title: "Community Sponsor",
    description:
      "Includes logo placement, campaign-page visibility, and brand mentions.",
    price: 2500,
    spots: 5,
    imageKey: "sponsor",
  },
  {
    id: "presenting-sponsor",
    label: "Presenting sponsor",
    category: "SPONSOR",
    title: "Presenting Sponsor",
    description:
      "Includes “Presented by” placement, featured branding, product integration, and dedicated creator promotion.",
    price: 7500,
    spots: 2,
    imageKey: "premium",
  },
];

export const EXPERIENCE_IMAGES = {
  travel:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
  video:
    "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&h=400&fit=crop",
  gift: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&h=400&fit=crop",
  group:
    "https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&h=400&fit=crop",
  sponsor:
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
  premium:
    "https://images.unsplash.com/photo-1503899038394-086460604eba?w=600&h=400&fit=crop",
};

const DEFAULT_PRODUCTS = EXPERIENCE_TEMPLATES;

function createId(): string {
  return `exp-${Math.random().toString(36).slice(2, 9)}`;
}

function extractCity(data: OnboardingData): string {
  const activity = data.activity.toLowerCase();
  if (activity.includes("tokyo")) return "Tokyo";
  if (activity.includes("nashville")) return "Nashville";
  if (activity.includes("bali")) return "Bali";
  if (activity.includes("los angeles")) return "Los Angeles";
  return "Your City";
}

function personalizeTitle(city: string, title: string): string {
  if (title === "Online Access") return `${city} Online Access`;
  if (title === "In-Person Experience") return `${city} In-Person Experience`;
  return title;
}

function personalizeDescription(description: string, city: string): string {
  return description.replace(/the creator/gi, `the creator in ${city}`);
}

export function generateExperiences(data: OnboardingData): ExperienceProduct[] {
  const city = extractCity(data);

  return DEFAULT_PRODUCTS.map((template) => ({
    id: createId(),
    category: template.category,
    title: personalizeTitle(city, template.title),
    description: personalizeDescription(template.description, city),
    price: template.price,
    spots: template.spots,
    imageUrl: EXPERIENCE_IMAGES[template.imageKey],
    active: true,
  }));
}

export function estimateEarnings(products: ExperienceProduct[]): {
  min: number;
  max: number;
} {
  const activeProducts = products.filter((product) => product.active);

  let min = 0;
  let max = 0;

  for (const product of activeProducts) {
    const spotCount = product.spots === "unlimited" ? 80 : product.spots;
    min += product.price * Math.min(spotCount, 12);
    max += product.price * spotCount;
  }

  return { min, max };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getCategoryStyles(category: ExperienceCategory): string {
  switch (category) {
    case "ONLINE ACCESS":
    case "LIVE ONLINE":
    case "INTERACTIVE":
    case "ONLINE + GIFT":
    case "ONLINE Q&A":
    case "ONLINE":
      return "bg-purple-50 text-purple-600";
    case "IN PERSON":
    case "MULTI-DAY":
      return "bg-rose-50 text-pink-600";
    case "SUPPORTER":
      return "bg-sky-50 text-sky-700";
    case "SPONSOR":
    case "PRESENTING SPONSOR":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-zinc-100 text-zinc-600";
  }
}

export function extractCityFromData(data: OnboardingData): string {
  return extractCity(data);
}
