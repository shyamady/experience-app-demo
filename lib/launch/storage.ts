import { generateExperiences } from "@/lib/onboarding/experiences";
import {
  EXPERIENCE_IMAGES,
  type ExperienceProduct,
} from "@/lib/onboarding/experiences";
import {
  getOnboardingData,
  summarizeActivity,
} from "@/lib/onboarding/storage";
import type { LaunchData } from "@/lib/launch/types";
import type { ProjectMilestone } from "@/types/launch";

const LEGACY_LAUNCH_KEY = "meuse-launch";
const CAMPAIGNS_STATE_KEY = "meuse-campaigns-state";
const PUBLISHED_PREFIX = "meuse-launch-published-";

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=600&fit=crop";

const QUIET_ROOM_COVER =
  "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1400&h=800&fit=crop";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop";

const BALI_COVER =
  "https://images.unsplash.com/photo-1537996194471-e657df975ab3?w=1200&h=600&fit=crop";

const COHORT_COVER =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop";

export type CampaignsState = {
  campaigns: LaunchData[];
  activeCampaignId: string;
};

const DEFAULT_LAUNCH: LaunchData = {
  id: "",
  name: "",
  title: "",
  description: "",
  firstDate: "",
  locationType: null,
  city: "",
  venue: "",
  onlinePlatform: "",
  onlineAccessDetails: "",
  frequencyId: null,
  frequencyLabel: "",
  customInterval: 3,
  customUnit: "weeks",
  totalSpots: 8,
  demandValidationEnabled: false,
  cutOffDate: "",
  fundingGoal: 0,
  revenueRaised: 7250,
  registrationCount: 42,
  validationDecision: null,
  products: [],
  status: "draft",
  salesMode: "preview",
  slug: "my-launch",
  creatorName: "Shun Yamada",
  coverImageUrl: DEFAULT_COVER,
  avatarUrl: DEFAULT_AVATAR,
};

function createCampaignId(): string {
  return `campaign-${Date.now().toString(36)}`;
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "my-launch"
  );
}

function migrateLaunchData(parsed: Record<string, unknown>): LaunchData {
  const migrated = { ...DEFAULT_LAUNCH, ...parsed } as LaunchData;

  if (!migrated.firstDate && typeof parsed.startDate === "string") {
    migrated.firstDate = parsed.startDate;
  }

  if (!migrated.id) {
    migrated.id = createCampaignId();
  }

  if (!migrated.name) {
    migrated.name = migrated.title || "New Campaign";
  }

  if (
    migrated.id === "campaign-tokyo" &&
    (migrated.title === "Tokyo Creator Journey" ||
      migrated.name === "Tokyo Creator Journey")
  ) {
    const quiet = createTokyoCampaign();
    const keepProducts = hasCustomParticipationTitles(migrated.products);
    return {
      ...quiet,
      ...migrated,
      name: quiet.name,
      title: quiet.title,
      subtitle: quiet.subtitle,
      description: quiet.description,
      coverImageUrl:
        migrated.coverImageUrl === DEFAULT_COVER || !migrated.coverImageUrl
          ? quiet.coverImageUrl
          : migrated.coverImageUrl,
      slug:
        migrated.slug === "tokyo-creator-journey" || !migrated.slug
          ? quiet.slug
          : migrated.slug,
      creatorNote: migrated.creatorNote || quiet.creatorNote,
      outlineHeading: migrated.outlineHeading || quiet.outlineHeading,
      outline: migrated.outline?.length ? migrated.outline : quiet.outline,
      products: keepProducts ? migrated.products : quiet.products,
      status:
        migrated.status === "draft" && migrated.totalSpots === 8
          ? "published"
          : migrated.status,
      salesMode:
        migrated.status === "draft" && migrated.totalSpots === 8
          ? "live"
          : migrated.salesMode,
      totalSpots: migrated.totalSpots === 8 ? 100 : migrated.totalSpots,
      revenueRaised:
        migrated.revenueRaised === 7250 ? 8420 : migrated.revenueRaised,
      registrationCount:
        migrated.registrationCount === 42 ? 68 : migrated.registrationCount,
    };
  }

  return migrated;
}

