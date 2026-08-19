import { formatMoney } from "@/lib/onboarding/plan-math";

type PotentialIfBookedCardProps = {
  potential: number;
  target: number;
  onAdjust: () => void;
};

export function PotentialIfBookedCard({
  potential,
  target,
  onAdjust,
}: PotentialIfBookedCardProps) {
  const enough = potential >= target;
  const gap = Math.abs(target - potential);

  return (
    <section className="rounded-meuse bg-white px-5 py-5 shadow-meuse-card sm:px-6">
      <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
        POTENTIAL IF FULLY BOOKED
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
        {formatMoney(potential)}
      </p>
      <p className="mt-1 text-sm text-zinc-500">
        Target: {formatMoney(target)}
      </p>
      <p className="mt-3 text-sm font-semibold text-zinc-800">
        {enough
          ? "Enough to cover the estimated project need"
          : `${formatMoney(gap)} below your estimated need`}
      </p>
      <button
        type="button"
        onClick={onAdjust}
        className="mt-4 text-sm font-semibold text-pink-600"
      >
        Adjust offers
      </button>
    </section>
  );
}
