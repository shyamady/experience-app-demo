import type {
  BudgetLine,
  GenerateLaunchRequest,
  LaunchProduct,
  LaunchResponse,
} from "@/types/launch";
import type { ProductCategory } from "@/lib/launch/categories";
import {
  EXPERIENCE_IMAGES,
  EXPERIENCE_TEMPLATES,
  FITNESS_IMAGE_KEYS,
  PARTICIPATION_IMAGE_KEYS,
  TRIP_IMAGE_KEYS,
  type ExperienceImageKey,
} from "@/lib/onboarding/experiences";
import { RECOMMENDED_FUNDING } from "@/lib/onboarding/goal";

type ProjectKind = "trip" | "music" | "fitness" | "popup" | "show";

type OfferKind =
  | "support"
  | "behind-scenes"
  | "influence"
  | "participate"
  | "in-person"
  | "work-with-me"
  | "sponsor";

const KIND_TO_CATEGORY: Record<OfferKind, ProductCategory> = {
  support: "SUPPORT",
  "behind-scenes": "BEHIND THE SCENES",
  influence: "HELP SHAPE IT",
  participate: "TAKE PART",
  "in-person": "JOIN IN PERSON",
  "work-with-me": "WORK WITH ME",
  sponsor: "SPONSOR",
};

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
  type: "funding";
  value: number;
} {
  if (body.goalUnsure || !body.goalValue) {
    return { type: "funding", value: RECOMMENDED_FUNDING };
  }
  return { type: "funding", value: body.goalValue };
}

function inferKind(activity: string, category?: string): ProjectKind {
  const haystack = `${activity} ${category ?? ""}`.toLowerCase();
  if (/trip|travel|japan|retreat|tour|adventure|somewhere/.test(haystack)) {
    return "trip";
  }
  if (/album|record|ep|studio|mix|film|music/.test(haystack)) return "music";
  if (/fitness|workout|train|yoga|run/.test(haystack)) return "fitness";
  if (/pop-?up|market|shop|exhibition/.test(haystack)) return "popup";
  return "show";
}

function selectedOfferKinds(participation: string[]): OfferKind[] {
  const map: Record<string, OfferKind> = {
    support: "support",
    "behind-scenes": "behind-scenes",
    influence: "influence",
    participate: "participate",
    "in-person": "in-person",
    "work-with-me": "work-with-me",
    sponsor: "sponsor",
    // legacy
    follow: "behind-scenes",
    shape: "influence",
    contribute: "participate",
    "co-create": "participate",
    join: "in-person",
    partner: "sponsor",
  };

  const kinds = participation
    .map((item) => map[item.toLowerCase()] ?? map[item])
    .filter((item): item is OfferKind => Boolean(item));

  const unique = [...new Set(kinds)];
  if (unique.length === 0) {
    return ["support", "behind-scenes", "influence", "in-person"];
  }
  return unique;
}

function imageFor(keys: readonly ExperienceImageKey[], index: number): string {
  return EXPERIENCE_IMAGES[keys[index % keys.length]];
}

function makeOffer(
  kind: OfferKind,
  title: string,
  description: string,
  price: number,
  spots: number,
  imageUrl: string,
): LaunchProduct {
  const template =
    EXPERIENCE_TEMPLATES.find((item) => item.id === kind) ??
    EXPERIENCE_TEMPLATES[0];
  return {
    category: KIND_TO_CATEGORY[kind],
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
  return budgetFor(inferKind(activity, category), Math.max(500, total));
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
        { label: "Studio rental", description: "Recording time and space." },
        { label: "Producer / engineer", description: "The people who help capture and shape the tracks." },
        { label: "Travel & accommodation", description: "Getting to the sessions and staying there." },
        { label: "Mixing & mastering", description: "The final listen-ready version." },
        { label: "Artwork / release costs", description: "Cover art and getting the release out." },
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
    ],
    total,
  );
}