function hasCustomParticipationTitles(products: ExperienceProduct[]): boolean {
  if (products.length === 0) return false;
  const defaultTitles = new Set([
    "Founding Participant",
    "Creative Contributor",
    "Creative Collaborator",
    "Project Participant",
    "Journey Member",
    "Presenting Partner",
  ]);
  return products.some((product) => !defaultTitles.has(product.title));
}

function withSlug(data: LaunchData): LaunchData {
  const slugSource = data.title || data.name;
  return {
    ...data,
    slug: slugify(slugSource) || data.slug || "my-launch",
  };
}

function createDemoProducts(): ExperienceProduct[] {
  return generateExperiences({
    activity: "",
    projectCategory: null,
    needIds: [],
    knownDetails: "",
    dateMode: "one-day",
    singleDate: "",
    startDate: "",
    endDate: "",
    locationType: null,
    locationCity: "",
    onlinePlatform: null,
    onlinePlatformOther: "",
    frequencyId: null,
    frequencyLabel: "",
    customInterval: 3,
    customUnit: "weeks",
    participationIds: [],
  });
}

function createQuietRoomProducts(): ExperienceProduct[] {
  return [
    {
      id: "exp-shape-it",
      category: "SHAPE IT",
      title: "Setlist & Space Council",
      description:
        "Help choose 3–4 songs, vote on the running order, and shape the room, lighting and atmosphere.",
      howItHelps:
        "Early choices give the night a voice that belongs to the people in the room.",
      access: "A private planning session and founding credit in project updates.",
      phase: "Validate the idea",
      price: 50,
      spots: 12,
      imageUrl: EXPERIENCE_IMAGES.group,
      active: true,
      benefits: [
        "Vote on the setlist",
        "Help shape the space",
        "Join the private community",
        "Follow the creation process",
      ],
    },
    {
      id: "exp-contribute",
      category: "CONTRIBUTE",
      title: "Song & Story Contributor",
      description:
        "Share a song, memory, or moment that could become part of the night.",
      howItHelps:
        "Community material gives the set a distinctive voice and more to build from.",
      access: "Selected ideas are developed in a small working session.",
      phase: "Validate the idea",
      price: 75,
      spots: 20,
      imageUrl: EXPERIENCE_IMAGES.video,
      active: true,
      benefits: [
        "Submit a song or story",
        "Join a working session",
        "See your idea considered",
      ],
    },
    {
      id: "exp-co-create",
      category: "CO-CREATE",
      title: "Circle Collaborator",
      description:
        "Join a small rehearsal where selected ideas are shaped into the live set.",
      howItHelps:
        "Hands-on collaboration turns the concept into a night ready to share.",
      access: "Rehearsal participation and behind-the-scenes process updates.",
      phase: "Produce and deliver",
      price: 150,
      spots: 10,
      imageUrl: EXPERIENCE_IMAGES.gift,
      active: true,
      benefits: [
        "Join a rehearsal",
        "Help arrange the set",
        "Stay close to the process",
      ],
    },
    {
      id: "exp-join",
      category: "JOIN",
      title: "In the Circle",
      description:
        "Be in the room for the one-night acoustic circle — not as an audience, as part of it.",
      howItHelps: "A committed group makes an intimate live night possible.",
      access: "A place in the circle on the night of the show.",
      phase: "Produce and deliver",
      price: 220,
      spots: 40,
      imageUrl: EXPERIENCE_IMAGES.travel,
      active: true,
      benefits: [
        "Sit in the circle",
        "Meet the artists",
        "Stay after the show",
      ],
    },
    {
      id: "exp-follow",
      category: "FOLLOW THE JOURNEY",
      title: "Journey Member",
      description:
        "Receive private updates, behind-the-scenes access, and early peeks as the night takes shape.",
      howItHelps: "A close audience keeps momentum going between milestones.",
      access: "Private project updates and early peeks before the night.",
      phase: "Validate the idea",
      price: 29,
      spots: "unlimited",
      imageUrl: EXPERIENCE_IMAGES.video,
      active: true,
      benefits: [
        "Follow the creation process",
        "Get private updates",
        "See early previews",
      ],
    },
    {
      id: "exp-partner",
      category: "PARTNER",
      title: "Quiet Partner",
      description:
        "Support the venue, equipment, recording, hospitality or another major part of the project.",
      howItHelps:
        "Partnership closes the gap between the idea and a real night in the room.",
      access: "Recognition as a partner bringing the project to life.",
      phase: "Reach the minimum goal",
      price: 1500,
      spots: 2,
      imageUrl: EXPERIENCE_IMAGES.sponsor,
      active: true,
    },
  ];
}

