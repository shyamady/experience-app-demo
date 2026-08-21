import { getCampaignProgress } from "@/lib/dashboard/campaign-progress";
import { formatMoney } from "@/lib/dashboard/commerce";
import {
  getPhaseHeadline,
  phasePrimaryCta,
  type CampaignPhase,
} from "@/lib/launch/campaign-phase";
import type { LaunchData } from "@/lib/launch/types";

type CampaignPhaseBannerProps = {
  data: LaunchData;
  phase: CampaignPhase;
  onJoin: () => void;
};

export function CampaignPhaseBanner({
  data,
  phase,
  onJoin,
}: CampaignPhaseBannerProps) {
  const headline = getPhaseHeadline(data, phase);
  const progress = getCampaignProgress(data);

  return (
    <section className="overflow-hidden rounded-[1.75rem] bg-white px-5 py-6 shadow-meuse-card sm:px-7">
      {phase === "funding" && (
        <>
          <p className="text-sm font-bold tracking-[0.14em] text-pink-500 uppercase">
            {headline.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {formatMoney(progress.raised)}
          </h2>
          <p className="mt-1 text-base text-zinc-500">
            of {formatMoney(progress.goalValue)}
          </p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-pink-100">
            <div
              className="h-full rounded-full meuse-gradient-bg transition-[width] duration-700"
              style={{ width: `${Math.max(4, progress.percent)}%` }}
            />
          </div>
          <p className="mt-3 text-sm font-semibold text-zinc-800">
            {progress.percent}% funded
          </p>
        </>
      )}

      {phase !== "funding" && (
        <>
          <p className="text-sm font-bold tracking-[0.14em] text-pink-500">
            {headline.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {headline.title}
          </h2>
          {headline.subtitle && (
            <p className="mt-2 text-base font-medium text-zinc-600">
              {headline.subtitle}
            </p>
          )}
        </>
      )}

      <ul className="mt-4 space-y-1">
        {headline.meta.map((item) => (
          <li key={item} className="text-sm text-zinc-500">
            {item}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onJoin}
        className="mt-5 w-full rounded-full py-3.5 text-sm font-semibold text-white meuse-gradient-bg shadow-lg shadow-pink-200/40"
      >
        {phasePrimaryCta(phase)}
      </button>
    </section>
  );
}
