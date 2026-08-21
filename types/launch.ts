export interface BudgetLine {
  label: string;
  amount: number;
  description: string;
}

export interface LaunchProduct {
  category: string;
  title: string;
  description: string;
  howItHelps: string;
  access: string;
  price: number;
  spots: number;
  capacity: string;
  phase: string;
  imageQuery: string;
  imageUrl?: string;
}

export interface ProjectMilestone {
  title: string;
  description: string;
}

export interface LaunchResponse {
  heroTitle: string;
  heroSubtitle?: string;
  heroDescription: string;
  heroImageQuery: string;
  heroImageUrl?: string;
  goalType: "people" | "funding";
  goalValue: number;
  suggestedGoalRange: string;
  estimateAssumptions: string;
  products: LaunchProduct[];
  budgetLines: BudgetLine[];
  gapSuggestions: string[];
  whyItMatters?: string;
  communityMakesPossible?: string;
  estimatedBudget?: string;
  estimatedTimeToLaunch?: string;
  suggestedMinimumGoal?: string;
  recommendedCampaignLength?: string;
  milestones?: ProjectMilestone[];
  estimatedRevenue?: string;
}

export interface GenerateLaunchRequest {
  activity: string;
  category?: string;
  goalType: "people" | "funding";
  goalValue: number;
  goalUnsure?: boolean;
  participation: string[];
  needs?: string[];
  knownDetails?: string;
}
