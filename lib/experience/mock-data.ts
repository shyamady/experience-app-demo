import type {
  PublicExperienceData,
  PublicExperienceProduct,
  ExperienceSessionDate,
  ProductInventory,
} from "@/lib/experience/types";

const CREATOR_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop";

const COVER_IMAGE =
  "https://images.unsplash.com/photo-1598488035139-eec9d5db0ba6?w=1600&h=900&fit=crop";

const PRODUCT_IMAGES = {
  livestream:
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop",
  feedback:
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
  zoom:
    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop",
  studio:
    "https://images.unsplash.com/photo-1598488035139-eec9d5db0ba6?w=600&h=400&fit=crop",
  gift:
    "https://images.unsplash.com/photo-1514320291840-75555a4dea2e?w=600&h=400&fit=crop",
  supporter:
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop",
  sponsor:
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
} as const;

function inventory(
  remaining: number | null,
  soldOut = remaining === 0,
): ProductInventory {
  return { remaining, soldOut };
}

function countAvailableProducts(
  products: ExperienceSessionDate["products"],
): number {
  return Object.values(products).filter((item) => !item.soldOut).length;
}

function withDateMeta(
  date: Omit<ExperienceSessionDate, "label"> & {
    label?: ExperienceSessionDate["label"];
  },
): ExperienceSessionDate {
  const availableCount = countAvailableProducts(date.products);
  const allSoldOut = availableCount === 0;
  const lowAvailability = availableCount > 0 && availableCount <= 2;

  return {
    ...date,
    label:
      date.label ??
      (allSoldOut ? "Sold Out" : lowAvailability ? "Selling Fast" : null),
  };
}

const PRODUCTS: PublicExperienceProduct[] = [
  {
    id: "live-nashville-studio",
    title: "Live From the Nashville Studio",
    accessBadge: "Live Access",
    price: 35,
    priceType: "one-time",
    availabilityKind: "limited",
    availabilityLabel: "Limited",
    description: "Watch the session live and stay for the replay.",
    includes: ["Livestream", "Q&A", "Replay access"],
    imageUrl: PRODUCT_IMAGES.livestream,
  },
  {
    id: "fan-vote-feedback",
    title: "Fan Vote & Feedback Session",
    accessBadge: "Interactive Access",
    price: 49,
    priceType: "one-time",
    availabilityKind: "limited",
    availabilityLabel: "Limited",
    description: "Help shape the final sound with your vote and notes.",
    includes: ["Vote on alternate mixes", "Leave feedback", "Session replay"],
    imageUrl: PRODUCT_IMAGES.feedback,
  },
  {
    id: "post-session-zoom",
    title: "Post-Session Zoom Q&A",
    accessBadge: "Live Access",
    price: 59,
    priceType: "one-time",
    availabilityKind: "limited",
    availabilityLabel: "Limited",
    description: "A private conversation after the studio wraps.",
    includes: [
      "Private Q&A with the artist",
      "Producer join-in",
      "Recorded recap",
    ],
    imageUrl: PRODUCT_IMAGES.zoom,
  },
  {
    id: "in-studio-guest",
    title: "In-Studio Guest Pass",
    accessBadge: "VIP Access",
    price: 350,
    priceType: "one-time",
    availabilityKind: "limited",
    availabilityLabel: "Limited",
    description: "Experience the session in person at the studio.",
    includes: [
      "Two-hour studio visit",
      "Private playback",
      "Photo moment with Sarah",
    ],
    imageUrl: PRODUCT_IMAGES.studio,
  },
  {
    id: "signed-lyric-sheet",
    title: "Signed Lyric Sheet + Early Track Preview",
    accessBadge: "Gift Access",
    price: 75,
    priceType: "one-time",
    availabilityKind: "limited",
    availabilityLabel: "Limited",
    description: "A keepsake plus early access to unreleased music.",
    includes: [
      "Signed lyric sheet",
      "Private preview link",
      "Shipped to your door",
    ],
    imageUrl: PRODUCT_IMAGES.gift,
  },
  {
    id: "studio-supporter",
    title: "Studio Supporter",
    accessBadge: "Monthly Support",
    price: 10,
    priceType: "monthly",
    availabilityKind: "open",
    availabilityLabel: "Available",
    description: "Stay close to the process with monthly updates.",
    includes: ["Monthly demos", "Voice notes from Sarah", "Session updates"],
    imageUrl: PRODUCT_IMAGES.supporter,
  },
  {
    id: "presenting-sponsor",
    title: "Presenting Sponsor Package",
    accessBadge: "Sponsor Access",
    price: 11000,
    priceType: "one-time",
    availabilityKind: "limited",
    availabilityLabel: "Limited",
    description: "Lead sponsorship across the full experience.",
    includes: [
      "Brand placement across sessions",
      "Featured sponsor credits",
      "Priority access for your team",
    ],
    imageUrl: PRODUCT_IMAGES.sponsor,
  },
];

