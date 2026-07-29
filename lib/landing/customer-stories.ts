export type CustomerStoryMetadataItem = {
  label: string;
};

export type CustomerStory = {
  id: string;
  eventTitle: string;
  metadata: [CustomerStoryMetadataItem, CustomerStoryMetadataItem, CustomerStoryMetadataItem];
  description: string;
  creator: {
    name: string;
    role: string;
    handle?: string;
    avatarUrl: string;
  };
  /** Mock testimonial — replace with real quotes later. */
  testimonial: {
    quote: string;
    isMock: true;
  };
  layout: "content-left" | "content-right";
};

export const CUSTOMER_STORIES: CustomerStory[] = [
  {
    id: "get-salty",
    eventTitle: "Get Salty Retreat 2026",
    metadata: [
      { label: "Sep 2026" },
      { label: "Sedona, Arizona" },
      { label: "Intimate group" },
    ],
    description:
      "Jenny Fisher's fifth annual wellness retreat brings busy mothers together for fitness, balance, and sisterhood against Sedona's red rock backdrop.",
    creator: {
      name: "Jenny Fisher",
      role: "Uber-balanced Fitmom · Get Salty founder",
      handle: "@jennyfisherfitness",
      avatarUrl: "/landing/creators/jenny-fisher.png",
    },
    testimonial: {
      quote:
        "Meuse helped us turn the Get Salty community into a complete retreat experience without losing the personal feeling that makes it special.",
      isMock: true,
    },
    layout: "content-left",
  },
  {
    id: "backstage-nashville",
    eventTitle: "Backstage in Nashville with Geena",
    metadata: [
      { label: "Jun 2026" },
      { label: "Nashville, Tennessee" },
      { label: "10–15 guests" },
    ],
    description:
      "Geena Fontanella invited a small group of fans into her creative world for songwriting, recording, and a private live performance across one unforgettable Nashville weekend.",
    creator: {
      name: "Geena Fontanella",
      role: "Pop artist, songwriter, and performer",
      avatarUrl: "/landing/creators/geena-fontanella.png",
    },
    testimonial: {
      quote:
        "Meuse let me create something far more meaningful than a meet-and-greet — fans actually became part of the creative process.",
      isMock: true,
    },
    layout: "content-right",
  },
  {
    id: "perreo-pilates",
    eventTitle: "Perreo Pilates by JITIVOZ™",
    metadata: [
      { label: "Jun 2026" },
      { label: "Miami, Florida" },
      { label: "One-day experience" },
    ],
    description:
      "Jihan Ramirez JITIVOZ hosted a one-day embodied movement experience blending Pilates, rhythm, breathwork, and community in a safe, empowering space.",
    creator: {
      name: "Jihan Ramirez JITIVOZ",
      role: "Movement & embodiment guide",
      avatarUrl: "/landing/creators/jihan-jitivoz.png",
    },
    testimonial: {
      quote:
        "Meuse gave me one place to package the experience, sell tickets, and communicate the vision clearly to my community.",
      isMock: true,
    },
    layout: "content-left",
  },
];
