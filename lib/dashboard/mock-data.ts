import type { Attendee, Order } from "@/lib/dashboard/types";

const ATTENDEE_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
];

const DEMO_ATTENDEES: Attendee[] = [
  {
    id: "att-1",
    name: "Emma Richardson",
    email: "emma.richardson@email.com",
    avatarUrl: ATTENDEE_AVATARS[0],
    packageName: "Studio Day Pass",
    seasonsJoined: 3,
    status: "confirmed",
  },
  {
    id: "att-2",
    name: "James Chen",
    email: "james.chen@email.com",
    avatarUrl: ATTENDEE_AVATARS[1],
    packageName: "VIP Backstage Access",
    seasonsJoined: 1,
    status: "confirmed",
  },
  {
    id: "att-3",
    name: "Sofia Martinez",
    email: "sofia.m@email.com",
    avatarUrl: ATTENDEE_AVATARS[2],
    packageName: "Monthly Member",
    seasonsJoined: 5,
    status: "confirmed",
  },
  {
    id: "att-4",
    name: "Liam O'Connor",
    email: "liam.oconnor@email.com",
    avatarUrl: ATTENDEE_AVATARS[3],
    packageName: "Studio Day Pass",
    seasonsJoined: 2,
    status: "pending",
  },
  {
    id: "att-5",
    name: "Ava Thompson",
    email: "ava.thompson@email.com",
    avatarUrl: ATTENDEE_AVATARS[4],
    packageName: "Live Stream Access",
    seasonsJoined: 1,
    status: "pending",
  },
  {
    id: "att-6",
    name: "Noah Williams",
    email: "noah.w@email.com",
    avatarUrl: ATTENDEE_AVATARS[5],
    packageName: "Monthly Member",
    seasonsJoined: 4,
    status: "confirmed",
  },
  {
    id: "att-7",
    name: "Mia Johnson",
    email: "mia.johnson@email.com",
    avatarUrl: ATTENDEE_AVATARS[6],
    packageName: "VIP Backstage Access",
    seasonsJoined: 2,
    status: "cancelled",
  },
  {
    id: "att-8",
    name: "Ethan Davis",
    email: "ethan.davis@email.com",
    avatarUrl: ATTENDEE_AVATARS[7],
    packageName: "Studio Day Pass",
    seasonsJoined: 1,
    status: "confirmed",
  },
];

const DEMO_ORDERS: Order[] = [
  {
    id: "ord-1042",
    customerName: "Emma Richardson",
    customerEmail: "emma.richardson@email.com",
    productName: "Studio Day Pass",
    amount: 149,
    paymentStatus: "paid",
    purchasedAt: "2026-07-18T14:32:00Z",
  },
  {
    id: "ord-1041",
    customerName: "James Chen",
    customerEmail: "james.chen@email.com",
    productName: "VIP Backstage Access",
    amount: 499,
    paymentStatus: "paid",
    purchasedAt: "2026-07-17T09:15:00Z",
  },
  {
    id: "ord-1040",
    customerName: "Sofia Martinez",
    customerEmail: "sofia.m@email.com",
    productName: "Monthly Member",
    amount: 29,
    paymentStatus: "paid",
    purchasedAt: "2026-07-16T18:44:00Z",
  },
  {
    id: "ord-1039",
    customerName: "Liam O'Connor",
    customerEmail: "liam.oconnor@email.com",
    productName: "Studio Day Pass",
    amount: 149,
    paymentStatus: "pending",
    purchasedAt: "2026-07-15T11:20:00Z",
  },
  {
    id: "ord-1038",
    customerName: "Mia Johnson",
    customerEmail: "mia.johnson@email.com",
    productName: "VIP Backstage Access",
    amount: 499,
    paymentStatus: "refunded",
    purchasedAt: "2026-07-12T16:08:00Z",
  },
  {
    id: "ord-1037",
    customerName: "Noah Williams",
    customerEmail: "noah.w@email.com",
    productName: "Monthly Member",
    amount: 29,
    paymentStatus: "paid",
    purchasedAt: "2026-07-10T08:55:00Z",
  },
  {
    id: "ord-1036",
    customerName: "Ava Thompson",
    customerEmail: "ava.thompson@email.com",
    productName: "Live Stream Access",
    amount: 49,
    paymentStatus: "pending",
    purchasedAt: "2026-07-09T20:30:00Z",
  },
  {
    id: "ord-1035",
    customerName: "Ethan Davis",
    customerEmail: "ethan.davis@email.com",
    productName: "Studio Day Pass",
    amount: 149,
    paymentStatus: "paid",
    purchasedAt: "2026-07-08T13:12:00Z",
  },
];

export function getDemoAttendees(): Attendee[] {
  return DEMO_ATTENDEES;
}

export function getDemoOrders(): Order[] {
  return DEMO_ORDERS;
}

export function formatSeasonLabel(seasonsJoined: number): string {
  const mod100 = seasonsJoined % 100;
  const mod10 = seasonsJoined % 10;
  const suffix =
    mod10 === 1 && mod100 !== 11
      ? "st"
      : mod10 === 2 && mod100 !== 12
        ? "nd"
        : mod10 === 3 && mod100 !== 13
          ? "rd"
          : "th";
  return `${seasonsJoined}${suffix} Season`;
}

export function formatPurchasedAt(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(isoDate));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