export const MOCK_EXPERIENCE: PublicExperienceData = {
  creator: {
    name: "Sarah Morgan",
    avatarUrl: CREATOR_AVATAR,
    bio: "Nashville-based singer-songwriter sharing the studio process with fans who want a front-row seat to how songs come to life.",
    followerCount: "128K followers",
  },
  experience: {
    title: "Inside Sarah’s Nashville Recording Sessions",
    description:
      "Join Sarah’s creative process through livestreams, private feedback sessions, studio access, exclusive gifts, and monthly behind-the-scenes updates.",
    location: "Nashville, Tennessee",
    schedule: "Monthly",
    coverImageUrl: COVER_IMAGE,
    heroBadge: "Creator Access",
    about:
      "Join Sarah’s creative process through livestreams, private feedback sessions, studio access, exclusive gifts, and monthly behind-the-scenes updates. Each session gives fans a closer look at how music is created, from the first idea to the final mix.",
  },
  products: PRODUCTS,
  dates: [
    withDateMeta({
      id: "aug-5",
      date: "2026-08-05",
      displayDate: "August 5, 2026",
      time: "7:00 PM",
      timezone: "CT",
      products: {
        "live-nashville-studio": inventory(18),
        "fan-vote-feedback": inventory(40),
        "post-session-zoom": inventory(22),
        "in-studio-guest": inventory(1),
        "signed-lyric-sheet": inventory(55),
        "studio-supporter": inventory(null),
        "presenting-sponsor": inventory(1),
      },
    }),
    withDateMeta({
      id: "aug-12",
      date: "2026-08-12",
      displayDate: "August 12, 2026",
      time: "7:00 PM",
      timezone: "CT",
      label: "Sold Out",
      products: {
        "live-nashville-studio": inventory(0, true),
        "fan-vote-feedback": inventory(0, true),
        "post-session-zoom": inventory(0, true),
        "in-studio-guest": inventory(0, true),
        "signed-lyric-sheet": inventory(0, true),
        "studio-supporter": inventory(null, true),
        "presenting-sponsor": inventory(0, true),
      },
    }),
    withDateMeta({
      id: "aug-19",
      date: "2026-08-19",
      displayDate: "August 19, 2026",
      time: "7:00 PM",
      timezone: "CT",
      products: {
        "live-nashville-studio": inventory(24),
        "fan-vote-feedback": inventory(0, true),
        "post-session-zoom": inventory(8),
        "in-studio-guest": inventory(2),
        "signed-lyric-sheet": inventory(35),
        "studio-supporter": inventory(null),
        "presenting-sponsor": inventory(1),
      },
    }),
    withDateMeta({
      id: "aug-26",
      date: "2026-08-26",
      displayDate: "August 26, 2026",
      time: "7:00 PM",
      timezone: "CT",
      products: {
        "live-nashville-studio": inventory(41),
        "fan-vote-feedback": inventory(12),
        "post-session-zoom": inventory(0, true),
        "in-studio-guest": inventory(0, true),
        "signed-lyric-sheet": inventory(20),
        "studio-supporter": inventory(null),
        "presenting-sponsor": inventory(0, true),
      },
    }),
    withDateMeta({
      id: "sep-2",
      date: "2026-09-02",
      displayDate: "September 2, 2026",
      time: "7:00 PM",
      timezone: "CT",
      products: {
        "live-nashville-studio": inventory(50),
        "fan-vote-feedback": inventory(90),
        "post-session-zoom": inventory(60),
        "in-studio-guest": inventory(5),
        "signed-lyric-sheet": inventory(100),
        "studio-supporter": inventory(null),
        "presenting-sponsor": inventory(1),
      },
    }),
  ],
};

export function getMockExperience(): PublicExperienceData {
  return MOCK_EXPERIENCE;
}

export function getExperienceProductById(
  id: string,
): PublicExperienceProduct | undefined {
  return MOCK_EXPERIENCE.products.find((product) => product.id === id);
}

export function getExperienceDateById(
  id: string,
): ExperienceSessionDate | undefined {
  return MOCK_EXPERIENCE.dates.find((session) => session.id === id);
}

export function getAvailableProductCount(
  session: ExperienceSessionDate,
): number {
  return countAvailableProducts(session.products);
}

export function getTotalRemainingSpots(
  session: ExperienceSessionDate,
): number {
  return Object.values(session.products).reduce((sum, item) => {
    if (item.soldOut || item.remaining === null) return sum;
    return sum + item.remaining;
  }, 0);
}

export function getSessionAvailabilitySummary(
  session: ExperienceSessionDate,
): string {
  if (isSessionSoldOut(session)) return "Sold out";

  const totalRemaining = getTotalRemainingSpots(session);
  const availableTypes = getAvailableProductCount(session);
  const hasOpenInventory = Object.values(session.products).some(
    (item) => !item.soldOut && item.remaining === null,
  );

  if (totalRemaining > 0) {
    return `${totalRemaining} spot${totalRemaining === 1 ? "" : "s"} available`;
  }

  if (hasOpenInventory) {
    return `${availableTypes} ticket${availableTypes === 1 ? "" : "s"} available`;
  }

  return `${availableTypes} ticket${availableTypes === 1 ? "" : "s"} available`;
}

export function getSessionWeekday(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function isSessionSoldOut(session: ExperienceSessionDate): boolean {
  return Object.values(session.products).every((item) => item.soldOut);
}
