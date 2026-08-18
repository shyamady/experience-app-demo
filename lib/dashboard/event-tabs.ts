export type EventTabId =
  | "overview"
  | "guests"
  | "registration"
  | "updates"
  | "survey"
  | "insights"
  | "sponsors";

export type EventTab = {
  id: EventTabId;
  label: string;
  href: string;
};

export const EVENT_TABS: EventTab[] = [
  { id: "overview", label: "Overview", href: "/dashboard" },
  { id: "guests", label: "Guests", href: "/dashboard/attendees" },
  { id: "registration", label: "Registration", href: "/dashboard/products" },
  { id: "updates", label: "Updates", href: "/dashboard/updates" },
  { id: "survey", label: "Survey", href: "/dashboard/survey" },
  { id: "insights", label: "Insights", href: "/dashboard/orders" },
  { id: "sponsors", label: "Sponsors", href: "/dashboard/sponsors" },
];

export const EVENT_MORE_LINKS = [
  { label: "Calendar", href: "/dashboard/calendar" },
  { label: "Create Experience", href: "/dashboard/create" },
  { label: "Coupons", href: "/dashboard/products" },
];

export function getEventTabFromPath(pathname: string): EventTabId | null {
  if (pathname === "/dashboard") return "overview";
  if (pathname.startsWith("/dashboard/attendees")) return "guests";
  if (pathname.startsWith("/dashboard/products")) return "registration";
  if (pathname.startsWith("/dashboard/updates")) return "updates";
  if (pathname.startsWith("/dashboard/survey")) return "survey";
  if (pathname.startsWith("/dashboard/orders")) return "insights";
  if (pathname.startsWith("/dashboard/sponsors")) return "sponsors";
  return null;
}
