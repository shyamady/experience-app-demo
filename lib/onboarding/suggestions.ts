export type SuggestionId =
  | "traveling"
  | "recording-music"
  | "performing"
  | "running-a-cohort"
  | "hosting-a-retreat"
  | "trying-restaurants"
  | "training"
  | "something-else";

export type Suggestion = {
  id: SuggestionId;
  emoji: string;
  label: string;
  prompt: string | null;
};

export const SUGGESTIONS: Suggestion[] = [
  {
    id: "traveling",
    emoji: "✈️",
    label: "Traveling",
    prompt:
      "I'm traveling to Tokyo next week to explore the city and create content.",
  },
  {
    id: "recording-music",
    emoji: "🎵",
    label: "Recording music",
    prompt: "I'm recording a new song in Nashville next month.",
  },
  {
    id: "performing",
    emoji: "🎤",
    label: "Performing",
    prompt: "I'm performing live in Los Angeles next Friday.",
  },
  {
    id: "running-a-cohort",
    emoji: "📚",
    label: "Running a cohort",
    prompt:
      "I'm running a four-week online cohort for aspiring creators.",
  },
  {
    id: "hosting-a-retreat",
    emoji: "🌴",
    label: "Hosting a retreat",
    prompt: "I'm hosting a wellness retreat in Bali this summer.",
  },
  {
    id: "trying-restaurants",
    emoji: "🍽",
    label: "Trying restaurants",
    prompt: "I'm visiting some of Tokyo's best restaurants next week.",
  },
  {
    id: "training",
    emoji: "🏃",
    label: "Training",
    prompt: "I'm training for a marathon over the next three months.",
  },
  {
    id: "something-else",
    emoji: "✨",
    label: "Something else",
    prompt: null,
  },
];

export const DEFAULT_PLACEHOLDER = "I'm going to Tokyo next week...";
export const CUSTOM_PLACEHOLDER = "Tell us what you're doing next...";

export const HINT_EXAMPLES = [
  "I'm recording my first album.",
  "I'm visiting Japan next month.",
  "I'm launching my new course.",
  "I'm training for a marathon.",
];
