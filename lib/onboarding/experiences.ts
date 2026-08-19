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
    id: "shape-it",
    label: "Shape It",
    category: "SHAPE IT",
    title: "Founding Participant",
    description:
      "Vote on key creative decisions and join one planning session before the project is produced.",
    howItHelps:
      "Early feedback helps the creator choose the right scale, tone, and first public version.",
    access: "A private planning session and founding credit in project updates.",
    phase: "Validate the idea",
    price: 45,
    spots: 40,
    imageKey: "group",
  },
  {
    id: "contribute",
    label: "Contribute",
    category: "CONTRIBUTE",
    title: "Creative Contributor",
    description:
      "Submit an original idea, story, movement, or music sketch for the project.",
    howItHelps:
      "Community material gives the project a distinctive voice and more to build from.",
    access: "Selected ideas are developed in a small working session.",
    phase: "Validate the idea",
    price: 75,
    spots: 20,
    imageKey: "video",
  },
  {
    id: "co-create",
    label: "Co-create",
    category: "CO-CREATE",
    title: "Creative Collaborator",
    description:
      "Join a small rehearsal or workshop where selected ideas are developed together.",
    howItHelps:
      "Hands-on collaboration turns the concept into something ready to produce.",
    access: "Workshop participation and behind-the-scenes process updates.",
    phase: "Produce and deliver",
    price: 150,
    spots: 10,
    imageKey: "gift",
  },
  {
    id: "join",
    label: "Join",
    category: "JOIN",
    title: "Project Participant",
    description:
      "Attend, travel, perform, or become part of the final project.",
    howItHelps:
      "A committed group makes the live or in-person version possible.",
    access: "A place in the final gathering, show, trip, or presentation.",
    phase: "Produce and deliver",
    price: 220,
    spots: 40,
    imageKey: "travel",
  },
  {
    id: "follow",
    label: "Follow the Journey",
    category: "FOLLOW THE JOURNEY",
    title: "Journey Member",
    description:
      "Receive private updates, behind-the-scenes access, and early previews as the project takes shape.",
    howItHelps:
      "A close audience keeps momentum going between milestones.",
    access: "Private project updates and early peeks before public release.",
    phase: "Validate the idea",
    price: 29,
    spots: "unlimited",
    imageKey: "video",
  },
  {
    id: "partner",
    label: "Partner",
    category: "PARTNER",
    title: "Presenting Partner",
    description:
      "Provide funding, space, products, or production resources that help bring the project to life.",
    howItHelps:
      "Partnership closes the gap between the idea and a real production.",
    access: "Recognition as a partner bringing the project to life.",
    phase: "Reach the minimum goal",
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
    case "SHAPE IT":
      return "bg-violet-50 text-violet-700";
    case "CONTRIBUTE":
      return "bg-sky-50 text-sky-700";
    case "CO-CREATE":
      return "bg-fuchsia-50 text-fuchsia-700";
    case "JOIN":
    case "IN PERSON":
    case "MULTI-DAY":
      return "bg-rose-50 text-pink-600";
    case "FOLLOW THE JOURNEY":
    case "ONLINE ACCESS":
    case "LIVE ONLINE":
    case "INTERACTIVE":
    case "ONLINE + GIFT":
    case "ONLINE Q&A":
    case "ONLINE":
      return "bg-purple-50 text-purple-600";
    case "PARTNER":
    case "SPONSOR":
    case "PRESENTING SPONSOR":
      return "bg-amber-50 text-amber-700";
    case "SUPPORTER":
      return "bg-sky-50 text-sky-700";
    default:
      return "bg-zinc-100 text-zinc-600";
  }
}

export function extractCityFromData(data: OnboardingData): string {
  return extractCity(data);
}
