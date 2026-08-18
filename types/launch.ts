export interface LaunchProduct {
  category: string;
  title: string;
  description: string;
  howItHelps: string;
  access: string;
  price: number;
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
  heroDescription: string;
  whyItMatters: string;
  communityMakesPossible: string;
  heroImageQuery: string;
  heroImageUrl?: string;
  estimatedBudget: string;
  estimatedTimeToLaunch: string;
  suggestedMinimumGoal: string;
  recommendedCampaignLength: string;
  estimateAssumptions: string;
  milestones: ProjectMilestone[];
  products: LaunchProduct[];
  /** Present on older generated sessions; no longer produced by the API. */
  estimatedRevenue?: string;
}

export interface GenerateLaunchRequest {
  activity: string;
  category?: string;
  needs: string[];
  knownDetails?: string;
  participation: string[];
}
