export type EventTabId =
  | "overview"
  | "participants"
  | "participation"
  | "orders"
  | "sponsors"
  | "updates"
  | "insights";

export type EventTab = {
  id: EventTabId;
  label: string;
  href: string;
};

export const EVENT_TABS: EventTab[] = [
  { id: "overview", label: "Overview", href: "/dashboard/overview" },
  { id: "participants", label: "Participants", href: "/dashboard/attendees" },
  { id: "participation", label: "Participation", href: "/dashboard/products" },
  { id: "orders", label: "Orders", href: "/dashboard/orders" },
  { id: "sponsors", label: "Sponsors", href: "/dashboard/sponsors" },
  { id: "updates", label: "Updates", href: "/dashboard/updates" },
  { id: "insights", label: "Insights", href: "/dashboard/analytics" },
];

export const EVENT_MORE_LINKS = [
  { label: "Survey", href: "/dashboard/survey" },
  { label: "Calendar", href: "/dashboard/calendar" },
  { label: "Messages", href: "/dashboard/messages" },
  { label: "Settings", href: "/dashboard/settings" },
];

export function getEventTabFromPath(pathname: string): EventTabId | null {
  if (pathname.startsWith("/dashboard/overview")) return "overview";
  if (pathname.startsWith("/dashboard/attendees")) return "participants";
  if (pathname.startsWith("/dashboard/products")) return "participation";
  if (pathname.startsWith("/dashboard/orders")) return "orders";
  if (pathname.startsWith("/dashboard/sponsors")) return "sponsors";
  if (pathname.startsWith("/dashboard/updates")) return "updates";
  if (pathname.startsWith("/dashboard/analytics")) return "insights";
  return null;
}
