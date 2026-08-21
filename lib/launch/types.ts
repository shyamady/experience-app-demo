import type {
  CustomFrequencyUnit,
  FrequencyId,
} from "@/lib/onboarding/frequency";
import type { ExperienceProduct } from "@/lib/onboarding/experiences";
import type { BudgetLine, ProjectMilestone } from "@/types/launch";

export type LaunchLocationType = "in-person" | "online" | "hybrid";

export type LaunchStatus = "draft" | "published" | "ended" | "cancelled";

export type LaunchSalesMode = "preview" | "waitlist" | "live";

export type ValidationDecision = "pending" | "confirmed" | "cancelled" | null;

export type ProjectOutlineItem = {
  title: string;
  description: string;
};

export type LaunchData = {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  description: string;
  firstDate: string;
  locationType: LaunchLocationType | null;
  city: string;
  venue: string;
  onlinePlatform: string;
  onlineAccessDetails: string;
  frequencyId: FrequencyId | null;
  frequencyLabel: string;
  customInterval: number;
  customUnit: CustomFrequencyUnit;
  totalSpots: number | "unlimited";
  demandValidationEnabled: boolean;
  cutOffDate: string;
  fundingGoal: number;
  revenueRaised: number;
  registrationCount: number;
  validationDecision: ValidationDecision;
  products: ExperienceProduct[];
  status: LaunchStatus;
  salesMode: LaunchSalesMode;
  slug: string;
  creatorName: string;
  coverImageUrl: string;
  avatarUrl: string;
  /** Creator pitch video for the story intro. If absent, skip story. */
  creatorVideoUrl?: string;
  /** One-line idea used on story screen 2. */
  storyIdea?: string;
  whyItMatters?: string;
  creatorNote?: string;
  outlineHeading?: string;
  outline?: ProjectOutlineItem[];
  communityMakesPossible?: string;
  estimatedBudget?: string;
  estimatedTimeToLaunch?: string;
  suggestedMinimumGoal?: string;
  recommendedCampaignLength?: string;
  estimateAssumptions?: string;
  budgetLines?: BudgetLine[];
  dateCertainty?: "confirmed" | "target" | "after-goal";
  milestones?: ProjectMilestone[];
  goalType?: "people" | "funding";
  goalValue?: number;
};
