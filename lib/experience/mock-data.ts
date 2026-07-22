import type { PublicExperienceData, PublicExperienceProduct } from "@/lib/experience/types";

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
    about: {
      what: "Sarah is recording a new batch of songs in Nashville and opening the studio doors to fans who want to be part of the process — from first takes to final mixes.",
      why: "This is a rare look inside a real recording workflow: live sessions, creative decisions, and the moments that never make it to social media.",
      how: "Choose the access level that fits you — watch live, vote on mixes, join a private Q&A, visit the studio, or support monthly from anywhere.",
      afterPurchase:
        "You’ll receive email confirmation with access details, calendar invites where applicable, and updates as each session goes live.",
    },
  },
  products: [
    {
      id: "live-nashville-studio",
      title: "Live From the Nashville Studio",
      accessBadge: "Live Access",
      price: 35,
      priceType: "one-time",
      availabilityKind: "unlimited",
      availabilityLabel: "Unlimited",
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
      availabilityLabel: "300 spots",
      remainingSpots: 187,
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
      availabilityLabel: "150 spots",
      remainingSpots: 42,
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
      availabilityLabel: "8 spots",
      remainingSpots: 3,
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
      availabilityLabel: "150 spots",
      remainingSpots: 89,
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
      availabilityLabel: "Open",
      description: "Stay close to the process with monthly updates.",
      includes: [
        "Monthly demos",
        "Voice notes from Sarah",
        "Session updates",
      ],
      imageUrl: PRODUCT_IMAGES.supporter,
    },
    {
      id: "presenting-sponsor",
      title: "Presenting Sponsor Package",
      accessBadge: "Sponsor Access",
      price: 11000,
      priceType: "one-time",
      availabilityKind: "limited",
      availabilityLabel: "1 slot",
      remainingSpots: 1,
      description: "Lead sponsorship across the full experience.",
      includes: [
        "Brand placement across sessions",
        "Featured sponsor credits",
        "Priority access for your team",
      ],
      imageUrl: PRODUCT_IMAGES.sponsor,
    },
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
