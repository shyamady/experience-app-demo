import type { ExperienceCategory, ExperienceProduct } from "@/lib/onboarding/experiences";
import type { LaunchData } from "@/lib/launch/types";
import { getDemoOrders } from "@/lib/dashboard/mock-data";
import type { Order } from "@/lib/dashboard/types";

const SPONSOR_CATEGORIES = new Set<ExperienceCategory>([
  "SPONSOR",
  "PRESENTING SPONSOR",
  "PARTNER",
]);

export function isSponsorProduct(product: ExperienceProduct): boolean {
  return SPONSOR_CATEGORIES.has(product.category);
}

export type SalesLine = {
  id: string;
  title: string;
  price: number;
  sold: number;
  revenue: number;
};

export type LaunchCommerce = {
  total: number;
  participants: number;
  sponsors: number;
  participationRevenue: number;
  sponsorshipRevenue: number;
  participationLines: SalesLine[];
  sponsorshipLines: SalesLine[];
  recentOrders: Order[];
};

function lineFromProduct(
  product: ExperienceProduct,
  sold: number,
): SalesLine {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    sold,
    revenue: product.price * sold,
  };
}

export function getLaunchCommerce(campaign: LaunchData): LaunchCommerce {
  const orders = getDemoOrders();
  const participation = campaign.products.filter(
    (product) => product.active && !isSponsorProduct(product),
  );
  const sponsorship = campaign.products.filter(
    (product) => product.active && isSponsorProduct(product),
  );

  if (campaign.status === "draft") {
    return {
      total: 0,
      participants: 0,
      sponsors: 0,
      participationRevenue: 0,
      sponsorshipRevenue: 0,
      participationLines: participation.map((product) =>
        lineFromProduct(product, 0),
      ),
      sponsorshipLines: sponsorship.map((product) => lineFromProduct(product, 0)),
      recentOrders: [],
    };
  }

  const total = campaign.revenueRaised;
  const participants = campaign.registrationCount;
  const sponsorshipRevenue =
    total >= 8420 ? 3000 : Math.round(total * 0.35);
  const participationRevenue = Math.max(0, total - sponsorshipRevenue);

  const participationSold = distributeCount(participants, participation.length);
  const sponsorSold = sponsorship.map((product, index) => {
    if (product.spots === "unlimited") return index === 0 ? 1 : 2;
    return Math.min(
      typeof product.spots === "number" ? product.spots : 2,
      index === 0 ? 1 : 2,
    );
  });
  const sponsors = sponsorSold.reduce((sum, count) => sum + count, 0);

  return {
    total,
    participants,
    sponsors,
    participationRevenue,
    sponsorshipRevenue,
    participationLines: participation.map((product, index) =>
      lineFromProduct(product, participationSold[index] ?? 0),
    ),
    sponsorshipLines: sponsorship.map((product, index) =>
      lineFromProduct(product, sponsorSold[index] ?? 0),
    ),
    recentOrders: orders.slice(0, 4),
  };
}

function distributeCount(total: number, buckets: number): number[] {
  if (buckets <= 0) return [];
  const base = Math.floor(total / buckets);
  const remainder = total % buckets;
  return Array.from({ length: buckets }, (_, index) =>
    base + (index < remainder ? 1 : 0),
  );
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getDaysLeft(firstDate: string): number | null {
  if (!firstDate) return null;
  const target = new Date(`${firstDate}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / 86_400_000);
}

export function getPeopleGoal(campaign: LaunchData): number {
  if (campaign.totalSpots !== "unlimited" && campaign.totalSpots > 0) {
    return Math.max(campaign.totalSpots, campaign.registrationCount);
  }
  if (campaign.fundingGoal > 0) return 100;
  return Math.max(100, campaign.registrationCount);
}
