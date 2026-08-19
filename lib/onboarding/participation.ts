export type ParticipationId =
  | "shape"
  | "contribute"
  | "co-create"
  | "join"
  | "follow"
  | "partner"
  | "watch"
  | "influence"
  | "interact"
  | "support";

export type ParticipationOption = {
  id: ParticipationId;
  title: string;
  description: string;
  icon: "eye" | "gamepad" | "chat" | "users" | "heart" | "sparkle";
};

export const PARTICIPATION_OPTIONS: ParticipationOption[] = [
  {
    id: "shape",
    title: "Shape It",
    description:
      "Vote, give feedback, and help make key creative decisions.",
    icon: "gamepad",
  },
  {
    id: "contribute",
    title: "Contribute",
    description:
      "Submit ideas, stories, music, designs, content, or other material.",
    icon: "chat",
  },
  {
    id: "co-create",
    title: "Co-create",
    description:
      "Join planning, workshops, rehearsals, or the creative process.",
    icon: "sparkle",
  },
  {
    id: "join",
    title: "Join",
    description:
      "Attend, travel, perform, participate, or become part of the final experience.",
    icon: "users",
  },
  {
    id: "follow",
    title: "Follow the Journey",
    description:
      "Get private updates, behind-the-scenes access, and early previews.",
    icon: "eye",
  },
  {
    id: "partner",
    title: "Partner",
    description:
      "Support the project with funding, products, expertise, space, or services.",
    icon: "heart",
  },
];

export const DEFAULT_PARTICIPATION_SELECTION: ParticipationId[] = [
  "shape",
  "join",
  "follow",
];
