type ReferralProgressProps = {
  current: number;
  target: number;
};

export function ReferralProgress({ current, target }: ReferralProgressProps) {
  const percent = Math.min(100, (current / target) * 100);
  const remaining = Math.max(0, target - current);

  return (
    <section className="meuse-referral-fade-up rounded-meuse border border-pink-100 bg-white p-6 shadow-meuse-card sm:p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500">Referral progress</p>
          <p className="mt-1 text-2xl font-bold text-zinc-900 sm:text-3xl">
            {current}{" "}
            <span className="text-lg font-semibold text-zinc-400 sm:text-xl">
              / {target} Friends Joined
            </span>
          </p>
        </div>
        <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#FF4F9A]">
          {Math.round(percent)}%
        </span>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-pink-50">
        <div
          className="meuse-referral-progress-fill h-full rounded-full bg-gradient-to-r from-[#FF4F9A] via-pink-400 to-rose-400"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-4 text-center text-sm text-zinc-600 sm:text-base">
        {remaining > 0 ? (
          <>
            Only{" "}
            <span className="font-semibold text-[#FF4F9A]">
              {remaining} more friend{remaining === 1 ? "" : "s"}
            </span>{" "}
            to unlock your next reward.
          </>
        ) : (
          <span className="font-semibold text-emerald-600">
            You&apos;ve unlocked the next reward tier!
          </span>
        )}
      </p>
    </section>
  );
}