function createTokyoCampaign(products?: ExperienceProduct[]): LaunchData {
  return withSlug({
    ...DEFAULT_LAUNCH,
    id: "campaign-tokyo",
    name: "The Quiet Room",
    title: "The Quiet Room",
    subtitle: "One-Night Acoustic Circle",
    description:
      "Help shape an intimate one-night acoustic experience — from the setlist to the room itself.",
    firstDate: "2026-08-30",
    locationType: "in-person",
    city: "Tokyo, Japan",
    venue: "Shibuya Creative Hub",
    frequencyId: "one-time",
    frequencyLabel: "One-time project",
    totalSpots: 100,
    status: "published",
    salesMode: "live",
    revenueRaised: 8420,
    registrationCount: 68,
    products: products ?? createQuietRoomProducts(),
    slug: "the-quiet-room",
    coverImageUrl: QUIET_ROOM_COVER,
    creatorNote:
      "I've wanted to create a show where the audience isn't just watching. I want the people in the room to help shape what the night becomes.",
    outlineHeading: "The Night",
    outline: [
      {
        title: "Doors Open",
        description: "Meet the community and settle into the space.",
      },
      {
        title: "Acoustic Circle",
        description:
          "An intimate live performance shaped by the community.",
      },
      {
        title: "After the Show",
        description: "Stay, talk, meet the artists and community.",
      },
    ],
  });
}

function createBaliCampaign(): LaunchData {
  return withSlug({
    ...DEFAULT_LAUNCH,
    id: "campaign-bali",
    name: "Bali Wellness Retreat",
    title: "Bali Wellness Retreat",
    subtitle: "A week with the community",
    description:
      "A restorative week of yoga, mindfulness, and community on the island of Bali.",
    firstDate: "2026-11-03",
    locationType: "in-person",
    city: "Ubud, Bali",
    venue: "Jungle Wellness Lodge",
    frequencyId: "one-time",
    frequencyLabel: "One-time project",
    totalSpots: 12,
    status: "published",
    salesMode: "live",
    demandValidationEnabled: true,
    cutOffDate: "2026-08-01",
    fundingGoal: 15000,
    revenueRaised: 4200,
    registrationCount: 18,
    products: createDemoProducts(),
    slug: "bali-wellness-retreat",
    coverImageUrl: BALI_COVER,
    outlineHeading: "The week",
    outline: [
      {
        title: "Arrive",
        description: "Meet the group and settle into the lodge together.",
      },
      {
        title: "Practice and make",
        description: "Shape the days with yoga, food, and shared work.",
      },
      {
        title: "Close together",
        description: "Share what happened and take the work home.",
      },
    ],
  });
}

function createCohortCampaign(): LaunchData {
  return withSlug({
    ...DEFAULT_LAUNCH,
    id: "campaign-cohort",
    name: "Creator Lab Cohort",
    title: "Creator Lab Cohort",
    description:
      "A 6-week online cohort for creators building their first paid experience.",
    firstDate: "2026-10-01",
    locationType: "online",
    onlinePlatform: "Zoom",
    onlineAccessDetails: "Link sent 24 hours before each session",
    frequencyId: "every-week",
    frequencyLabel: "Every week",
    totalSpots: 25,
    status: "draft",
    salesMode: "preview",
    revenueRaised: 0,
    registrationCount: 0,
    products: createDemoProducts(),
    slug: "creator-lab-cohort",
    coverImageUrl: COHORT_COVER,
  });
}

function createDefaultCampaignsState(): CampaignsState {
  return {
    campaigns: [
      createTokyoCampaign(),
      createBaliCampaign(),
      createCohortCampaign(),
    ],
    activeCampaignId: "campaign-tokyo",
  };
}

export function getDefaultCampaignsState(): CampaignsState {
  return createDefaultCampaignsState();
}

function mergeCampaignIntoList(
  campaigns: LaunchData[],
  campaign: LaunchData,
): LaunchData[] {
  const index = campaigns.findIndex((item) => item.id === campaign.id);
  if (index === -1) {
    return [...campaigns, withSlug(campaign)];
  }

  const next = [...campaigns];
  next[index] = withSlug(campaign);
  return next;
}

