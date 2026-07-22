export type RewardTier = {
  id: string;
  icon: string;
  friendsRequired: number;
  title: string;
  description: string;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  referrals: number;
  isCurrentUser?: boolean;
};

export type ReferralBenefit = {
  id: string;
  title: string;
  description: string;
  icon: "community" | "together" | "access";
};

export type ReferralFaq = {
  id: string;
  question: string;
  answer: string;
};

export type ReferralData = {
  creator: {
    name: string;
    avatarUrl: string;
    quote: string;
  };
  referralUrl: string;
  referralUrlDisplay: string;
  currentReferrals: number;
  nextRewardAt: number;
  rewards: RewardTier[];
  leaderboard: LeaderboardEntry[];
  benefits: ReferralBenefit[];
  faqs: ReferralFaq[];
};
