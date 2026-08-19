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
  const hasDetails = Boolean(
    campaign.title.trim() && campaign.description.trim(),
  );
  const hasPhoto = Boolean(campaign.coverImageUrl);
  const hasGoal =
    campaign.fundingGoal > 0 ||
    Boolean(campaign.goalValue && campaign.goalValue > 0) ||
    (campaign.totalSpots !== "unlimited" && campaign.totalSpots > 0);
  const hasParticipation = campaign.products.some(
    (product) => product.active && product.price >= 0,
  );
  const paymentSetup = false;
  const hasReview = Boolean(campaign.slug);

  const items: ReadinessItem[] = [
    {
      id: "details",
      title: "Project details",
      status: hasDetails ? "complete" : "incomplete",
      actionLabel: "Edit",
      href: "/dashboard/settings",
      featured: true,
    },
    {
      id: "photo",
      title: "Cover image",
      status: hasPhoto ? "complete" : "incomplete",
      actionLabel: "Edit",
      href: `/dashboard/products/${campaign.products[0]?.id ?? "live-nashville-studio"}/edit`,
      featured: true,
    },
    {
      id: "goal",
      title: "Goal",
      status: hasGoal ? "complete" : "incomplete",
      actionLabel: "Edit",
      href: "/dashboard/overview",
    },
    {
      id: "participation",
      title: "Participation",
      status: hasParticipation ? "complete" : "incomplete",
      actionLabel: "Manage",
      href: "/dashboard/products",
    },
    {
      id: "payment",
      title: "Payment setup",
      status: paymentSetup ? "complete" : "action",
      actionLabel: "Finish setup",
      href: "/dashboard/payment",
    },
    {
      id: "review",
      title: "Launch page review",
      status: hasReview ? "incomplete" : "incomplete",
      actionLabel: "Preview",
      href: `/launch/${campaign.slug}`,
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
