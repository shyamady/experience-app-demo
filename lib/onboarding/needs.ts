export type ProjectNeedId =
  | "funding"
  | "participants"
  | "space"
  | "collaborators"
  | "production"
  | "partners";

export type ProjectNeedOption = {
  id: ProjectNeedId;
  emoji: string;
  title: string;
  description: string;
};

export const PROJECT_NEED_OPTIONS: ProjectNeedOption[] = [
  {
    id: "funding",
    emoji: "💰",
    title: "Funding",
    description:
      "Money for production, travel, space, equipment, or collaborators.",
  },
  {
    id: "participants",
    emoji: "👥",
    title: "Participants",
    description: "People to join, perform, test, contribute, or attend.",
  },
  {
    id: "space",
    emoji: "📍",
    title: "Space or Location",
    description: "A venue, studio, destination, or physical space.",
  },
  {
    id: "collaborators",
    emoji: "🎨",
    title: "Creative Collaborators",
    description:
      "Artists, dancers, musicians, experts, or production partners.",
  },
  {
    id: "production",
    emoji: "🎬",
    title: "Production Support",
    description:
      "Filming, editing, design, equipment, logistics, or technical help.",
  },
  {
    id: "partners",
    emoji: "🤝",
    title: "Brand Partners",
    description: "Sponsors that can provide funding, products, or resources.",
  },
];

export const DEFAULT_NEED_SELECTION: ProjectNeedId[] = [
  "funding",
  "participants",
];
