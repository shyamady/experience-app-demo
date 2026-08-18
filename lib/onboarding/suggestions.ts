export type SuggestionId =
  | "live-event-or-show"
  | "music-or-film"
  | "trip-or-adventure"
  | "popup-or-exhibition"
  | "community-project"
  | "something-else";

export type Suggestion = {
  id: SuggestionId;
  emoji: string;
  label: string;
  placeholder: string;
  starter: string | null;
  examples: string[];
};

export const SUGGESTIONS: Suggestion[] = [
  {
    id: "live-event-or-show",
    emoji: "🎤",
    label: "Put on a live show",
    placeholder: "I want to put on my first live dance show in Paris…",
    starter: "I want to put on my first live show for my community in [city].",
    examples: [
      "Perform my first headline show",
      "Create a live dance performance",
      "Host an intimate acoustic show",
      "Bring my community backstage",
    ],
  },
  {
    id: "music-or-film",
    emoji: "🎵",
    label: "Release music or a film",
    placeholder: "I want to record an EP with local artists…",
    starter:
      "I want to create and release a new project with my community involved in the process.",
    examples: [
      "Record my first EP",
      "Shoot a short film",
      "Create a music video with my community",
      "Release a collaborative project",
    ],
  },
  {
    id: "trip-or-adventure",
    emoji: "✈️",
    label: "Take my community somewhere",
    placeholder: "I want to take 20 people from my community to Japan…",
    starter: "I want to take my community on a special trip to [destination].",
    examples: [
      "Take my community to Japan",
      "Host a creative weekend in Mexico City",
      "Organize a hiking adventure",
      "Create a weekend retreat",
    ],
  },
  {
    id: "popup-or-exhibition",
    emoji: "🎨",
    label: "Create a pop-up",
    placeholder: "I want to open a three-day fashion pop-up in New York…",
    starter:
      "I want to create a pop-up experience in [city] and invite my community to be part of it.",
    examples: [
      "Launch a fashion pop-up",
      "Host a photography exhibition",
      "Create a temporary café",
      "Open a weekend art space",
    ],
  },
  {
    id: "community-project",
    emoji: "🤝",
    label: "Build something with my community",
    placeholder:
      "I want 100 people from my community to help create my next project…",
    starter: "I want to create something new together with my community.",
    examples: [
      "Create a product together",
      "Build a new training program",
      "Produce a community album",
      "Design a new collection",
    ],
  },
  {
    id: "something-else",
    emoji: "✨",
    label: "I have another idea",
    placeholder: "Tell us something you’ve always wanted to make happen…",
    starter: null,
    examples: [],
  },
];

export const DEFAULT_PLACEHOLDER = SUGGESTIONS[0].placeholder;
export const CUSTOM_PLACEHOLDER = SUGGESTIONS[5].placeholder;
export const HINT_EXAMPLES = SUGGESTIONS[0].examples;

export function getSuggestion(id: SuggestionId | null): Suggestion | undefined {
  if (!id) return undefined;
  return SUGGESTIONS.find((item) => item.id === id);
}

export function getInspirationExamples(id: SuggestionId | null): string[] {
  const suggestion = getSuggestion(id);
  if (!suggestion) return HINT_EXAMPLES;
  return suggestion.examples;
}

export type IdeaStarterContext = {
  city?: string;
  destination?: string;
  niche?: string;
};

const PLACE_NAMES = [
  "Mexico City",
  "New York",
  "Los Angeles",
  "Paris",
  "Tokyo",
  "London",
  "Nashville",
  "Bali",
  "Japan",
];

const NICHE_PHRASES: { match: RegExp; label: string }[] = [
  { match: /\bdance\b/i, label: "dance" },
  { match: /\b(music|musician|album|ep)\b/i, label: "music" },
  { match: /\b(film|documentary|movie)\b/i, label: "film" },
  { match: /\bfashion\b/i, label: "fashion" },
  { match: /\bphoto(graphy)?\b/i, label: "photography" },
  { match: /\b(yoga|fitness|pilates)\b/i, label: "fitness" },
];

export function inferStarterContext(source: string): IdeaStarterContext {
  const text = source.trim();
  if (!text) return {};

  const place = PLACE_NAMES.find((name) =>
    text.toLowerCase().includes(name.toLowerCase()),
  );
  const inMatch = text.match(/\bin\s+([A-Z][A-Za-z]+(?:\s[A-Z][A-Za-z]+)?)/);
  const toMatch = text.match(/\bto\s+([A-Z][A-Za-z]+(?:\s[A-Z][A-Za-z]+)?)/);
  const niche = NICHE_PHRASES.find((item) => item.match.test(text))?.label;

  return {
    city: place && place !== "Japan" ? place : inMatch?.[1],
    destination: place ?? toMatch?.[1] ?? inMatch?.[1],
    niche,
  };
}

export function buildStarterIdea(
  id: SuggestionId,
  context: IdeaStarterContext = {},
): string | null {
  const suggestion = getSuggestion(id);
  if (!suggestion?.starter) return null;

  const city = context.city?.trim();
  const destination = context.destination?.trim() || city;
  const niche = context.niche?.trim();

  switch (id) {
    case "live-event-or-show": {
      const kind = niche && niche !== "film" ? `${niche} ` : "";
      const place = city ? ` in ${city}` : " in [city]";
      return `I want to put on my first live ${kind}show for my community${place}.`;
    }
    case "music-or-film": {
      const project =
        niche === "film"
          ? "film"
          : niche === "music"
            ? "music project"
            : "project";
      return `I want to create and release a new ${project} with my community involved in the process.`;
    }
    case "trip-or-adventure": {
      const place = destination ? destination : "[destination]";
      return `I want to take my community on a special trip to ${place}.`;
    }
    case "popup-or-exhibition": {
      const kind = niche === "fashion" || niche === "photography" ? `${niche} ` : "";
      const place = city ? ` in ${city}` : " in [city]";
      return `I want to create a ${kind}pop-up experience${place} and invite my community to be part of it.`;
    }
    case "community-project":
      return "I want to create something new together with my community.";
    default:
      return suggestion.starter;
  }
}
