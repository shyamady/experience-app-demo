import type {
  CustomFrequencyUnit,
  FrequencyId,
} from "@/lib/onboarding/frequency";
import type { ExperienceProduct } from "@/lib/onboarding/experiences";

export type LaunchLocationType = "in-person" | "online" | "hybrid";

export type LaunchStatus = "draft" | "published";

export type LaunchSalesMode = "preview" | "waitlist" | "live";

export type ValidationDecision = "pending" | "confirmed" | "cancelled" | null;

export type LaunchData = {
  id: string;
  name: string;
  title: string;
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
};
