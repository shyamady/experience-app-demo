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
      { label: "Home", href: "/dashboard", icon: "home" },
      { label: "Launch Page", href: "/dashboard/launch-page", icon: "page" },
    ],
  },
  {
    label: "Sell",
    items: [
      { label: "Sales", href: "/dashboard/sales", icon: "sales" },
      { label: "Participation", href: "/dashboard/products", icon: "product" },
      { label: "Sponsorship", href: "/dashboard/sponsors", icon: "sponsors" },
      { label: "Orders", href: "/dashboard/orders", icon: "orders" },
      { label: "Attendees", href: "/dashboard/attendees", icon: "attendees" },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Co-Create", href: "/dashboard/co-create", icon: "cocreate" },
      { label: "Community Feed", href: "/dashboard/community", icon: "community" },
      { label: "Members", href: "/dashboard/members", icon: "members" },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "Messages", href: "/dashboard/messages", icon: "messages" },
      { label: "Analytics", href: "/dashboard/analytics", icon: "analytics" },
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
  { label: "Home", href: "/dashboard", icon: "home" },
  { label: "Co-Create", href: "/dashboard/co-create", icon: "cocreate" },
  { label: "Community", href: "/dashboard/community", icon: "community" },
];

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] =
  DASHBOARD_NAV_GROUPS.flatMap((group) => group.items);

export function isDashboardNavActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}
