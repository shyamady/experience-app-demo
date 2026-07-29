import type {
  CalendarEvent,
  CreatorProfile,
  InspirationExperience,
  RemixResult,
} from "@/lib/dashboard/create-types";

export const MOCK_CREATOR_PROFILE: CreatorProfile = {
  name: "Sarah Morgan",
  category: "Music & Lifestyle",
  location: "Nashville, TN",
  audienceSize: "185K followers",
  audienceDemographics: "Fans 22–34 who love behind-the-scenes travel and music",
  previousProducts: [
    "Live Studio Access",
    "VIP Studio Pass",
    "Fan Feedback Session",
  ],
  upcomingActivities: [
    "Tokyo trip",
    "Recording session",
    "Brand collaboration call",
  ],
};

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "cal-dinner-alex",
    title: "Dinner with Alex",
    startAt: "2026-08-19T19:00:00",
    endAt: "2026-08-19T21:00:00",
    displayDate: "August 19",
    displayTime: "7:00 PM",
    location: "Brooklyn, New York",
    description:
      "Catch-up dinner with Alex at a quiet Brooklyn restaurant. Informal conversation, no agenda.",
    category: "dinner",
    status: "upcoming",
    opportunityLabel:
      "Turn this into a private conversation, fan Q&A, or sponsored meetup.",
    productIdeas: [
      { title: "Join the Conversation", type: "interactive" },
      { title: "Submit a Question", type: "digital" },
      { title: "Private Recap", type: "digital" },
      { title: "Sponsor the Meetup", type: "sponsor" },
    ],
  },
  {
    id: "cal-recording",
    title: "Recording Session",
    startAt: "2026-08-22T14:00:00",
    endAt: "2026-08-22T18:00:00",
    displayDate: "August 22",
    displayTime: "2:00 PM",
    location: "Blackbird Studio, Nashville",
    description:
      "Afternoon recording session for new tracks. Studio booked for four hours.",
    category: "recording",
    status: "upcoming",
    opportunityLabel:
      "Offer livestream access, fan voting, or VIP studio spots.",
    productIdeas: [
      { title: "Live Studio Access", type: "livestream" },
      { title: "Fan Vote: Next Song", type: "interactive" },
      { title: "VIP Studio Visit", type: "vip" },
      { title: "Presenting Sponsor", type: "sponsor" },
    ],
  },
  {
    id: "cal-tokyo",
    title: "Tokyo Trip",
    startAt: "2026-09-03T09:00:00",
    endAt: "2026-09-10T18:00:00",
    displayDate: "Sep 3–10",
    displayTime: "All day",
    location: "Tokyo, Japan",
    description:
      "Week-long trip across Tokyo for content, culture, and creative inspiration.",
    category: "travel",
    status: "upcoming",
    opportunityLabel:
      "Build a travel experience with live updates, voting, and VIP meetups.",
    productIdeas: [
      { title: "Live From Tokyo", type: "livestream" },
      { title: "Choose the Next Stop", type: "interactive" },
      { title: "Private Group Q&A", type: "vip" },
      { title: "Travel Sponsor Pack", type: "sponsor" },
    ],
  },
  {
    id: "cal-brand",
    title: "Brand Collaboration Call",
    startAt: "2026-08-25T11:00:00",
    endAt: "2026-08-25T12:00:00",
    displayDate: "August 25",
    displayTime: "11:00 AM",
    location: "Online · Zoom",
    description: "Strategy call with a brand partner about an upcoming collab.",
    category: "brand",
    status: "upcoming",
    opportunityLabel:
      "Package this into a sponsor-facing experience or behind-the-scenes drop.",
    productIdeas: [
      { title: "Collab Preview Access", type: "digital" },
      { title: "Sponsor Office Hours", type: "sponsor" },
      { title: "Behind-the-Scenes Recap", type: "digital" },
    ],
  },
  {
    id: "cal-run",
    title: "Morning Run Club",
    startAt: "2026-08-28T07:00:00",
    endAt: "2026-08-28T08:00:00",
    displayDate: "August 28",
    displayTime: "7:00 AM",
    location: "Centennial Park, Nashville",
    description: "Weekly morning run with friends. Open and casual.",
    category: "fitness",
    status: "upcoming",
    opportunityLabel:
      "Invite fans to join a limited run club experience or training challenge.",
    productIdeas: [
      { title: "Join the Run", type: "in-person" },
      { title: "Training Challenge Pass", type: "membership" },
      { title: "Digital Warm-up Guide", type: "digital" },
    ],
  },
  {
    id: "cal-performance",
    title: "Live Performance",
    startAt: "2026-09-12T20:00:00",
    endAt: "2026-09-12T22:00:00",
    displayDate: "September 12",
    displayTime: "8:00 PM",
    location: "The Basement East, Nashville",
    description: "Headline live set with acoustic openers.",
    category: "performance",
    status: "upcoming",
    opportunityLabel:
      "Add VIP meet-and-greet, livestream, or afterparty access.",
    productIdeas: [
      { title: "VIP Meet & Greet", type: "vip" },
      { title: "Livestream Ticket", type: "livestream" },
      { title: "Afterparty Access", type: "in-person" },
      { title: "Show Sponsor", type: "sponsor" },
    ],
  },
  {
    id: "cal-past-studio",
    title: "Studio Walkthrough",
    startAt: "2026-07-10T15:00:00",
    displayDate: "July 10",
    displayTime: "3:00 PM",
    location: "Nashville",
    description: "Past studio walkthrough for content.",
    category: "recording",
    status: "past",
    opportunityLabel: "Past events can’t be selected.",
    productIdeas: [],
  },
  {
    id: "cal-unavailable",
    title: "Private Family Dinner",
    startAt: "2026-08-30T18:00:00",
    displayDate: "August 30",
    displayTime: "6:00 PM",
    location: "Home",
    description: "Marked private — not available for experiences.",
    category: "dinner",
    status: "unavailable",
    opportunityLabel: "This event is marked private.",
    productIdeas: [],
  },
];