function readCampaignsState(): CampaignsState | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(CAMPAIGNS_STATE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as CampaignsState;
    const needsQuietRoomPersist = parsed.campaigns.some(
      (campaign) =>
        campaign.id === "campaign-tokyo" &&
        campaign.title === "Tokyo Creator Journey",
    );
    const state = {
      campaigns: parsed.campaigns.map((campaign) =>
        migrateLaunchData(campaign as unknown as Record<string, unknown>),
      ),
      activeCampaignId: parsed.activeCampaignId,
    };
    if (needsQuietRoomPersist) {
      writeCampaignsState(state);
    }
    return state;
  } catch {
    return null;
  }
}

function migrateLegacyLaunchState(): CampaignsState | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(LEGACY_LAUNCH_KEY);
    if (!stored) return null;

    const legacy = migrateLaunchData(JSON.parse(stored));
    const defaults = createDefaultCampaignsState();

    if (legacy.products.length > 0 || legacy.title) {
      const tokyo = createTokyoCampaign(
        legacy.products.length > 0 ? legacy.products : undefined,
      );
      const mergedTokyo = withSlug({
        ...tokyo,
        ...legacy,
        id: "campaign-tokyo",
        name: legacy.name || legacy.title || tokyo.name,
      });

      return {
        campaigns: [
          mergedTokyo,
          ...defaults.campaigns.filter((campaign) => campaign.id !== "campaign-tokyo"),
        ],
        activeCampaignId: "campaign-tokyo",
      };
    }

    return null;
  } catch {
    return null;
  }
}

function writeCampaignsState(state: CampaignsState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CAMPAIGNS_STATE_KEY, JSON.stringify(state));
}

export function getCampaignsState(): CampaignsState {
  if (typeof window === "undefined") {
    return createDefaultCampaignsState();
  }

  const existing = readCampaignsState();
  if (existing && existing.campaigns.length > 0) {
    const activeExists = existing.campaigns.some(
      (campaign) => campaign.id === existing.activeCampaignId,
    );
    return activeExists
      ? existing
      : { ...existing, activeCampaignId: existing.campaigns[0].id };
  }

  const migrated = migrateLegacyLaunchState();
  const state = migrated ?? createDefaultCampaignsState();
  writeCampaignsState(state);
  return state;
}

export function getCampaigns(): LaunchData[] {
  return getCampaignsState().campaigns;
}

export function getActiveCampaignId(): string {
  return getCampaignsState().activeCampaignId;
}

export function getActiveCampaign(): LaunchData {
  const state = getCampaignsState();
  return (
    state.campaigns.find((campaign) => campaign.id === state.activeCampaignId) ??
    state.campaigns[0] ??
    createTokyoCampaign()
  );
}

export function getCampaignById(id: string): LaunchData | null {
  return getCampaigns().find((campaign) => campaign.id === id) ?? null;
}

export function getCampaignBySlug(slug: string): LaunchData | null {
  const campaigns = getCampaigns();
  const fromCampaigns =
    campaigns.find((campaign) => campaign.slug === slug) ??
    (slug === "tokyo-creator-journey"
      ? campaigns.find((campaign) => campaign.id === "campaign-tokyo")
      : undefined);
  if (fromCampaigns) return fromCampaigns;
  return getPublishedLaunch(slug);
}

export function switchCampaign(id: string): LaunchData {
  const state = getCampaignsState();
  const campaign = state.campaigns.find((item) => item.id === id);
  if (!campaign) return getActiveCampaign();

  const nextState = { ...state, activeCampaignId: id };
  writeCampaignsState(nextState);
  return campaign;
}

export function saveCampaign(data: LaunchData): LaunchData {
  const next = withSlug({
    ...data,
    name: data.name || data.title || "New Campaign",
  });

  const state = getCampaignsState();
  const nextState: CampaignsState = {
    campaigns: mergeCampaignIntoList(state.campaigns, next),
    activeCampaignId: next.id,
  };

  writeCampaignsState(nextState);
  return next;
}

export function createNewCampaign(): LaunchData {
  const id = createCampaignId();
  const campaign = withSlug({
    ...DEFAULT_LAUNCH,
    id,
    name: "New Campaign",
    title: "",
    slug: `new-campaign-${id.slice(-6)}`,
    products: createDemoProducts(),
  });

  const state = getCampaignsState();
  writeCampaignsState({
    campaigns: [...state.campaigns, campaign],
    activeCampaignId: campaign.id,
  });

  return campaign;
}

