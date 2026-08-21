import { GreenlightProgress } from "@/components/launch/public/GreenlightProgress";
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
  if (phase === "funding" || phase === "greenlit") {
    return <GreenlightProgress data={data} onJoin={onJoin} />;
  }

  const headline = getPhaseHeadline(data, phase);

  return (
    <section className="overflow-hidden rounded-[1.75rem] bg-white px-5 py-6 shadow-meuse-card sm:px-7">
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