import type { ProductCategory } from "@/lib/launch/categories";
import {
  PARTICIPATION_CATEGORIES,
  PRODUCT_CATEGORIES,
} from "@/lib/launch/categories";
import type { OnboardingData } from "@/lib/onboarding/storage";

export type ExperienceCategory = ProductCategory | "ONLINE";

export type ExperienceSpots = number | "unlimited";

export type ExperienceProduct = {
  id: string;
  category: ExperienceCategory;
  title: string;
  description: string;
  howItHelps?: string;
  access?: string;
  phase?: string;
  price: number;
  spots: ExperienceSpots;
  imageUrl: string;
  active: boolean;
  benefits?: string[];
};

export const EXPERIENCE_CATEGORIES: ExperienceCategory[] = [
  ...PRODUCT_CATEGORIES,
];

export const PARTICIPATION_STYLE_CATEGORIES = [
  ...PARTICIPATION_CATEGORIES,
] as const;

export const EXPERIENCE_TEMPLATES: {
  id: string;
  label: string;
  category: ExperienceCategory;
  title: string;
  description: string;
  howItHelps: string;
  access: string;
  phase: string;
  price: number;
  spots: ExperienceSpots;
  imageKey: keyof typeof EXPERIENCE_IMAGES;
}[] = [
  {
    id: "support",
    label: "Support",
    category: "SUPPORT",
    title: "Founding Supporter",
    description:
      "Help make the idea possible and become part of its story with credits and early updates.",
    howItHelps: "Early support gives the project momentum and a founding community.",
    access: "Name in project credits and supporter-only updates.",
    phase: "",
    price: 35,
    spots: 100,
    imageKey: "group",
  },
  {
    id: "behind-scenes",
    label: "Behind the Scenes",
    category: "BEHIND THE SCENES",
    title: "Studio Diary",
    description:
      "Private demos, production notes, and unreleased moments as the project takes shape.",
    howItHelps: "Closer followers keep energy high between public milestones.",
    access: "Private project updates and early previews.",
    phase: "",
    price: 55,
    spots: 80,
    imageKey: "studio",
  },
  {
    id: "influence",
    label: "Help Shape It",
    category: "HELP SHAPE IT",
    title: "Decision Circle",
    description:
      "Vote on real creative choices and help shape the final direction.",
    howItHelps: "Real decisions give the project a voice that belongs to the people in it.",
    access: "Structured votes and a private review panel.",
    phase: "",
    price: 125,
    spots: 25,
    imageKey: "acoustic",
  },
  {
    id: "participate",
    label: "Take Part",
    category: "TAKE PART",
    title: "Working Session",
    description:
      "Join a hands-on workshop or creative session inside the project.",
    howItHelps: "Active participation turns the idea into something people help make.",
    access: "A seat in a live working session.",
    phase: "",
    price: 180,
    spots: 15,
    imageKey: "gift",
  },
  {
    id: "in-person",
    label: "Join In Person",
    category: "JOIN IN PERSON",
    title: "Opening Night Seat",
    description:
      "Be there in person for the real-world experience.",
    howItHelps: "A committed room makes the live version possible.",
    access: "A place at the final gathering or event.",
    phase: "",
    price: 250,
    spots: 40,
    imageKey: "crowd",
  },
  {
    id: "work-with-me",
    label: "Work With Me",
    category: "WORK WITH ME",
    title: "Private Review",
    description:
      "Send your work and join a private feedback session with clear next steps.",
    howItHelps: "Direct collaboration creates high-value outcomes for both sides.",
    access: "A 1:1 feedback session with written notes.",
    phase: "",
    price: 350,
    spots: 8,
    imageKey: "coaching",
  },
  {
    id: "sponsor",
    label: "Sponsor",
    category: "SPONSOR",
    title: "Project Partner",
    description:
      "Help fund the project with brand integration, creator mention, and official partner status.",
    howItHelps: "Sponsorship closes the gap between the idea and a real production.",
    access: "Integrated visibility across selected project content.",
    phase: "",
    price: 2500,
    spots: 2,
    imageKey: "sponsor",
  },
];

export const EXPERIENCE_IMAGES = {
  travel:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop",
  video:
    "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=500&fit=crop",
  gift: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&h=500&fit=crop",
  group:
    "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=500&fit=crop",
  sponsor:
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop",
  premium:
    "https://images.unsplash.com/photo-1503899038394-086460604eba?w=800&h=500&fit=crop",
  stage:
    "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=500&fit=crop",
  crowd:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=500&fit=crop",
  acoustic:
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=500&fit=crop",
  backstage:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
  venue:
    "https://images.unsplash.com/photo-1566737236500-c8ac0ca260a6?w=800&h=500&fit=crop",
  destination:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=500&fit=crop",
  hotel:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop",
  dinner:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop",
  workout:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=500&fit=crop",
  studio:
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=500&fit=crop",
  coaching:
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop",
} as const;

export type ExperienceImageKey = keyof typeof EXPERIENCE_IMAGES;

export const PARTICIPATION_IMAGE_KEYS: ExperienceImageKey[] = [
  "crowd",
  "acoustic",
  "stage",
  "backstage",
  "venue",
  "group",
  "dinner",
];

export const TRIP_IMAGE_KEYS: ExperienceImageKey[] = [
  "destination",
  "travel",
  "hotel",
  "group",
  "dinner",
  "premium",
];

export const FITNESS_IMAGE_KEYS: ExperienceImageKey[] = [
  "workout",
  "coaching",
  "studio",
  "group",
  "gift",
];


const DEFAULT_PRODUCTS = EXPERIENCE_TEMPLATES;

function extractCity(data: OnboardingData): string {
  const activity = data.activity.toLowerCase();
  const known = data.knownDetails.toLowerCase();
  const haystack = `${activity} ${known}`;

  if (haystack.includes("tokyo") || haystack.includes("japan")) return "Tokyo";
  if (haystack.includes("paris")) return "Paris";
  if (haystack.includes("nashville")) return "Nashville";
  if (haystack.includes("bali")) return "Bali";
  if (haystack.includes("los angeles")) return "Los Angeles";
  return "Your City";
}

export function generateExperiences(data: OnboardingData): ExperienceProduct[] {
  const city = extractCity(data);

  return DEFAULT_PRODUCTS.map((template) => ({
    id: `exp-${template.id}`,
    category: template.category,
    title: template.title,
    description: template.description.replace(/Your City/g, city),
    howItHelps: template.howItHelps,
    access: template.access,
    phase: template.phase,
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
    case "SUPPORT":
    case "SUPPORTER":
      return "bg-sky-50 text-sky-700";
    case "BEHIND THE SCENES":
    case "FOLLOW THE JOURNEY":
    case "ONLINE ACCESS":
    case "LIVE ONLINE":
    case "INTERACTIVE":
    case "ONLINE + GIFT":
    case "ONLINE Q&A":
    case "ONLINE":
      return "bg-purple-50 text-purple-600";
    case "HELP SHAPE IT":
    case "SHAPE IT":
      return "bg-violet-50 text-violet-700";
    case "TAKE PART":
    case "CO-CREATE":
    case "CONTRIBUTE":
      return "bg-fuchsia-50 text-fuchsia-700";
    case "JOIN IN PERSON":
    case "JOIN":
    case "IN PERSON":
    case "MULTI-DAY":
    case "WORK WITH ME":
      return "bg-rose-50 text-pink-600";
    case "SPONSOR":
    case "PARTNER":
    case "PRESENTING SPONSOR":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-zinc-100 text-zinc-600";
  }
}

export function extractCityFromData(data: OnboardingData): string {
  return extractCity(data);
}
