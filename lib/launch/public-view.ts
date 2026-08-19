import { getCampaignDisplayStatus } from "@/lib/dashboard/campaign-status";
import { getDemoAttendees, getDemoOrders } from "@/lib/dashboard/mock-data";
import {
  getLaunchCommerce,
  getPeopleGoal,
  isSponsorProduct,
} from "@/lib/dashboard/commerce";
import type { ExperienceProduct } from "@/lib/onboarding/experiences";
import type { LaunchData, ProjectOutlineItem } from "@/lib/launch/types";
import type { Order } from "@/lib/dashboard/types";
import type { Attendee } from "@/lib/dashboard/types";

export type CapacityTone = "ok" | "limited" | "urgent" | "soldout" | "open";

export type CapacityStatus = {
  remaining: number | "unlimited";
  total: number | "unlimited";
  sold: number;
  percentFilled: number;
  label: string | null;
  tone: CapacityTone;
  soldOut: boolean;
};

export type PublicOffer = {
  product: ExperienceProduct;
  sold: number;
  capacity: CapacityStatus;
};

function soldForProduct(
  product: ExperienceProduct,
  lines: { id: string; sold: number }[],
): number {
  const sold = lines.find((line) => line.id === product.id)?.sold ?? 0;
  if (product.spots === "unlimited") return sold;
  return Math.min(sold, product.spots);
}

export function getCapacityStatus(
  product: ExperienceProduct,
  sold: number,
  unit: "spots" | "opportunities" = "spots",
): CapacityStatus {
  if (product.spots === "unlimited") {
    return {
      remaining: "unlimited",
      total: "unlimited",
      sold,
      percentFilled: 0,
      label: null,
      tone: "open",
      soldOut: false,
    };
  }

  const remaining = Math.max(0, product.spots - sold);
  const percentRemaining = product.spots === 0 ? 0 : remaining / product.spots;
  const percentFilled =
    product.spots === 0 ? 100 : Math.min(100, (sold / product.spots) * 100);
  const unitLabel = remaining === 1 ? unit.slice(0, -1) : unit;

  if (remaining <= 0) {
    return {
      remaining: 0,
      total: product.spots,
      sold: product.spots,
      percentFilled: 100,
      label: "SOLD OUT",
      tone: "soldout",
      soldOut: true,
    };
  }

  if (percentRemaining < 0.2) {
    return {
      remaining,
      total: product.spots,
      sold,
      percentFilled,
      label: `🔥 Only ${remaining} ${unitLabel} left`,
      tone: "urgent",
      soldOut: false,
    };
  }

  if (percentRemaining <= 0.5) {
    return {
      remaining,
      total: product.spots,
      sold,
      percentFilled,
      label: `${remaining} of ${product.spots} ${unit} left`,
      tone: "limited",
      soldOut: false,
    };
  }

  return {
    remaining,
    total: product.spots,
    sold,
    percentFilled,
    label: `${remaining} ${unitLabel} available`,
    tone: "ok",
    soldOut: false,
  };
}

export function getPublicOffers(data: LaunchData): {
  participation: PublicOffer[];
  sponsorship: PublicOffer[];
} {
  const commerce = getLaunchCommerce(data);
  const participation = data.products
    .filter((product) => product.active && !isSponsorProduct(product))
    .map((product) => {
      const sold = soldForProduct(product, commerce.participationLines);
      return {
        product,
        sold,
        capacity: getCapacityStatus(product, sold, "spots"),
      };
    });

  const sponsorship = data.products
    .filter((product) => product.active && isSponsorProduct(product))
    .map((product) => {
      const sold = soldForProduct(product, commerce.sponsorshipLines);
      return {
        product,
        sold,
        capacity: getCapacityStatus(product, sold, "opportunities"),
      };
    });

  return { participation, sponsorship };
}

export function getJoinedCount(data: LaunchData): number {
  return Math.max(0, data.registrationCount);
}

export function getSpotsRemaining(data: LaunchData): number | null {
  if (data.totalSpots === "unlimited") return null;
  return Math.max(0, data.totalSpots - data.registrationCount);
}

export function getJoinProgress(data: LaunchData): {
  joined: number;
  goal: number;
  remaining: number | null;
  percent: number;
} {
  const joined = getJoinedCount(data);
  const goal = getPeopleGoal(data);
  const remaining =
    data.totalSpots === "unlimited" ? null : Math.max(0, goal - joined);

  return {
    joined,
    goal,
    remaining,
    percent: goal > 0 ? Math.min(100, (joined / goal) * 100) : 0,
  };
}

export function getLowestAvailablePrice(offers: PublicOffer[]): number | null {
  const available = offers.filter((offer) => !offer.capacity.soldOut);
  const pool = available.length > 0 ? available : offers;
  if (pool.length === 0) return null;
  return Math.min(...pool.map((offer) => offer.product.price));
}

