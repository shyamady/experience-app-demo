import type {
  AttendeeAccountExtras,
  AttendeeContent,
  AttendeeExperience,
  AttendeeOrder,
  AttendeeProfile,
  AttendeeUpdate,
  ChecklistItem,
  NextSession,
  PurchasedPackage,
} from "@/lib/attendee/types";

const ATTENDEE_AVATAR =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop";

const CREATOR_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop";

const COVER_IMAGE =
  "https://images.unsplash.com/photo-1598488035139-eec9d5db0ba6?w=1200&h=600&fit=crop";

const PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop";

const EXPERIENCE_ID = "nashville-sessions";
const EXPERIENCE_TITLE = "Inside Sarah Morgan’s Nashville Recording Sessions";

export const MOCK_ATTENDEE_PROFILE: AttendeeProfile = {
  id: "attendee-sarah-johnson",
  name: "Sarah Johnson",
  firstName: "Sarah",
  email: "sarah.johnson@email.com",
  avatarUrl: ATTENDEE_AVATAR,
  timezone: "America/Chicago (CST)",
  preferences: {
    emailNotifications: true,
    sessionReminders: true,
    creatorUpdates: true,
  },
};

export const MOCK_NEXT_SESSION: NextSession = {
  experienceId: EXPERIENCE_ID,
  experienceTitle: EXPERIENCE_TITLE,
  creatorName: "Sarah Morgan",
  creatorAvatarUrl: CREATOR_AVATAR,
  sessionDate: "August 18, 2026",
  sessionTime: "7:00 PM",
  timezone: "CST",
  format: "online",
  countdownLabel: "Starts in 3 days",
  status: "confirmed",
  joinAvailable: false,
  joinLinkHint:
    "The join link will become available 15 minutes before the session.",
  primaryCta: "Join Session",
};

export const MOCK_PURCHASED_PACKAGE: PurchasedPackage = {
  experienceId: EXPERIENCE_ID,
  productImageUrl: PRODUCT_IMAGE,
  packageName: "Live From the Nashville Studio",
  pricePaid: 35,
  purchaseDate: "August 5, 2026",
  includes: [
    "Live studio session",
    "Q&A access",
    "30-day replay",
    "Session updates",
  ],
  accessType: "online",
};

export const MOCK_CHECKLIST: ChecklistItem[] = [
  { id: "payment", label: "Payment completed", completed: true },
  { id: "profile", label: "Profile completed", completed: true },
  {
    id: "calendar",
    label: "Add session to calendar",
    completed: false,
    ctaLabel: "Add to Calendar",
  },
  {
    id: "question",
    label: "Submit your question",
    completed: false,
    ctaLabel: "Submit Question",
    href: "/attendee/experiences",
  },
  {
    id: "guidelines",
    label: "Review participation guidelines",
    completed: false,
    ctaLabel: "View Guidelines",
    href: "/attendee/experiences",
  },
];

export const MOCK_UPDATES: AttendeeUpdate[] = [
  {
    id: "update-1",
    creatorName: "Sarah Morgan",
    creatorAvatarUrl: CREATOR_AVATAR,
    experienceName: EXPERIENCE_TITLE,
    title: "Studio schedule confirmed",
    message:
      "Our August session is locked in for the 18th at 7:00 PM CST. Mark your calendar and get ready for a behind-the-scenes look at the new track.",
    publishedAt: "August 12, 2026",
    read: false,
  },
  {
    id: "update-2",
    creatorName: "Sarah Morgan",
    creatorAvatarUrl: CREATOR_AVATAR,
    experienceName: EXPERIENCE_TITLE,
    title: "Submit your questions before August 17",
    message:
      "I’ll be answering fan questions live during the session. Send yours in early so I can prioritize the best ones.",
    publishedAt: "August 10, 2026",
    read: false,
  },
  {
    id: "update-3",
    creatorName: "Sarah Morgan",
    creatorAvatarUrl: CREATOR_AVATAR,
    experienceName: EXPERIENCE_TITLE,
    title: "Replay will be available after the session",
    message:
      "Can’t make it live? Your package includes a 30-day replay. It will appear in your Content library shortly after we wrap.",
    publishedAt: "August 8, 2026",
    read: true,
  },
  {
    id: "update-4",
    creatorName: "Sarah Morgan",
    creatorAvatarUrl: CREATOR_AVATAR,
    experienceName: EXPERIENCE_TITLE,
    title: "New meeting link available",
    message:
      "We’ve updated the streaming link for better quality. You’ll see the active link on your dashboard when the session opens.",
    publishedAt: "August 6, 2026",
    read: true,
  },
  {
    id: "update-5",
    creatorName: "Sarah Morgan",
    creatorAvatarUrl: CREATOR_AVATAR,
    experienceName: EXPERIENCE_TITLE,
    title: "Replay published",
    message:
      "The July session replay is now available in your Content library. Watch anytime before it expires on September 15.",
    publishedAt: "July 28, 2026",
    read: true,
  },
];

