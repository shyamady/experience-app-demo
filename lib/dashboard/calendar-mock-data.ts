import type {
  CalendarExperienceOption,
  CalendarSession,
  SessionFormValues,
} from "@/lib/dashboard/calendar-types";

const EXPERIENCES: CalendarExperienceOption[] = [
  {
    id: "nashville-sessions",
    title: "Inside Sarah’s Nashville Recording Sessions",
  },
  {
    id: "studio-vip",
    title: "VIP Studio Weekends",
  },
];

const BASE_INVENTORY = [
  {
    productId: "live-access",
    productName: "Live Studio Access",
    price: 35,
    sold: 42,
    capacity: 80,
    paused: false,
    soldOut: false,
  },
  {
    productId: "fan-feedback",
    productName: "Fan Feedback Session",
    price: 49,
    sold: 18,
    capacity: 40,
    paused: false,
    soldOut: false,
  },
  {
    productId: "vip-pass",
    productName: "VIP Studio Pass",
    price: 350,
    sold: 6,
    capacity: 8,
    paused: false,
    soldOut: false,
  },
  {
    productId: "sponsor",
    productName: "Sponsor Package",
    price: 11000,
    sold: 1,
    capacity: 1,
    paused: false,
    soldOut: true,
  },
];

const SAMPLE_ATTENDEES = [
  {
    id: "a1",
    name: "Emma Richardson",
    email: "emma.richardson@email.com",
    productName: "Live Studio Access",
    quantity: 1,
    paymentStatus: "paid" as const,
    attendanceStatus: "registered" as const,
  },
  {
    id: "a2",
    name: "James Chen",
    email: "james.chen@email.com",
    productName: "VIP Studio Pass",
    quantity: 1,
    paymentStatus: "paid" as const,
    attendanceStatus: "checked-in" as const,
  },
  {
    id: "a3",
    name: "Sofia Martinez",
    email: "sofia.m@email.com",
    productName: "Live Studio Access",
    quantity: 2,
    paymentStatus: "pending" as const,
    attendanceStatus: "registered" as const,
  },
];

