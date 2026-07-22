import type { ReferralData } from "@/lib/referral/types";

const CREATOR_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop";

export const MOCK_REFERRAL: ReferralData = {
  creator: {
    name: "Geena Fontanella",
    avatarUrl: CREATOR_AVATAR,
    quote:
      "I can't wait to meet more amazing people through this community. Thanks for helping us grow.",
  },
  referralUrl: "https://meuse.co/r/geena-sarah",
  referralUrlDisplay: "meuse.co/r/geena-sarah",
  currentReferrals: 3,
  nextRewardAt: 5,
  rewards: [
    {
      id: "reward-1",
      icon: "🎟️",
      friendsRequired: 1,
      title: "1 Friend",
      description: "10% Discount",
    },
    {
      id: "reward-3",
      icon: "📹",
      friendsRequired: 3,
      title: "3 Friends",
      description: "Exclusive Behind-the-Scenes Video",
    },
    {
      id: "reward-5",
      icon: "🎤",
      friendsRequired: 5,
      title: "5 Friends",
      description: "Private Q&A Session",
    },
    {
      id: "reward-10",
      icon: "🎸",
      friendsRequired: 10,
      title: "10 Friends",
      description: "Signed Lyric Sheet",
    },
    {
      id: "reward-25",
      icon: "⭐",
      friendsRequired: 25,
      title: "25 Friends",
      description: "VIP Studio Visit",
    },
  ],
  leaderboard: [
    { rank: 1, name: "Sarah", referrals: 14 },
    { rank: 2, name: "Emma", referrals: 11 },
    { rank: 3, name: "Mike", referrals: 9 },
    { rank: 4, name: "You", referrals: 3, isCurrentUser: true },
  ],
  benefits: [
    {
      id: "grow",
      title: "Grow the community",
      description:
        "Help build a vibrant fan community around the experiences you love.",
      icon: "community",
    },
    {
      id: "together",
      title: "Experience events together",
      description:
        "Bring friends into live sessions, Q&As, and exclusive creator moments.",
      icon: "together",
    },
    {
      id: "access",
      title: "Unlock exclusive access",
      description:
        "Earn rewards that get you closer to the creator — discounts, content, and VIP access.",
      icon: "access",
    },
  ],
  faqs: [
    {
      id: "faq-1",
      question: "How do referrals work?",
      answer:
        "Share your unique link with friends. When they sign up and join through your link, it counts toward your referral progress and unlocks rewards.",
    },
    {
      id: "faq-2",
      question: "When do rewards unlock?",
      answer:
        "Rewards unlock automatically once you reach the required number of friends who join. You'll get an email and see updates on this page.",
    },
    {
      id: "faq-3",
      question: "Can I invite unlimited friends?",
      answer:
        "Yes! There's no cap on invitations. The more friends who join, the more rewards you can unlock.",
    },
    {
      id: "faq-4",
      question: "How do I track my progress?",
      answer:
        "Your progress bar and reward cards on this page update in real time as friends join through your link.",
    },
  ],
};

export function getMockReferral(): ReferralData {
  return MOCK_REFERRAL;
}
