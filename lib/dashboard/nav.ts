export type DashboardNavIcon =
  | "home"
  | "page"
  | "sales"
  | "product"
  | "sponsors"
  | "orders"
  | "attendees"
  | "cocreate"
  | "community"
  | "members"
  | "messages"
  | "analytics"
  | "settings"
  | "create"
  | "calendar";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: DashboardNavIcon;
  external?: boolean;
};

export type DashboardNavGroup = {
  label: string;
  items: DashboardNavItem[];
};

export const DASHBOARD_NAV_GROUPS: DashboardNavGroup[] = [
  {
    label: "My Launch",
    items: [
      { label: "Launches", href: "/dashboard", icon: "home" },
      { label: "Overview", href: "/dashboard/overview", icon: "page" },
    ],
  },
  {
    label: "Sell",
    items: [
      { label: "Participation", href: "/dashboard/products", icon: "product" },
      { label: "Sponsorship", href: "/dashboard/sponsors", icon: "sponsors" },
      { label: "Orders", href: "/dashboard/orders", icon: "orders" },
      { label: "Participants", href: "/dashboard/attendees", icon: "attendees" },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Settings", href: "/dashboard/settings", icon: "settings" },
    ],
  },
];

export const MOBILE_TAB_ITEMS: DashboardNavItem[] = [
  { label: "Launches", href: "/dashboard", icon: "home" },
  { label: "Overview", href: "/dashboard/overview", icon: "page" },
  { label: "Orders", href: "/dashboard/orders", icon: "orders" },
];

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] =
  DASHBOARD_NAV_GROUPS.flatMap((group) => group.items);

export function isDashboardNavActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}