export const MOCK_CALENDAR_SESSIONS: CalendarSession[] = [
  {
    id: "session-aug-19",
    title: "Nashville Recording Session",
    experienceId: "nashville-sessions",
    experienceTitle: "Inside Sarah’s Nashville Recording Sessions",
    description:
      "Live studio session with livestream access, Q&A, and optional VIP in-studio spots.",
    format: "online",
    date: "2026-08-19",
    displayDate: "August 19, 2026",
    startTime: "7:00 PM",
    endTime: "9:00 PM",
    timezone: "CT",
    meetingLink: "https://meuse.co/live/nashville-aug-19",
    status: "selling-fast",
    attendeeCount: 42,
    revenue: 4230,
    seriesId: "series-weekly-wed",
    recurrenceLabel: "Weekly on Wednesday · Ends after 8 sessions",
    inventory: BASE_INVENTORY.map((item) => ({ ...item })),
    attendees: SAMPLE_ATTENDEES,
    updates: [
      {
        id: "u1",
        title: "Join link opens 15 minutes early",
        message:
          "Your livestream link will appear in your attendee dashboard at 6:45 PM CT.",
        publishedAt: "August 12, 2026",
      },
    ],
    content: [
      {
        id: "c1",
        type: "livestream",
        title: "August 19 livestream",
        url: "https://meuse.co/live/nashville-aug-19",
      },
      {
        id: "c2",
        type: "materials",
        title: "Session guidelines PDF",
      },
    ],
  },
  {
    id: "session-aug-26",
    title: "Nashville Recording Session",
    experienceId: "nashville-sessions",
    experienceTitle: "Inside Sarah’s Nashville Recording Sessions",
    description: "Weekly recurring online studio session.",
    format: "online",
    date: "2026-08-26",
    displayDate: "August 26, 2026",
    startTime: "7:00 PM",
    endTime: "9:00 PM",
    timezone: "CT",
    meetingLink: "https://meuse.co/live/nashville-aug-26",
    status: "published",
    attendeeCount: 28,
    revenue: 2910,
    seriesId: "series-weekly-wed",
    recurrenceLabel: "Weekly on Wednesday · Ends after 8 sessions",
    inventory: [
      {
        productId: "live-access",
        productName: "Live Studio Access",
        price: 35,
        sold: 28,
        capacity: 80,
        paused: false,
        soldOut: false,
      },
      {
        productId: "fan-feedback",
        productName: "Fan Feedback Session",
        price: 49,
        sold: 12,
        capacity: 40,
        paused: false,
        soldOut: false,
      },
      {
        productId: "vip-pass",
        productName: "VIP Studio Pass",
        price: 350,
        sold: 0,
        capacity: 8,
        paused: true,
        soldOut: false,
      },
      {
        productId: "sponsor",
        productName: "Sponsor Package",
        price: 11000,
        sold: 0,
        capacity: 1,
        paused: false,
        soldOut: false,
      },
    ],
    attendees: SAMPLE_ATTENDEES.slice(0, 2),
    updates: [],
    content: [],
  },
  {
    id: "session-sep-2",
    title: "Nashville Recording Session",
    experienceId: "nashville-sessions",
    experienceTitle: "Inside Sarah’s Nashville Recording Sessions",
    description: "Weekly recurring online studio session.",
    format: "online",
    date: "2026-09-02",
    displayDate: "September 2, 2026",
    startTime: "7:00 PM",
    endTime: "9:00 PM",
    timezone: "CT",
    meetingLink: "https://meuse.co/live/nashville-sep-2",
    status: "sold-out",
    attendeeCount: 80,
    revenue: 8120,
    seriesId: "series-weekly-wed",
    recurrenceLabel: "Weekly on Wednesday · Ends after 8 sessions",
    inventory: [
      {
        productId: "live-access",
        productName: "Live Studio Access",
        price: 35,
        sold: 80,
        capacity: 80,
        paused: false,
        soldOut: true,
      },
      {
        productId: "fan-feedback",
        productName: "Fan Feedback Session",
        price: 49,
        sold: 40,
        capacity: 40,
        paused: false,
        soldOut: true,
      },
      {
        productId: "vip-pass",
        productName: "VIP Studio Pass",
        price: 350,
        sold: 8,
        capacity: 8,
        paused: false,
        soldOut: true,
      },
      {
        productId: "sponsor",
        productName: "Sponsor Package",
        price: 11000,
        sold: 1,
        capacity: 1,
        paused: false,
        soldOut: true,
      },
    ],
    attendees: SAMPLE_ATTENDEES,
    updates: [],
    content: [
      {
        id: "c3",
        type: "replay",
        title: "September 2 replay",
      },
    ],
  },
  {
    id: "session-vip-oct",
    title: "In-Studio VIP Night",
    experienceId: "studio-vip",
    experienceTitle: "VIP Studio Weekends",
    description: "Exclusive in-person studio visit with private playback.",
    format: "in-person",
    date: "2026-10-05",
    displayDate: "October 5, 2026",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    timezone: "CT",
    location: "Blackbird Studio, Nashville, TN",
    status: "published",
    attendeeCount: 5,
    revenue: 1750,
    inventory: [
      {
        productId: "vip-pass",
        productName: "VIP Studio Pass",
        price: 350,
        sold: 5,
        capacity: 8,
        paused: false,
        soldOut: false,
      },
      {
        productId: "gift",
        productName: "Signed Lyric Sheet",
        price: 75,
        sold: 3,
        capacity: 20,
        paused: false,
        soldOut: false,
      },
    ],
    attendees: [
      {
        id: "a4",
        name: "Noah Williams",
        email: "noah.w@email.com",
        productName: "VIP Studio Pass",
        quantity: 1,
        paymentStatus: "paid",
        attendanceStatus: "registered",
      },
    ],
    updates: [],
    content: [
      {
        id: "c4",
        type: "materials",
        title: "Arrival instructions",
      },
    ],
  },
  {
    id: "session-draft",
    title: "Holiday Acoustic Preview",
    experienceId: "nashville-sessions",
    experienceTitle: "Inside Sarah’s Nashville Recording Sessions",
    description: "Draft session for December holiday special.",
    format: "online",
    date: "2026-12-10",
    displayDate: "December 10, 2026",
    startTime: "6:00 PM",
    endTime: "7:30 PM",
    timezone: "CT",
    meetingLink: "",
    status: "draft",
    attendeeCount: 0,
    revenue: 0,
    inventory: [
      {
        productId: "live-access",
        productName: "Live Studio Access",
        price: 29,
        sold: 0,
        capacity: 100,
        paused: true,
        soldOut: false,
      },
    ],
    attendees: [],
    updates: [],
    content: [],
  },
  {
    id: "session-cancelled",
    title: "Nashville Recording Session",
    experienceId: "nashville-sessions",
    experienceTitle: "Inside Sarah’s Nashville Recording Sessions",
    description: "Cancelled due to studio maintenance.",
    format: "online",
    date: "2026-07-22",
    displayDate: "July 22, 2026",
    startTime: "7:00 PM",
    endTime: "9:00 PM",
    timezone: "CT",
    meetingLink: "https://meuse.co/live/nashville-jul-22",
    status: "cancelled",
    attendeeCount: 0,
    revenue: 0,
    seriesId: "series-weekly-wed",
    recurrenceLabel: "Weekly on Wednesday · Ends after 8 sessions",
    inventory: BASE_INVENTORY.map((item) => ({
      ...item,
      sold: 0,
      soldOut: false,
      paused: true,
    })),
    attendees: [],
    updates: [
      {
        id: "u2",
        title: "Session cancelled",
        message:
          "This session has been cancelled. Attendees were offered credit or a transfer.",
        publishedAt: "July 15, 2026",
      },
    ],
    content: [],
  },
  {
    id: "session-completed",
    title: "Nashville Recording Session",
    experienceId: "nashville-sessions",
    experienceTitle: "Inside Sarah’s Nashville Recording Sessions",
    description: "Completed July session.",
    format: "online",
    date: "2026-07-15",
    displayDate: "July 15, 2026",
    startTime: "7:00 PM",
    endTime: "9:00 PM",
    timezone: "CT",
    meetingLink: "https://meuse.co/live/nashville-jul-15",
    status: "completed",
    attendeeCount: 61,
    revenue: 5480,
    seriesId: "series-weekly-wed",
    recurrenceLabel: "Weekly on Wednesday · Ends after 8 sessions",
    inventory: [
      {
        productId: "live-access",
        productName: "Live Studio Access",
        price: 35,
        sold: 61,
        capacity: 80,
        paused: false,
        soldOut: false,
      },
    ],
    attendees: SAMPLE_ATTENDEES,
    updates: [],
    content: [
      {
        id: "c5",
        type: "replay",
        title: "July 15 replay",
        url: "https://meuse.co/replay/jul-15",
      },
      {
        id: "c6",
        type: "gift",
        title: "Digital lyric preview",
      },
    ],
  },
];