export const MOCK_CONTENT: AttendeeContent[] = [
  {
    id: "content-welcome",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
    title: "Welcome video from Sarah",
    experienceName: EXPERIENCE_TITLE,
    contentType: "video",
    availability: "available",
    ctaLabel: "Watch Now",
  },
  {
    id: "content-bts",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1598488035139-eec9d5db0ba6?w=600&h=400&fit=crop",
    title: "Behind-the-scenes studio update",
    experienceName: EXPERIENCE_TITLE,
    contentType: "video",
    availability: "available",
    ctaLabel: "Watch Now",
  },
  {
    id: "content-replay",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop",
    title: "Previous session replay",
    experienceName: EXPERIENCE_TITLE,
    contentType: "replay",
    availability: "available",
    expirationDate: "September 15, 2026",
    ctaLabel: "Watch Now",
  },
  {
    id: "content-live",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop",
    title: "August live session",
    experienceName: EXPERIENCE_TITLE,
    contentType: "live",
    availability: "unlocks-after-session",
    ctaLabel: "Join Live",
  },
  {
    id: "content-download",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1514320291840-75555a4dea2e?w=600&h=400&fit=crop",
    title: "Session participation guide",
    experienceName: EXPERIENCE_TITLE,
    contentType: "download",
    availability: "available",
    ctaLabel: "Download",
  },
  {
    id: "content-gift",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1514320291840-75555a4dea2e?w=600&h=400&fit=crop",
    title: "Digital lyric preview",
    experienceName: EXPERIENCE_TITLE,
    contentType: "gift",
    availability: "coming-soon",
    ctaLabel: "View Gift",
  },
];

