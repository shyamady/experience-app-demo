import type { RewardTier } from "@/lib/referral/types";
import { RewardCard } from "@/components/referral/RewardCard";

type RewardsGridProps = {
  rewards: RewardTier[];
  currentReferrals: number;
};

export function RewardsGrid({ rewards, currentReferrals }: RewardsGridProps) {
  return (
    <section className="meuse-referral-fade-up">
      <h2 className="text-center text-xl font-bold text-zinc-900 sm:text-2xl">
        Your Rewards
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-center text-sm text-zinc-600">
        Unlock exclusive perks as more friends join through your link.
      </p>

      <div className="-mx-4 mt-6 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            currentReferrals={currentReferrals}
          />
        ))}
      </div>
    </section>
  );
}
