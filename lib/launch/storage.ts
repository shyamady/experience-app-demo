import { generateExperiences } from "@/lib/onboarding/experiences";
import type { ExperienceProduct } from "@/lib/onboarding/experiences";
import {
  getOnboardingData,
  summarizeActivity,
} from "@/lib/onboarding/storage";
import type { LaunchData } from "@/lib/launch/types";

const LEGACY_LAUNCH_KEY = "meuse-launch";
const CAMPAIGNS_STATE_KEY = "meuse-campaigns-state";
const PUBLISHED_PREFIX = "meuse-launch-published-";

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=600&fit=crop";

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
  creatorName: "Creator",
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

  return migrated;
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

function createTokyoCampaign(products?: ExperienceProduct[]): LaunchData {
  return withSlug({
    ...DEFAULT_LAUNCH,
    id: "campaign-tokyo",
    name: "Tokyo Creator Journey",
    title: "Tokyo Creator Journey",
    description:
      "Join me for an exclusive fan experience exploring Tokyo's creative scene.",
    firstDate: "2026-09-12",
    locationType: "in-person",
    city: "Tokyo, Japan",
    venue: "Shibuya Creative Hub",
    frequencyId: "one-time",
    frequencyLabel: "One-time event",
    totalSpots: 8,
    products: products ?? createDemoProducts(),
    slug: "tokyo-creator-journey",
    coverImageUrl: DEFAULT_COVER,
  });
}

function createBaliCampaign(): LaunchData {
  return withSlug({
    ...DEFAULT_LAUNCH,
    id: "campaign-bali",
    name: "Bali Wellness Retreat",
    title: "Bali Wellness Retreat",
    description:
      "A restorative week of yoga, mindfulness, and community on the island of Bali.",
    firstDate: "2026-11-03",
    locationType: "in-person",
    city: "Ubud, Bali",
    venue: "Jungle Wellness Lodge",
    frequencyId: "one-time",
    frequencyLabel: "One-time event",
    totalSpots: 12,
    demandValidationEnabled: true,
    cutOffDate: "2026-08-01",
    fundingGoal: 15000,
    revenueRaised: 4200,
    registrationCount: 18,
    products: createDemoProducts(),
    slug: "bali-wellness-retreat",
    coverImageUrl: BALI_COVER,
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
    revenueRaised: 3100,
    registrationCount: 11,
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
    return {
      campaigns: parsed.campaigns.map((campaign) =>
        migrateLaunchData(campaign as unknown as Record<string, unknown>),
      ),
      activeCampaignId: parsed.activeCampaignId,
    };
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
  const fromCampaigns = getCampaigns().find((campaign) => campaign.slug === slug);
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
  },
): LaunchData {
  const onboarding = getOnboardingData();
  const generatedProducts = products ?? generateExperiences(onboarding);
  const activitySummary = summarizeActivity(onboarding.activity);
  const launchTitle = hero?.title?.trim() || activitySummary;
  const launchDescription =
    hero?.description?.trim() ||
    onboarding.activity ||
    "Join me for an exclusive fan experience.";

  const city = onboarding.activity.toLowerCase().includes("tokyo")
    ? "Tokyo, Japan"
    : "";

  const state = getCampaignsState();
  const active = getActiveCampaign();
  const isBlankCampaign =
    !active.title && active.products.length === 0 && active.name === "New Campaign";

  const launch = withSlug({
    ...(isBlankCampaign ? active : createTokyoCampaign()),
    id: isBlankCampaign ? active.id : "campaign-tokyo",
    name: launchTitle || "Tokyo Creator Journey",
    title: launchTitle,
    description: launchDescription,
    frequencyId: onboarding.frequencyId,
    frequencyLabel: onboarding.frequencyLabel,
    customInterval: onboarding.customInterval,
    customUnit: onboarding.customUnit,
    city,
    products: generatedProducts,
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
