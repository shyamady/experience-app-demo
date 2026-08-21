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
    title: "Back the Project",
    description:
      "Help bring the idea to life and be recognized as an early supporter.",
    examples: "Founding supporter · credits · early access",
    icon: "heart",
  },
  {
    id: "behind-scenes",
    title: "Go Behind the Scenes",
    description: "Get closer access to the project as it comes together.",
    examples: "Private updates · behind-the-scenes · early previews",
    icon: "eye",
  },
  {
    id: "influence",
    title: "Help Shape It",
    description: "Influence real decisions in the project.",
    examples: "Votes · feedback · help choose",
    icon: "gamepad",
  },
  {
    id: "participate",
    title: "Join an Activity",
    description: "Do something together as part of the project.",
    examples: "Workshops · challenges · group sessions",
    icon: "sparkle",
  },
  {
    id: "in-person",
    title: "Join in Person",
    description: "Be there for the real-world experience.",
    examples: "Events · trips · dinners · backstage",
    icon: "users",
  },
  {
    id: "work-with-me",
    title: "Work With Me",
    description: "Collaborate or work directly with the creator.",
    examples: "Coaching · reviews · private sessions",
    icon: "chat",
  },
];

export const DEFAULT_PARTICIPATION_SELECTION: ParticipationId[] = [
  "support",
  "behind-scenes",
  "influence",
  "in-person",
];
