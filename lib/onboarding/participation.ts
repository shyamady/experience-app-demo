export type ParticipationId =
  | "watch"
  | "influence"
  | "interact"
  | "join"
  | "support";

export type ParticipationOption = {
  id: ParticipationId;
  title: string;
  description: string;
  icon: "eye" | "gamepad" | "chat" | "users" | "heart";
};

export const PARTICIPATION_OPTIONS: ParticipationOption[] = [
  {
    id: "watch",
    title: "Watch",
    description:
      "Fans can watch behind-the-scenes moments, live updates, or replays.",
    icon: "eye",
  },
  {
    id: "influence",
    title: "Influence",
    description:
      "Fans can vote, give feedback, and help shape what happens.",
    icon: "gamepad",
  },
  {
    id: "interact",
    title: "Interact",
    description:
      "Fans can ask questions, join chats, or connect in small groups.",
    icon: "chat",
  },
  {
    id: "join",
    title: "Join",
    description:
      "Fans can join you in person or attend exclusive experiences.",
    icon: "users",
  },
  {
    id: "support",
    title: "Support",
    description:
      "Fans can support your project, mission, or next step.",
    icon: "heart",
  },
];

export const DEFAULT_PARTICIPATION_SELECTION: ParticipationId[] = [
  "watch",
  "join",
];
