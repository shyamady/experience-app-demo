export type DashboardNavItem = {
  label: string;
  href: string;
  icon: DashboardNavIcon;
};

export type DashboardNavIcon =
  | "dashboard"
  | "analytics"
  | "product"
  | "experiences"
  | "registration"
  | "survey"
  | "orders"
  | "attendees"
  | "contacts"
  | "announcements"
  | "workflows"
  | "members"
  | "store"
  | "referrals"
  | "media"
  | "share"
  | "billing"
  | "settings";

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Analytics", href: "#", icon: "analytics" },
  { label: "Product", href: "/dashboard/launch/review", icon: "product" },
  { label: "Experiences", href: "#", icon: "experiences" },
  { label: "Registration", href: "#", icon: "registration" },
  { label: "Survey", href: "#", icon: "survey" },
  { label: "Orders", href: "#", icon: "orders" },
  { label: "Attendees", href: "#", icon: "attendees" },
  { label: "Contacts", href: "#", icon: "contacts" },
  { label: "Announcements", href: "#", icon: "announcements" },
  { label: "Workflows", href: "#", icon: "workflows" },
  { label: "Members", href: "#", icon: "members" },
  { label: "Store", href: "#", icon: "store" },
  { label: "Referrals", href: "#", icon: "referrals" },
  { label: "Media", href: "#", icon: "media" },
  { label: "Share", href: "#", icon: "share" },
  { label: "Billing", href: "#", icon: "billing" },
  { label: "Settings", href: "#", icon: "settings" },
];
