export type SuggestionId =
  | "live-event-or-show"
  | "music-or-film"
  | "trip-or-adventure"
  | "popup-or-exhibition"
  | "community-project"
  | "something-else";

export type InspirationExample = {
  label: string;
  prompt: string;
};

export type Suggestion = {
  id: SuggestionId;
  emoji: string;
  label: string;
  placeholder: string;
  starter: string | null;
  examples: InspirationExample[];
};

export const SUGGESTIONS: Suggestion[] = [
  {
    id: "live-event-or-show",
    emoji: "🎤",
    label: "Put on a live show",
    placeholder: "I want to put on my first live dance show in Paris…",
    starter: "I want to put on my first live show for my community in [city].",
    examples: [
      {
        label: "Perform my first headline show",
        prompt:
          "I want to put on my first headline show for around 200–300 people, with a full live set, special guests, and a small VIP experience for my biggest fans.",
      },
      {
        label: "Create a live dance performance",
        prompt:
          "I want to create and perform an original live dance show with my community involved in shaping the theme, music, and choreography.",
      },
      {
        label: "Host an intimate acoustic show",
        prompt:
          "I want to host an intimate acoustic show for around 50 fans, share the stories behind my songs, take requests, and spend time with everyone afterward.",
      },
      {
        label: "Bring my community backstage",
        prompt:
          "I want to give a small group of my biggest supporters backstage access to an upcoming show, including soundcheck, behind-the-scenes moments, and a meet-and-greet.",
      },
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
      {
        label: "Record my first EP",
        prompt:
          "I want to record my first EP with a small group of supporters involved in choosing the songs, sitting in on sessions, and being first to hear the finished tracks.",
      },
      {
        label: "Shoot a short film",
        prompt:
          "I want to shoot an original short film with my community helping shape the story, appear in scenes, and follow the process from first take to premiere.",
      },
      {
        label: "Create a music video with my community",
        prompt:
          "I want to create a music video with my community in it, from casting extras to choosing locations and celebrating together at a private screening.",
      },
      {
        label: "Release a collaborative project",
        prompt:
          "I want to release a collaborative project with artists from my community, sharing the process along the way and launching it with a special listening event.",
      },
    ],
  },
  {
    id: "trip-or-adventure",
    emoji: "✈️",
    label: "Take my community somewhere",
    placeholder: "I want to take 20 people from my community to Japan…",
    starter: "I want to take my community on a special trip to [destination].",
    examples: [
      {
        label: "Take my community to Japan",
        prompt:
          "I want to take a small group from my community to Japan for a week of food, culture, and creative time together, with a few unforgettable shared experiences along the way.",
      },
      {
        label: "Host a creative weekend in Mexico City",
        prompt:
          "I want to host a creative weekend in Mexico City for around 20 people, mixing studio time, local culture, and evenings spent together as a group.",
      },
      {
        label: "Organize a hiking adventure",
        prompt:
          "I want to organize a hiking adventure for my community, with a few days on the trail, shared meals, and time to disconnect and connect with each other.",
      },
      {
        label: "Create a weekend retreat",
        prompt:
          "I want to create a weekend retreat for my closest supporters, with workshops, rest, and a few special moments that we can only share in person.",
      },
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
      {
        label: "Launch a fashion pop-up",
        prompt:
          "I want to launch a fashion pop-up for a few days, invite my community to the opening, and let them try pieces, give feedback, and be part of the first drop.",
      },
      {
        label: "Host a photography exhibition",
        prompt:
          "I want to host a photography exhibition and invite my community to the opening night, with a small print sale and time to talk through the work together.",
      },
      {
        label: "Create a temporary café",
        prompt:
          "I want to create a temporary café for a weekend, designed with my community, where people can gather, try something new, and feel part of the space.",
      },
      {
        label: "Open a weekend art space",
        prompt:
          "I want to open a weekend art space where my community can show work, hang out, and help shape what the space becomes.",
      },
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
      {
        label: "Create a product together",
        prompt:
          "I want to create a product together with my community, from early ideas and feedback through to a first limited run they helped make possible.",
      },
      {
        label: "Build a new training program",
        prompt:
          "I want to build a new training program with a founding group from my community, using their goals and feedback to shape the first version.",
      },
      {
        label: "Produce a community album",
        prompt:
          "I want to produce a community album with artists and supporters involved in the songs, the process, and a launch we get to celebrate together.",
      },
      {
        label: "Design a new collection",
        prompt:
          "I want to design a new collection with my community helping choose the direction, vote on pieces, and get first access when it drops.",
      },
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

export function getInspirationExamples(
  id: SuggestionId | null,
): InspirationExample[] {
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
