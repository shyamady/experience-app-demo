export type GlobalNavItem = {
  label: string;
  href: string;
};

export const GLOBAL_NAV_ITEMS: GlobalNavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Payment", href: "/dashboard/payment" },
  { label: "Invite", href: "/dashboard/invite" },
  { label: "My Tickets", href: "/attendee" },
];

export function isGlobalNavActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return (
      pathname === "/dashboard" ||
      (pathname.startsWith("/dashboard/") &&
        !pathname.startsWith("/dashboard/payment") &&
        !pathname.startsWith("/dashboard/invite"))
    );
  }
  if (href === "/attendee") {
    return pathname.startsWith("/attendee");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