export const MOCK_EXPERIENCES: AttendeeExperience[] = [
  {
    id: EXPERIENCE_ID,
    coverImageUrl: COVER_IMAGE,
    title: EXPERIENCE_TITLE,
    creatorName: "Sarah Morgan",
    creatorAvatarUrl: CREATOR_AVATAR,
    packageName: "Live From the Nashville Studio",
    nextSessionDate: "August 18, 2026 · 7:00 PM CST",
    status: "upcoming",
    pricePaid: 35,
    accessType: "online",
    primaryCta: "Join Session",
    schedule: [
      "August 18, 2026 — Live studio session at 7:00 PM CST",
      "August 19, 2026 — Replay available in Content library",
      "September 15, 2026 — Replay access expires",
    ],
    includes: [
      "Live studio session",
      "Q&A access",
      "30-day replay",
      "Session updates",
    ],
    participationInstructions: [
      "Join from a desktop or mobile browser using the link on your dashboard.",
      "Submit questions before August 17 for a chance to be answered live.",
      "Use headphones for the best audio experience.",
      "The session will be recorded for replay access.",
    ],
    orderId: "ord-1042",
    purchaseDate: "August 5, 2026",
    format: "online",
  },
  {
    id: "fan-vote-session",
    coverImageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=600&fit=crop",
    title: EXPERIENCE_TITLE,
    creatorName: "Sarah Morgan",
    creatorAvatarUrl: CREATOR_AVATAR,
    packageName: "Fan Vote & Feedback Session",
    nextSessionDate: "September 2, 2026 · 6:30 PM CST",
    status: "upcoming",
    pricePaid: 49,
    accessType: "online",
    primaryCta: "View Experience",
    schedule: [
      "September 2, 2026 — Interactive feedback session",
      "September 3, 2026 — Voting results shared",
    ],
    includes: ["Vote on alternate mixes", "Leave feedback", "Session replay"],
    participationInstructions: [
      "Review the alternate mixes in your Content library before the session.",
      "Come prepared with specific feedback on arrangement and vocals.",
    ],
    orderId: "ord-1031",
    purchaseDate: "July 20, 2026",
    format: "online",
  },
  {
    id: "studio-guest-pass",
    coverImageUrl:
      "https://images.unsplash.com/photo-1598488035139-eec9d5db0ba6?w=1200&h=600&fit=crop",
    title: EXPERIENCE_TITLE,
    creatorName: "Sarah Morgan",
    creatorAvatarUrl: CREATOR_AVATAR,
    packageName: "In-Studio Guest Pass",
    nextSessionDate: "October 5, 2026 · 2:00 PM CST",
    status: "upcoming",
    pricePaid: 350,
    accessType: "in-person",
    primaryCta: "View Location",
    schedule: ["October 5, 2026 — In-studio visit at 2:00 PM CST"],
    includes: [
      "Two-hour studio visit",
      "Private playback",
      "Photo moment with Sarah",
    ],
    participationInstructions: [
      "Arrive 15 minutes early for check-in at the studio lobby.",
      "Bring a valid photo ID for entry.",
      "Signed waiver must be completed before your visit.",
    ],
    orderId: "ord-1028",
    purchaseDate: "July 12, 2026",
    format: "in-person",
    location: "Blackbird Studio, 2806 Azalea Pl, Nashville, TN 37204",
    checkInTime: "1:45 PM CST",
    waiverSigned: false,
  },
  {
    id: "july-session",
    coverImageUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&h=600&fit=crop",
    title: EXPERIENCE_TITLE,
    creatorName: "Sarah Morgan",
    creatorAvatarUrl: CREATOR_AVATAR,
    packageName: "Live From the Nashville Studio",
    nextSessionDate: "Completed July 15, 2026",
    status: "completed",
    pricePaid: 35,
    accessType: "online",
    primaryCta: "Watch Replay",
    schedule: ["July 15, 2026 — Live session completed"],
    includes: ["Live studio session", "Q&A access", "30-day replay"],
    participationInstructions: ["Replay available in your Content library."],
    orderId: "ord-1015",
    purchaseDate: "June 28, 2026",
    format: "online",
  },
];

export const MOCK_ORDERS: AttendeeOrder[] = [
  {
    id: "ord-1042",
    experience: EXPERIENCE_TITLE,
    packageName: "Live From the Nashville Studio",
    amount: 35,
    purchaseDate: "August 5, 2026",
    status: "confirmed",
  },
  {
    id: "ord-1031",
    experience: EXPERIENCE_TITLE,
    packageName: "Fan Vote & Feedback Session",
    amount: 49,
    purchaseDate: "July 20, 2026",
    status: "confirmed",
  },
  {
    id: "ord-1028",
    experience: EXPERIENCE_TITLE,
    packageName: "In-Studio Guest Pass",
    amount: 350,
    purchaseDate: "July 12, 2026",
    status: "confirmed",
  },
  {
    id: "ord-1015",
    experience: EXPERIENCE_TITLE,
    packageName: "Live From the Nashville Studio",
    amount: 35,
    purchaseDate: "June 28, 2026",
    status: "confirmed",
  },
];

export const MOCK_ACCOUNT_EXTRAS: AttendeeAccountExtras = {
  emergencyContact: "Not provided",
  waiverStatus: "Pending — required for In-Studio Guest Pass",
};

export function getMockAttendeeProfile(): AttendeeProfile {
  return MOCK_ATTENDEE_PROFILE;
}

export function getMockNextSession(): NextSession {
  return MOCK_NEXT_SESSION;
}

export function getMockPurchasedPackage(): PurchasedPackage {
  return MOCK_PURCHASED_PACKAGE;
}

export function getMockChecklist(): ChecklistItem[] {
  return MOCK_CHECKLIST;
}

export function getMockUpdates(): AttendeeUpdate[] {
  return MOCK_UPDATES;
}

export function getMockContent(): AttendeeContent[] {
  return MOCK_CONTENT;
}

export function getMockExperiences(): AttendeeExperience[] {
  return MOCK_EXPERIENCES;
}

export function getMockOrders(): AttendeeOrder[] {
  return MOCK_ORDERS;
}

export function getMockAccountExtras(): AttendeeAccountExtras {
  return MOCK_ACCOUNT_EXTRAS;
}
