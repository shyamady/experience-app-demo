export type DashboardNavItem = {
  label: string;
  href: string;
  icon: DashboardNavIcon;
};

export type DashboardNavIcon = "product" | "orders" | "attendees";

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Products", href: "/dashboard/products", icon: "product" },
  { label: "Orders", href: "/dashboard/orders", icon: "orders" },
  { label: "Attendees", href: "/dashboard/attendees", icon: "attendees" },
];