export function getLaunchData(): LaunchData {
  return getActiveCampaign();
}

export function saveLaunchData(partial: Partial<LaunchData>) {
  const current = getActiveCampaign();
  saveCampaign({ ...current, ...partial });
}

export function getPublishedLaunch(slug: string): LaunchData | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(`${PUBLISHED_PREFIX}${slug}`);
    if (!stored) return null;
    return migrateLaunchData(JSON.parse(stored));
  } catch {
    return null;
  }
}

export function publishLaunch(data: LaunchData): LaunchData {
  const published: LaunchData = withSlug({
    ...data,
    status: "published",
    salesMode: "live",
  });

  if (typeof window !== "undefined") {
    saveCampaign(published);
    localStorage.setItem(
      `${PUBLISHED_PREFIX}${published.slug}`,
      JSON.stringify(published),
    );
  }

  return published;
}

export function createLaunchFromOnboarding(
  products?: ExperienceProduct[],
  hero?: {
    title?: string;
    description?: string;
    coverImageUrl?: string;
    whyItMatters?: string;
    communityMakesPossible?: string;
    estimatedBudget?: string;
    estimatedTimeToLaunch?: string;
    suggestedMinimumGoal?: string;
    recommendedCampaignLength?: string;
    estimateAssumptions?: string;
    milestones?: ProjectMilestone[];
  },
): LaunchData {
  const onboarding = getOnboardingData();
  const generatedProducts = products ?? generateExperiences(onboarding);
  const activitySummary = summarizeActivity(onboarding.activity);
  const launchTitle = hero?.title?.trim() || activitySummary;
  const launchDescription =
    hero?.description?.trim() ||
    onboarding.activity ||
    "Join me in bringing this project to life with the community.";

  const knownLocation = onboarding.knownDetails || onboarding.activity;
  const city = /tokyo|japan/i.test(knownLocation)
    ? "Tokyo, Japan"
    : /paris/i.test(knownLocation)
      ? "Paris, France"
      : "";

  const state = getCampaignsState();
  const active = getActiveCampaign();
  const isBlankCampaign =
    !active.title && active.products.length === 0 && active.name === "New Campaign";

  const baseCampaign = isBlankCampaign ? active : createTokyoCampaign();
  const launch = withSlug({
    ...baseCampaign,
    id: isBlankCampaign ? active.id : "campaign-tokyo",
    name: launchTitle || "Community Project",
    title: launchTitle,
    description: launchDescription,
    frequencyId: onboarding.frequencyId ?? "one-time",
    frequencyLabel: onboarding.frequencyLabel || "One-time project",
    customInterval: onboarding.customInterval,
    customUnit: onboarding.customUnit,
    city,
    coverImageUrl: hero?.coverImageUrl || baseCampaign.coverImageUrl,
    products: generatedProducts,
    subtitle: undefined,
    creatorNote: hero?.whyItMatters,
    outlineHeading: undefined,
    outline: undefined,
    whyItMatters: hero?.whyItMatters,
    communityMakesPossible: hero?.communityMakesPossible,
    estimatedBudget: hero?.estimatedBudget,
    estimatedTimeToLaunch: hero?.estimatedTimeToLaunch,
    suggestedMinimumGoal: hero?.suggestedMinimumGoal,
    recommendedCampaignLength: hero?.recommendedCampaignLength,
    estimateAssumptions: hero?.estimateAssumptions,
    milestones: hero?.milestones,
  });

  const campaigns = isBlankCampaign
    ? mergeCampaignIntoList(
        state.campaigns.filter((campaign) => campaign.id !== active.id),
        launch,
      )
    : mergeCampaignIntoList(
        state.campaigns.filter((campaign) => campaign.id !== "campaign-tokyo"),
        launch,
      );

  writeCampaignsState({
    campaigns: campaigns.some((campaign) => campaign.id === launch.id)
      ? campaigns
      : [...campaigns, launch],
    activeCampaignId: launch.id,
  });

  return launch;
}

export function getLaunchPublicUrl(slug: string): string {
  if (typeof window === "undefined") return `/launch/${slug}`;
  return `${window.location.origin}/launch/${slug}`;
}