export function getCalendarExperiences(): CalendarExperienceOption[] {
  return EXPERIENCES;
}

export function getCalendarSessions(): CalendarSession[] {
  return MOCK_CALENDAR_SESSIONS;
}

export function getEmptySessionForm(): SessionFormValues {
  return {
    title: "",
    experienceId: EXPERIENCES[0].id,
    description: "",
    format: "online",
    date: "2026-09-09",
    startTime: "19:00",
    endTime: "21:00",
    timezone: "CT",
    meetingLink: "",
    location: "",
    recurrenceType: "none",
    recurrenceDay: "Wednesday",
    endsAfter: 8,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getInventoryStatusLabel(item: {
  sold: number;
  capacity: number | null;
  soldOut: boolean;
  paused: boolean;
}): string {
  if (item.paused) return "Paused";
  if (item.soldOut || (item.capacity !== null && item.sold >= item.capacity)) {
    return "Sold Out";
  }
  if (item.capacity === null) return "Available";
  const remaining = item.capacity - item.sold;
  if (remaining <= 2) return `Only ${remaining} Left`;
  return "Available";
}

/** Product → sessions that include this product in inventory. */
export function getAvailableSessionsForProduct(
  productId: string,
  sessions: CalendarSession[] = MOCK_CALENDAR_SESSIONS,
): string[] {
  return sessions
    .filter(
      (session) =>
        session.status !== "cancelled" &&
        session.inventory.some((item) => item.productId === productId),
    )
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((session) => session.displayDate.replace(/, \d{4}$/, ""));
}

export function groupSessionsByDate(
  sessions: CalendarSession[],
): Array<{ date: string; displayDate: string; sessions: CalendarSession[] }> {
  const map = new Map<
    string,
    { date: string; displayDate: string; sessions: CalendarSession[] }
  >();

  const sorted = [...sessions].sort((a, b) => a.date.localeCompare(b.date));

  for (const session of sorted) {
    const existing = map.get(session.date);
    if (existing) {
      existing.sessions.push(session);
    } else {
      map.set(session.date, {
        date: session.date,
        displayDate: session.displayDate,
        sessions: [session],
      });
    }
  }

  return Array.from(map.values());
}
