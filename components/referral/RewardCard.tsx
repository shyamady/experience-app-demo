import type { RewardTier } from "@/lib/referral/types";

type RewardCardProps = {
  reward: RewardTier;
  currentReferrals: number;
};

export function RewardCard({ reward, currentReferrals }: RewardCardProps) {
  const unlocked = currentReferrals >= reward.friendsRequired;
  const inProgress =
    !unlocked &&
    currentReferrals < reward.friendsRequired &&
    currentReferrals >= reward.friendsRequired - 2;

  return (
    <article
      className={`relative flex min-w-[200px] flex-col rounded-meuse border p-5 transition-all hover:-translate-y-1 hover:shadow-meuse-card sm:min-w-[220px] ${
        unlocked
          ? "meuse-referral-reward-glow border-pink-300 bg-gradient-to-br from-rose-50 to-white"
          : inProgress
            ? "border-pink-200 bg-white shadow-meuse-chip"
            : "border-pink-100 bg-white/80 opacity-90"
      }`}
    >
      <span className="text-3xl">{reward.icon}</span>
      <h3 className="mt-3 text-sm font-bold text-zinc-900">{reward.title}</h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-zinc-600">
        {reward.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide ${
            unlocked
              ? "bg-emerald-100 text-emerald-700"
              : "bg-zinc-100 text-zinc-500"
          }`}
        >
          {unlocked ? "Unlocked" : "Locked"}
        </span>
        {!unlocked && (
          <span className="text-xs text-zinc-400">
            {reward.friendsRequired - currentReferrals} to go
          </span>
        )}
      </div>
    </article>
  );
}
