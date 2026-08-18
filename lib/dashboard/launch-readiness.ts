import type { LaunchData } from "@/lib/launch/types";

export type ReadinessItemStatus = "complete" | "incomplete" | "action";

export type ReadinessItem = {
  id: string;
  title: string;
  hint?: string;
  status: ReadinessItemStatus;
  actionLabel: string;
  href: string;
  featured?: boolean;
};

export function getLaunchReadiness(campaign: LaunchData): {
  percent: number;
  items: ReadinessItem[];
} {
  const hasBasics = Boolean(
    campaign.firstDate &&
      (campaign.city || campaign.onlinePlatform || campaign.venue),
  );
  const hasPhoto = Boolean(campaign.coverImageUrl);
  const hasLink = Boolean(campaign.slug);
  const hasTickets = campaign.products.length > 0;
  const isPublished = campaign.status === "published";
  const stripeConnected = false;

  const items: ReadinessItem[] = [
    {
      id: "basics",
      title: "Basic Details",
      hint: hasBasics ? undefined : "Add a date or location.",
      status: hasBasics ? "complete" : "incomplete",
      actionLabel: "Edit",
      href: `/dashboard/products/${campaign.products[0]?.id ?? "live-nashville-studio"}/edit`,
      featured: true,
    },
    {
      id: "publish",
      title: "Publish Event",
      hint: isPublished ? "Your experience is live." : undefined,
      status: isPublished ? "complete" : "incomplete",
      actionLabel: "Review",
      href: "/dashboard",
      featured: true,
    },
    {
      id: "photo",
      title: "Event Photo",
      status: hasPhoto ? "complete" : "incomplete",
      actionLabel: "Edit",
      href: `/dashboard/products/${campaign.products[0]?.id ?? "live-nashville-studio"}/edit`,
    },
    {
      id: "link",
      title: "Experience Link",
      status: hasLink ? "complete" : "incomplete",
      actionLabel: "View",
      href: `/launch/${campaign.slug}`,
    },
    {
      id: "stripe",
      title: "Stripe Connect",
      status: stripeConnected ? "complete" : "action",
      actionLabel: "Finish setup",
      href: "/dashboard",
    },
    {
      id: "tickets",
      title: "Ticket & Pricing",
      status: hasTickets ? "complete" : "incomplete",
      actionLabel: "Manage",
      href: "/dashboard/products",
    },
  ];

  const completeCount = items.filter((item) => item.status === "complete").length;
  const percent = Math.round((completeCount / items.length) * 100);

  return { percent, items };
}

export function formatEventDate(isoDate: string): string {
  if (!isoDate) return "Date to be announced";
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "Date to be announced";
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getEventLocationLabel(campaign: LaunchData): string {
  if (campaign.city) return campaign.city;
  if (campaign.venue) return campaign.venue;
  if (campaign.onlinePlatform) return campaign.onlinePlatform;
  if (campaign.locationType === "online") return "Online";
  return "Location to be announced";
}

export function getCapacityLabel(campaign: LaunchData): string {
  return campaign.totalSpots === "unlimited"
    ? "Unlimited"
    : String(campaign.totalSpots);
}

export function getCreatorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "SY";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