function catalogFor(
  kind: ProjectKind,
  offerKinds: OfferKind[],
  fundingGoal: number,
): LaunchProduct[] {
  const keys =
    kind === "trip"
      ? TRIP_IMAGE_KEYS
      : kind === "fitness"
        ? FITNESS_IMAGE_KEYS
        : PARTICIPATION_IMAGE_KEYS;

  const ladder: LaunchProduct[] =
    kind === "music"
      ? [
          makeOffer("support", "Studio Supporter", "Help make the recording possible and follow private progress updates.", 25, 80, imageFor(keys, 0)),
          makeOffer("behind-scenes", "Demo Access", "Hear early demos before they are released publicly.", 50, 50, imageFor(keys, 1)),
          makeOffer("influence", "Track Vote", "Vote on selected songs, artwork, or creative decisions.", 75, 30, imageFor(keys, 2)),
          makeOffer("behind-scenes", "Inside the Studio", "Receive private studio diaries, rough cuts, and behind-the-scenes updates.", 125, 25, imageFor(keys, 3)),
          makeOffer("participate", "Private Listening Room", "Join a live virtual listening session and discuss the project directly.", 200, 15, imageFor(keys, 4)),
          makeOffer("influence", "Creative Circle", "Give feedback on unreleased tracks and influence selected decisions.", 350, 10, imageFor(keys, 5)),
          makeOffer("in-person", "Studio Guest", "Join part of an in-person recording session.", 750, 4, imageFor(keys, 0)),
          makeOffer("work-with-me", "Executive Supporter", "Highest-access participation with a private session and recognition where appropriate.", 1500, 3, imageFor(keys, 1)),
        ]
      : kind === "trip"
        ? [
            makeOffer("support", "Journey Supporter", "Help make the trip possible and get founding credit in the recap.", 25, 80, imageFor(keys, 0)),
            makeOffer("behind-scenes", "Travel Notes", "Private packing lists, route peeks, and unreleased trip moments.", 50, 50, imageFor(keys, 1)),
            makeOffer("influence", "Route Vote", "Help choose stops, days, and the shape of the itinerary.", 75, 25, imageFor(keys, 2)),
            makeOffer("behind-scenes", "On the Road Diary", "Receive private updates and photo drops from the journey.", 125, 20, imageFor(keys, 3)),
            makeOffer("participate", "Scout Night", "Join a planning hang before departure and help lock logistics.", 200, 12, imageFor(keys, 4)),
            makeOffer("work-with-me", "Creator Walk", "A private half-day with the creator focused on your own creative trip idea.", 350, 6, imageFor(keys, 5)),
            makeOffer("in-person", "Trip Seat", "A place in the traveling group for the full experience.", 750, 10, imageFor(keys, 0)),
            makeOffer("in-person", "Core Crew", "Stay closest to logistics and daily decisions on the ground.", 1500, 4, imageFor(keys, 1)),
          ]
        : kind === "fitness"
          ? [
              makeOffer("support", "Founding Athlete", "Help launch the series and get founding credit in the community.", 25, 80, imageFor(keys, 0)),
              makeOffer("behind-scenes", "Training Log", "Private prep notes, form tips, and behind-the-scenes training clips.", 50, 50, imageFor(keys, 1)),
              makeOffer("influence", "Program Vote", "Help choose session focus, intensity, and recovery blocks.", 75, 30, imageFor(keys, 2)),
              makeOffer("participate", "Form Lab", "A smaller coaching block before the main session.", 125, 15, imageFor(keys, 3)),
              makeOffer("behind-scenes", "Recovery Circle", "Private recovery notes and post-session breakdowns.", 200, 12, imageFor(keys, 4)),
              makeOffer("work-with-me", "Private Form Review", "Send a training clip and get personalized coaching notes.", 350, 8, imageFor(keys, 5)),
              makeOffer("in-person", "Floor Pass", "Join the main in-person training experience.", 250, 30, imageFor(keys, 0)),
              makeOffer("in-person", "First Circle", "Limited early access with the creator before doors open.", 750, 6, imageFor(keys, 1)),
            ]
          : [
              makeOffer("support", "Project Supporter", "Help make the night possible and follow private progress updates.", 25, 80, imageFor(keys, 0)),
              makeOffer("behind-scenes", "Early Peek", "See rehearsals and creative drafts before the public version.", 50, 50, imageFor(keys, 1)),
              makeOffer("influence", "Decision Seat", "Vote on selected creative choices that shape the final experience.", 75, 30, imageFor(keys, 2)),
              makeOffer("behind-scenes", "Inside the Sessions", "Private diaries, rough cuts, and behind-the-scenes updates.", 125, 25, imageFor(keys, 3)),
              makeOffer("participate", "Working Session", "Join a hands-on workshop or creative session inside the project.", 200, 15, imageFor(keys, 4)),
              makeOffer("influence", "Creative Circle", "Give structured feedback and influence a few key decisions.", 350, 10, imageFor(keys, 5)),
              makeOffer("in-person", "Opening Night Seat", "Be in the room for the final experience.", 250, 40, imageFor(keys, 0)),
              makeOffer("work-with-me", "Private Creative Review", "Bring one project and get focused feedback on direction and next steps.", 750, 6, imageFor(keys, 1)),
            ];

  const products = [...ladder];

  if (offerKinds.includes("sponsor")) {
    products.push(
      makeOffer(
        "sponsor",
        kind === "music"
          ? "Studio Partner"
          : kind === "trip"
            ? "Journey Partner"
            : kind === "fitness"
              ? "Training Partner"
              : "Presenting Partner",
        "Help fund the project with integrated creator content, brand mention, and official partner status.",
        Math.max(1500, Math.round((fundingGoal * 0.5) / 100) * 100),
        1,
        EXPERIENCE_IMAGES.sponsor,
      ),
    );
  }

  return products;
}

