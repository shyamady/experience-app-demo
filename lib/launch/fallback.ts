import type {
  BudgetLine,
  GenerateLaunchRequest,
  LaunchProduct,
  LaunchResponse,
} from "@/types/launch";
import {
  EXPERIENCE_IMAGES,
  EXPERIENCE_TEMPLATES,
  FITNESS_IMAGE_KEYS,
  PARTICIPATION_IMAGE_KEYS,
  TRIP_IMAGE_KEYS,
  type ExperienceImageKey,
} from "@/lib/onboarding/experiences";
import { RECOMMENDED_FUNDING, RECOMMENDED_PEOPLE } from "@/lib/onboarding/goal";

type ProjectKind = "trip" | "music" | "fitness" | "popup" | "show";

function titleFromIdea(activity: string, category?: string): string {
  const cleaned = activity
    .replace(/^I want to\s+/i, "")
    .replace(/\.$/, "")
    .trim();

  if (cleaned.length > 8 && cleaned.length < 72) {
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  return category || "Your Community Project";
}

function resolvedGoal(body: GenerateLaunchRequest): {
  type: "people" | "funding";
  value: number;
} {
  const type = body.goalType === "people" ? "people" : "funding";
  if (body.goalUnsure || !body.goalValue) {
    return {
      type,
      value: type === "people" ? RECOMMENDED_PEOPLE : RECOMMENDED_FUNDING,
    };
  }
  return { type, value: body.goalValue };
}

function inferKind(activity: string, category?: string): ProjectKind {
  const haystack = `${activity} ${category ?? ""}`.toLowerCase();
  if (/trip|travel|japan|retreat|tour|adventure|somewhere/.test(haystack)) return "trip";
  if (/album|record|ep|studio|mix|film|music/.test(haystack)) return "music";
  if (/fitness|workout|train|yoga|run/.test(haystack)) return "fitness";
  if (/pop-?up|market|shop|exhibition/.test(haystack)) return "popup";
  return "show";
}

function imageFor(keys: readonly ExperienceImageKey[], index: number): string {
  return EXPERIENCE_IMAGES[keys[index % keys.length]];
}

function withOffer(
  templateIndex: number,
  title: string,
  description: string,
  price: number,
  spots: number,
  imageUrl: string,
): LaunchProduct {
  const template = EXPERIENCE_TEMPLATES[templateIndex] ?? EXPERIENCE_TEMPLATES[3];
  return {
    category: template.category,
    title,
    description,
    howItHelps: template.howItHelps,
    access: template.access,
    price,
    spots,
    capacity: `${spots} ${spots === 1 ? "spot" : "spots"}`,
    phase: "",
    imageQuery: title,
    imageUrl,
  };
}

function scaleBudget(lines: Omit<BudgetLine, "amount">[], total: number): BudgetLine[] {
  const weights = [22, 18, 16, 12, 10, 8, 14];
  const used = weights.slice(0, lines.length);
  const sum = used.reduce((a, b) => a + b, 0);
  let allocated = 0;
  return lines.map((line, index) => {
    const amount =
      index === lines.length - 1
        ? Math.max(100, total - allocated)
        : Math.round((total * used[index]) / sum / 100) * 100;
    allocated += amount;
    return { ...line, amount: Math.max(0, amount) };
  });
}

export function budgetLinesForProject(
  activity: string,
  category: string | undefined,
  total: number,
): BudgetLine[] {
  return budgetFor(inferKind(activity, category), Math.max(1000, total));
}

function budgetFor(kind: ProjectKind, total: number): BudgetLine[] {
  if (kind === "trip") {
    return scaleBudget(
      [
        { label: "Accommodation", description: "Rooms or a shared villa for the group." },
        { label: "Transportation", description: "Flights, trains, or local transfers." },
        { label: "Activities", description: "Shared experiences on the ground." },
        { label: "Local partner", description: "A host or fixer who makes the trip work." },
        { label: "Content", description: "Photo and video from the trip." },
        { label: "Buffer", description: "Room for unexpected costs." },
      ],
      total,
    );
  }
  if (kind === "music") {
    return scaleBudget(
      [
        { label: "Studio", description: "Recording time and space." },
        { label: "Musicians", description: "Players who help finish the work." },
        { label: "Mixing / mastering", description: "The final listen-ready version." },
        { label: "Artwork", description: "Cover and visual identity." },
        { label: "Distribution", description: "Getting the release out." },
        { label: "Promotion", description: "Telling the right people it exists." },
      ],
      total,
    );
  }
  if (kind === "popup") {
    return scaleBudget(
      [
        { label: "Space", description: "A room or storefront for the pop-up." },
        { label: "Buildout", description: "Set, furniture, and install." },
        { label: "Inventory", description: "What people can see, try, or take home." },
        { label: "Staff", description: "People on the floor." },
        { label: "Production", description: "Lighting, sound, and operations." },
        { label: "Marketing", description: "Letting the neighborhood know." },
      ],
      total,
    );
  }
  if (kind === "fitness") {
    return scaleBudget(
      [
        { label: "Space", description: "Studio or outdoor site rental." },
        { label: "Coaching", description: "The people leading the sessions." },
        { label: "Equipment", description: "Gear the group needs on the day." },
        { label: "Recovery", description: "Food, rest, and aftercare." },
        { label: "Content", description: "Photo and video of the work." },
        { label: "Buffer", description: "Room for unexpected costs." },
      ],
      total,
    );
  }
  return scaleBudget(
    [
      { label: "Venue", description: "Space rental and basic venue costs." },
      { label: "Production", description: "Sound, lighting, and technical support." },
      { label: "Creative Team", description: "Performers and production collaborators." },
      { label: "Travel & Hospitality", description: "Getting people there and looking after them." },
      { label: "Marketing & Content", description: "Assets, photo, video, and promotion." },
      { label: "Contingency", description: "Room for unexpected costs." },
      { label: "Creator / Project Margin", description: "Optional project compensation and buffer." },
    ],
    total,
  );
}

function offersFor(
  kind: ProjectKind,
  peopleGoal: number,
  includePartner: boolean,
  fundingGoal: number,
): LaunchProduct[] {
  const keys =
    kind === "trip"
      ? TRIP_IMAGE_KEYS
      : kind === "fitness"
        ? FITNESS_IMAGE_KEYS
        : kind === "popup"
          ? (["venue", "group", "dinner", "gift", "premium", "crowd"] as const)
          : PARTICIPATION_IMAGE_KEYS;
  const follow = Math.max(40, peopleGoal);
  const show = Math.max(20, Math.round(peopleGoal * 0.7));
  const enhanced = Math.max(12, Math.round(peopleGoal * 0.35));
  const small = Math.max(8, Math.round(peopleGoal * 0.2));
  const premium = Math.max(6, Math.round(peopleGoal * 0.12));
  const special = Math.max(4, Math.round(peopleGoal * 0.08));

  const catalog: LaunchProduct[] =
    kind === "trip"
      ? [
          withOffer(4, "Travel Notes", "Follow planning, packing lists, and behind-the-scenes as the trip comes together.", 25, follow, imageFor(keys, 0)),
          withOffer(3, "Trip Seat", "A place in the traveling group for the full experience.", 90, show, imageFor(keys, 1)),
          withOffer(2, "Route Circle", "Help choose days, stops, and the shape of the itinerary.", 160, enhanced, imageFor(keys, 2)),
          withOffer(0, "Scout Night", "Join a smaller planning hang before departure.", 280, small, imageFor(keys, 3)),
          withOffer(3, "First Table", "A limited dinner with the crew on arrival night.", 450, premium, imageFor(keys, 4)),
          withOffer(2, "Core Crew", "Stay closest to logistics and daily decisions on the ground.", 650, special, imageFor(keys, 5)),
        ]
      : kind === "music"
        ? [
            withOffer(4, "Studio Listener", "Get private updates, demos, and the story as the record is made.", 25, follow, imageFor(keys, 0)),
            withOffer(3, "Session Pass", "Be in the room for a listening or tracking session.", 75, show, imageFor(keys, 1)),
            withOffer(2, "Setlist Session", "Help choose songs, sequence, and the feeling of the work.", 150, enhanced, imageFor(keys, 2)),
            withOffer(0, "Soundcheck Seat", "A small-group rehearsal or playback before anything is public.", 250, small, imageFor(keys, 3)),
            withOffer(3, "Control Room Night", "Sit in for mix notes with the creator.", 400, premium, imageFor(keys, 4)),
            withOffer(1, "Liner Note", "Contribute a story, vocal, or idea considered for the release.", 60, Math.max(15, small), imageFor(keys, 5)),
          ]
        : kind === "fitness"
          ? [
              withOffer(4, "Training Log", "Follow the build-up with private updates and prep notes.", 20, follow, imageFor(keys, 0)),
              withOffer(3, "Floor Pass", "Join the main session with the group.", 55, show, imageFor(keys, 1)),
              withOffer(2, "Form Lab", "A smaller coaching block before the main session.", 120, enhanced, imageFor(keys, 2)),
              withOffer(0, "First 12", "Limited early access with the creator.", 200, small, imageFor(keys, 3)),
              withOffer(3, "Recovery Table", "Stay after for food, notes, and recovery.", 320, premium, imageFor(keys, 4)),
            ]
          : kind === "popup"
            ? [
                withOffer(4, "First Look Pass", "Follow the build and get first access when doors open.", 20, follow, imageFor(keys, 0)),
                withOffer(3, "Opening Night Ticket", "Be there for the pop-up while it is live.", 55, show, imageFor(keys, 1)),
                withOffer(2, "Maker Table", "A smaller session helping shape the look and layout.", 140, enhanced, imageFor(keys, 2)),
                withOffer(0, "Install Crew", "Help set the space the day before opening.", 220, small, imageFor(keys, 3)),
                withOffer(3, "Host Circle", "A limited dinner with the creator after close.", 400, premium, imageFor(keys, 4)),
                withOffer(1, "Neighborhood Seat", "Bring a friend and stay close to the making of it.", 90, Math.max(15, small), imageFor(keys, 5)),
              ]
            : [
              withOffer(4, "Journey Member", "Private updates, peeks, and the making-of as the night takes shape.", 25, follow, imageFor(keys, 0)),
              withOffer(3, "Opening Night Circle", "Be in the room for the final experience.", 75, show, imageFor(keys, 1)),
              withOffer(2, "Setlist Session", "Help choose songs, sequence, and the feeling of the night.", 150, enhanced, imageFor(keys, 2)),
              withOffer(0, "Soundcheck Seat", "A limited rehearsal hang before doors.", 250, small, imageFor(keys, 3)),
              withOffer(3, "Backstage Dinner", "A small meal and conversation with the creator.", 500, premium, imageFor(keys, 4)),
              withOffer(1, "Founding Guest", "Vote on a few key decisions before the night is locked.", 45, Math.max(20, small), imageFor(keys, 6)),
            ];

  const partners: LaunchProduct[] = includePartner
    ? [
        withOffer(
          5,
          kind === "trip" ? "Travel Partner" : kind === "music" ? "Sound Partner" : "Presenting Partner",
          "Help cover a major production cost and be recognized as a partner making the project possible.",
          Math.max(1500, Math.round((fundingGoal * 0.2) / 100) * 100),
          1,
          EXPERIENCE_IMAGES.sponsor,
        ),
        withOffer(
          5,
          "Community Partner",
          "Support a slice of the project with funding, space, or in-kind help.",
          Math.max(800, Math.round((fundingGoal * 0.08) / 100) * 100),
          2,
          EXPERIENCE_IMAGES.venue,
        ),
      ]
    : [];

  return [...catalog, ...partners];
}

export function buildFallbackLaunch(
  body: GenerateLaunchRequest,
): LaunchResponse {
  const idea = body.activity.trim() || "a project with my community";
  const title = titleFromIdea(idea, body.category);
  const goal = resolvedGoal(body);
  const kind = inferKind(idea, body.category);
  const includePartner = body.participation.some((item) => /partner/i.test(item));
  const fundingNeed = goal.type === "funding" ? goal.value : Math.max(8000, goal.value * 120);
  const peopleNeed = goal.type === "people" ? goal.value : 60;
  const products = offersFor(kind, peopleNeed, includePartner, fundingNeed);
  const budgetLines = budgetFor(kind, fundingNeed);

  return {
    heroTitle: title,
    heroDescription: `Bring this to life with your community — ${
      goal.type === "people"
        ? `${goal.value} people making it happen`
        : `${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(goal.value)} to make it possible`
    }.`,
    heroImageQuery: idea,
    heroImageUrl: EXPERIENCE_IMAGES.stage,
    goalType: goal.type,
    goalValue: goal.value,
    suggestedGoalRange:
      goal.type === "people"
        ? `${Math.round(goal.value * 0.8)}–${Math.round(goal.value * 1.2)} people`
        : `$${Math.round(goal.value * 0.8).toLocaleString()}–$${Math.round(goal.value * 1.2).toLocaleString()}`,
    estimateAssumptions:
      "AI starting estimate. You can edit this later.",
    products,
    budgetLines,
    gapSuggestions: [],
  };
}
