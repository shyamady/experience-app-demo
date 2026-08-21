export type ParticipationId =
  | "support"
  | "behind-scenes"
  | "influence"
  | "participate"
  | "in-person"
  | "work-with-me"
  | "sponsor"
  // Legacy ids kept for migration
  | "shape"
  | "contribute"
  | "co-create"
  | "join"
  | "follow"
  | "partner"
  | "watch"
  | "interact";

export type ParticipationOption = {
  id: ParticipationId;
  title: string;
  description: string;
  examples: string;
  icon: "heart" | "eye" | "gamepad" | "users" | "sparkle" | "chat" | "star";
};

export const PARTICIPATION_OPTIONS: ParticipationOption[] = [
  {
    id: "support",
    title: "Support the Project",
    description:
      "Let people help make the idea possible and become part of its story.",
    examples: "Credits · founding status · first look",
    icon: "heart",
  },
  {
    id: "behind-scenes",
    title: "Go Behind the Scenes",
    description:
      "Give people a closer look at the parts of the project they normally wouldn’t see.",
    examples: "Demos · diaries · private previews",
    icon: "eye",
  },
  {
    id: "influence",
    title: "Help Shape It",
    description:
      "Let participants influence real decisions in the project.",
    examples: "Votes · feedback · private reviews",
    icon: "gamepad",
  },
  {
    id: "participate",
    title: "Take Part",
    description:
      "Give people a real role or activity inside the project.",
    examples: "Workshops · sessions · challenges",
    icon: "sparkle",
  },
  {
    id: "in-person",
    title: "Join In Person",
    description: "Bring people into the real-world experience.",
    examples: "Events · dinners · studio visits",
    icon: "users",
  },
  {
    id: "work-with-me",
    title: "Work With Me",
    description:
      "Create a high-value opportunity for people to collaborate directly with you.",
    examples: "Coaching · reviews · private sessions",
    icon: "chat",
  },
  {
    id: "sponsor",
    title: "Bring in a Sponsor",
    description:
      "Let a brand help fund the project in exchange for meaningful visibility or involvement.",
    examples: "Partnerships · integrations · presenting sponsor",
    icon: "star",
  },
];

export const DEFAULT_PARTICIPATION_SELECTION: ParticipationId[] = [
  "support",
  "behind-scenes",
  "influence",
  "in-person",
];