function defaultMilestones(kind: ProjectKind): { title: string; description: string }[] {
  if (kind === "music") {
    return [
      { title: "Confirm studio & team", description: "Lock dates, producer, and recording plan." },
      { title: "Record the sessions", description: "Capture the tracks with the community following along." },
      { title: "Community listens in", description: "Share demos and keep participants close to the process." },
      { title: "Finish the mix", description: "Mix, master, and get the project ready." },
      { title: "Release", description: "Bring the finished project into the world." },
    ];
  }
  if (kind === "trip") {
    return [
      { title: "Confirm dates & lodging", description: "Lock travel details and the group size." },
      { title: "Shape the itinerary", description: "Plan the days with participant input." },
      { title: "Community packs in", description: "The group gets ready and locked in together." },
      { title: "Travel together", description: "Make the journey happen." },
      { title: "Share the recap", description: "Send the story back to everyone who joined." },
    ];
  }
  return [
    { title: "Confirm the plan", description: "Lock venue, dates, and key collaborators." },
    { title: "Create the experience", description: "Build the project with participants involved." },
    { title: "Community joins", description: "People take part and help shape what happens next." },
    { title: "Finish & share", description: "Bring the work together and keep joiners close." },
    { title: "Launch", description: "Make it public and celebrate together." },
  ];
}

export function buildFallbackLaunch(
  body: GenerateLaunchRequest,
): LaunchResponse {
  const idea = body.activity.trim() || "a project with my community";
  const title = titleFromIdea(idea, body.category);
  const goal = resolvedGoal({ ...body, goalType: "funding" });
  const kind = inferKind(idea, body.category);
  const offerKinds = selectedOfferKinds(body.participation);
  const fundingNeed = goal.value;
  const products = catalogFor(kind, offerKinds, fundingNeed);
  const budgetLines = budgetFor(kind, fundingNeed);

  return {
    heroTitle: title,
    heroSubtitle: "A project your community can help make real",
    heroDescription: `Bring the community inside the making of this project—from early decisions and private updates to the moments that make it real.`,
    heroImageQuery: idea,
    heroImageUrl: EXPERIENCE_IMAGES.stage,
    goalType: "funding",
    goalValue: fundingNeed,
    suggestedGoalRange: `$${Math.round(fundingNeed * 0.8).toLocaleString()}–$${Math.round(fundingNeed * 1.2).toLocaleString()}`,
    estimateAssumptions: "AI starting estimate. You can edit this later.",
    products,
    budgetLines,
    gapSuggestions: [],
    milestones: defaultMilestones(kind),
  };
}