export const MOCK_INSPIRATION_EXPERIENCES: InspirationExperience[] = [
  {
    id: "insp-sarah-studio",
    title: "Inside Sarah’s Studio",
    creatorName: "Sarah Morgan",
    creatorCategory: "Music",
    thumbnail:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=900&fit=crop",
    location: "Nashville, TN",
    format: "Hybrid · Livestream + VIP",
    description:
      "Fans joined Sarah during a live recording session with livestream access, fan voting, and limited VIP studio visits.",
    metrics: {
      ticketsSold: 120,
      gmv: 18500,
      capacity: 150,
      status: "Sold out VIP",
    },
    performanceSignal: "120 tickets sold",
    relevanceLabel: "Popular with music creators",
    products: [
      { title: "Livestream Access", price: 35, type: "livestream" },
      { title: "Fan Vote", price: 15, type: "interactive" },
      { title: "VIP Studio Visit", price: 350, type: "vip" },
      { title: "Presenting Sponsor", price: 11000, type: "sponsor" },
    ],
    relevanceReason:
      "This format may work for you because your audience engages with behind-the-scenes content and you have an upcoming recording session.",
  },
  {
    id: "insp-tokyo-ava",
    title: "Tokyo with Ava",
    creatorName: "Ava Chen",
    creatorCategory: "Travel",
    thumbnail:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=900&fit=crop",
    location: "Tokyo, Japan",
    format: "Travel series · Online",
    description:
      "Ava turned a week in Tokyo into a fan travel experience with live updates, stop voting, and a private Q&A.",
    metrics: {
      ticketsSold: 240,
      gmv: 14200,
      status: "Popular",
    },
    performanceSignal: "$14.2K GMV",
    relevanceLabel: "Popular with travel creators",
    products: [
      { title: "Live From Tokyo", price: 29, type: "livestream" },
      { title: "Choose the Next Stop", price: 12, type: "interactive" },
      { title: "Private Group Q&A", price: 79, type: "vip" },
    ],
    relevanceReason:
      "You have an upcoming Tokyo trip and your audience already loves travel-forward content.",
  },
  {
    id: "insp-run-club",
    title: "Morning Run Club",
    creatorName: "Jordan Lee",
    creatorCategory: "Fitness",
    thumbnail:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=900&fit=crop",
    location: "Austin, TX",
    format: "In person · Recurring",
    description:
      "A limited weekly run club with digital training guides and community check-ins.",
    metrics: {
      membersJoined: 85,
      capacity: 100,
    },
    performanceSignal: "85 members joined",
    products: [
      { title: "Run Club Pass", price: 45, type: "membership" },
      { title: "Training Guide", price: 19, type: "digital" },
    ],
    relevanceReason:
      "Your calendar includes Morning Run Club — this format maps cleanly to a recurring fitness experience.",
  },
  {
    id: "insp-founder-dinner",
    title: "Private Founder Dinner",
    creatorName: "Mia Torres",
    creatorCategory: "Business",
    thumbnail:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=900&fit=crop",
    location: "New York, NY",
    format: "In person · Intimate",
    description:
      "An intimate founder dinner with question submissions, a private recap, and one presenting sponsor.",
    metrics: {
      ticketsSold: 18,
      gmv: 9600,
      capacity: 20,
      status: "Sold out",
    },
    performanceSignal: "Sold out",
    products: [
      { title: "Dinner Seat", price: 250, type: "in-person" },
      { title: "Submit a Question", price: 25, type: "digital" },
      { title: "Sponsor the Dinner", price: 5000, type: "sponsor" },
    ],
    relevanceReason:
      "Your upcoming dinner with Alex is a natural fit for a private conversation-style product.",
  },
  {
    id: "insp-geena",
    title: "Songwriting with Geena",
    creatorName: "Geena Fontanella",
    creatorCategory: "Music",
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=900&fit=crop",
    location: "Nashville, TN",
    format: "In person · Weekend",
    description:
      "Fans joined Geena for songwriting, recording, and a private live performance across a Nashville weekend.",
    metrics: {
      ticketsSold: 14,
      gmv: 15400,
      capacity: 15,
      status: "Sold out",
    },
    performanceSignal: "$15.4K GMV",
    relevanceLabel: "Music · Intimate",
    products: [
      { title: "Single Room Ticket", price: 1200, type: "vip" },
      { title: "Day Ticket", price: 1000, type: "in-person" },
    ],
    relevanceReason:
      "Your audience responds to intimate music access, and you already sell studio and VIP products.",
  },
  {
    id: "insp-perreo",
    title: "Perreo Pilates Experience",
    creatorName: "Jihan Ramirez JITIVOZ",
    creatorCategory: "Wellness",
    thumbnail:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=900&fit=crop",
    location: "Miami, FL",
    format: "One-day · In person",
    description:
      "A one-day embodied movement experience combining Pilates, rhythm, breathwork, and community.",
    metrics: {
      ticketsSold: 42,
      gmv: 3360,
      capacity: 50,
    },
    performanceSignal: "42 tickets sold",
    products: [
      { title: "Day Experience", price: 80, type: "in-person" },
      { title: "Snack Bar Sponsor", price: 500, type: "sponsor" },
    ],
    relevanceReason:
      "A compact one-day format can complement your music calendar with wellness-adjacent community events.",
  },
];