export function getDaysLeftToJoin(data: LaunchData): number | null {
  if (!data.cutOffDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${data.cutOffDate}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;

  const days = Math.ceil((target.getTime() - today.getTime()) / 86_400_000);
  if (days < 0) return null;
  return days;
}

export function formatDaysLeftCopy(daysLeft: number | null): string | null {
  if (daysLeft === null) return null;
  if (daysLeft === 0) return "Last day to join";
  if (daysLeft === 1) return "🔥 1 day left";
  if (daysLeft <= 3) return `🔥 ${daysLeft} days left`;
  return `${daysLeft} days left to make this happen`;
}

export function getExpectedDateCopy(data: LaunchData): string {
  if (!data.firstDate || data.dateCertainty === "after-goal") {
    return "Expected after the goal is reached";
  }
  if (data.dateCertainty === "target") {
    const parsed = new Date(`${data.firstDate}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return "Target date to be confirmed";
    return `Target date: ${parsed.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })}`;
  }
  const parsed = new Date(`${data.firstDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "Expected after the goal is reached";
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getRecentJoinMessage(
  campaignId: string,
  orders: Order[] = getDemoOrders(),
): string | null {
  if (campaignId !== "campaign-tokyo") return null;
  const now = Date.now();
  const last48h = orders.filter(
    (order) =>
      order.paymentStatus === "paid" &&
      now - Date.parse(order.purchasedAt) <= 48 * 60 * 60 * 1000,
  ).length;
  const lastWeek = orders.filter(
    (order) =>
      order.paymentStatus === "paid" &&
      now - Date.parse(order.purchasedAt) <= 7 * 24 * 60 * 60 * 1000,
  ).length;

  if (last48h > 0) {
    return `${last48h} ${last48h === 1 ? "person" : "people"} joined in the last 48 hours`;
  }
  if (lastWeek > 0) {
    return `${lastWeek} ${lastWeek === 1 ? "person" : "people"} joined this week`;
  }
  return null;
}

export function getParticipantAvatars(
  campaignId: string,
  attendees: Attendee[] = getDemoAttendees(),
): { name: string; avatarUrl: string }[] {
  if (campaignId !== "campaign-tokyo") return [];
  return attendees
    .filter((attendee) => attendee.status === "confirmed")
    .slice(0, 5)
    .map((attendee) => ({
      name: attendee.name,
      avatarUrl: attendee.avatarUrl,
    }));
}

export function getOfferBenefits(product: ExperienceProduct): string[] {
  if (product.benefits && product.benefits.length > 0) {
    return product.benefits.slice(0, 4);
  }

  const bullets = [product.access, product.howItHelps].filter(
    (item): item is string => Boolean(item),
  );
  return bullets.slice(0, 3);
}

export function getProjectOutline(data: LaunchData): {
  heading: string;
  items: ProjectOutlineItem[];
} | null {
  if (data.outline && data.outline.length > 0) {
    return {
      heading: data.outlineHeading || "What we're making",
      items: data.outline,
    };
  }

  if (data.milestones && data.milestones.length > 0) {
    return {
      heading: "What we're making",
      items: data.milestones.map((milestone) => ({
        title: milestone.title,
        description: milestone.description,
      })),
    };
  }

  const haystack = `${data.title} ${data.subtitle ?? ""} ${data.description}`.toLowerCase();

  if (/retreat|trip|travel|tour/.test(haystack)) {
    return {
      heading: "What we're making",
      items: [
        {
          title: "Arrive",
          description: "Meet the group and settle into the place together.",
        },
        {
          title: "Make the days",
          description: "Explore, create, and shape the experience as a community.",
        },
        {
          title: "Close together",
          description: "Share what happened and take the work home.",
        },
      ],
    };
  }

  if (/album|record|release|film|documentary/.test(haystack)) {
    return {
      heading: "What we're making",
      items: [
        {
          title: "Shape the work",
          description: "Help decide the direction before production begins.",
        },
        {
          title: "Make it real",
          description: "Create, record, or film with the community involved.",
        },
        {
          title: "Share it",
          description: "Release the finished work with the people who helped make it.",
        },
      ],
    };
  }

  return {
    heading: "What we're making",
    items: [
      {
        title: "Gather",
        description: "Meet the community and settle into the space.",
      },
      {
        title: "The experience",
        description: "A live moment shaped by the people who joined.",
      },
      {
        title: "Stay after",
        description: "Talk, meet, and linger with the creator and community.",
      },
    ],
  };
}

export function isLiveLaunch(data: LaunchData): boolean {
  const status = getCampaignDisplayStatus(data);
  return status === "live" || status === "greenlit";
}
