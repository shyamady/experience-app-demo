export type AttendeeNavIcon =
  | "home"
  | "experiences"
  | "updates"
  | "content"
  | "account";

export type AttendeeNavItem = {
  label: string;
  href: string;
  icon: AttendeeNavIcon;
};

export const ATTENDEE_NAV_ITEMS: AttendeeNavItem[] = [
  { label: "Home", href: "/attendee", icon: "home" },
  { label: "My Experiences", href: "/attendee/experiences", icon: "experiences" },
  { label: "Updates", href: "/attendee/updates", icon: "updates" },
  { label: "Content", href: "/attendee/content", icon: "content" },
  { label: "Account", href: "/attendee/account", icon: "account" },
];