export function buildCalendarPrompt(event: CalendarEvent): string {
  const location = event.location ? ` in ${event.location}` : "";
  const products = event.productIdeas
    .slice(0, 3)
    .map((idea) => idea.title.toLowerCase())
    .join(", ");

  return `Create a fan experience around my ${event.title.toLowerCase()} on ${event.displayDate}${location}. Include ${products}${products ? ", and" : ""} a sponsorship option.`;
}

export function buildRemixResult(
  experience: InspirationExperience,
  profile: CreatorProfile = MOCK_CREATOR_PROFILE,
): RemixResult {
  const adaptations: Record<string, RemixResult> = {
    "insp-sarah-studio": {
      inspiredBy: experience.title,
      generatedTitle: "Behind the Scenes in Tokyo",
      suggestedProducts: [
        "Live From Tokyo",
        "Fan Vote: Choose the Next Stop",
        "Private Group Q&A",
        "VIP Meetup",
        "Presenting Sponsor",
      ],
      prompt: `Remix “${experience.title}” for ${profile.name}. Create “Behind the Scenes in Tokyo” for my upcoming Tokyo trip. Include Live From Tokyo, Fan Vote: Choose the Next Stop, Private Group Q&A, VIP Meetup, and Presenting Sponsor.`,
    },
    "insp-tokyo-ava": {
      inspiredBy: experience.title,
      generatedTitle: "Tokyo Creator Dispatch",
      suggestedProducts: [
        "Daily Tokyo Live",
        "Fan Vote: Neighborhood",
        "VIP Coffee Meetup",
        "Travel Sponsor",
      ],
      prompt: `Remix “${experience.title}” for ${profile.name}. Create “Tokyo Creator Dispatch” around my Tokyo trip with livestream access, neighborhood voting, a VIP meetup, and a travel sponsor package.`,
    },
    "insp-run-club": {
      inspiredBy: experience.title,
      generatedTitle: "Sarah’s Morning Run Club",
      suggestedProducts: [
        "Join the Run",
        "Training Challenge Pass",
        "Digital Warm-up Guide",
      ],
      prompt: `Remix “${experience.title}” for ${profile.name}. Create “Sarah’s Morning Run Club” as a limited recurring fitness experience with join tickets, a training challenge pass, and a digital warm-up guide.`,
    },
    "insp-founder-dinner": {
      inspiredBy: experience.title,
      generatedTitle: "Dinner Conversations with Sarah",
      suggestedProducts: [
        "Join the Conversation",
        "Submit a Question",
        "Private Recap",
        "Sponsor the Meetup",
      ],
      prompt: `Remix “${experience.title}” for ${profile.name}. Create “Dinner Conversations with Sarah” around my dinner with Alex, including interactive access, question submissions, a private recap, and a sponsorship option.`,
    },
    "insp-geena": {
      inspiredBy: experience.title,
      generatedTitle: "Write With Sarah in Nashville",
      suggestedProducts: [
        "Songwriting Session",
        "Studio Livestream",
        "VIP Night",
        "Presenting Sponsor",
      ],
      prompt: `Remix “${experience.title}” for ${profile.name}. Create “Write With Sarah in Nashville” as an intimate music experience with songwriting access, studio livestream, VIP night, and a presenting sponsor.`,
    },
    "insp-perreo": {
      inspiredBy: experience.title,
      generatedTitle: "Movement Night with Sarah",
      suggestedProducts: [
        "Day Experience Ticket",
        "Community Pass",
        "Snack Sponsor",
      ],
      prompt: `Remix “${experience.title}” for ${profile.name}. Create “Movement Night with Sarah” as a one-day community wellness experience with tickets, a community pass, and sponsor packages.`,
    },
  };

  return (
    adaptations[experience.id] ?? {
      inspiredBy: experience.title,
      generatedTitle: `${experience.title} — adapted for ${profile.name}`,
      suggestedProducts: experience.products.map((p) => p.title),
      prompt: `Remix “${experience.title}” for ${profile.name}. Adapt the concept, products, and positioning for my ${profile.category} audience in ${profile.location}.`,
    }
  );
}

export function formatGmv(amount: number): string {
  if (amount >= 1000) {
    const k = amount / 1000;
    return `$${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K GMV`;
  }
  return `$${amount.toLocaleString()} GMV`;
}
