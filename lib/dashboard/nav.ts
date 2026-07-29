export type DashboardNavItem = {
  label: string;
  href: string;
  icon: DashboardNavIcon;
};

export type DashboardNavIcon =
  | "create"
  | "product"
  | "orders"
  | "attendees"
  | "calendar";

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Create", href: "/dashboard/create", icon: "create" },
  { label: "Products", href: "/dashboard/products", icon: "product" },
  { label: "Calendar", href: "/dashboard/calendar", icon: "calendar" },
  { label: "Orders", href: "/dashboard/orders", icon: "orders" },
  { label: "Attendees", href: "/dashboard/attendees", icon: "attendees" },
];
