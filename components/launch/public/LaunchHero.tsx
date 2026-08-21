import { GreenlightProgress } from "@/components/launch/public/GreenlightProgress";
import type { LaunchData } from "@/lib/launch/types";
import { formatFirstDate, formatShortDate, getPrimaryPlace } from "@/lib/launch/formatting";
import { getCampaignDisplayStatus } from "@/lib/dashboard/campaign-status";
import type { CampaignPhase } from "@/lib/launch/campaign-phase";
import type { RefObject } from "react";

type LaunchHeroProps = {
  data: LaunchData;
  compact?: boolean;
  phase?: CampaignPhase;
  onJoin: () => void;
  onWatchStory?: () => void;
  statusRef?: RefObject<HTMLDivElement | null>;
};

export function LaunchHero({
  data,
  compact = false,
  phase,
  onJoin,
  onWatchStory,
  statusRef,
}: LaunchHeroProps) {
  const place = getPrimaryPlace(data);
  const status = getCampaignDisplayStatus(data);
  const joinBy = data.cutOffDate ? formatFirstDate(data.cutOffDate) : "";

  return (
    <div>
      <div
        className={`relative w-full overflow-hidden ${
          compact ? "h-52" : "h-[20rem] sm:h-[28rem]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.coverImageUrl}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-5 sm:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.avatarUrl}
          alt=""
          className={`rounded-full border-[4px] border-white object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${
            compact
              ? "mt-[-1.75rem] h-16 w-16"
              : "mt-[-2.5rem] h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20"
          }`}
        />
        <p className="mt-3 text-sm font-semibold text-pink-500">
          {data.creatorName}
        </p>
      </div>

      <div
        className={`px-5 text-center sm:px-8 ${compact ? "mt-3" : "mt-4"}`}
      >
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-[2.5rem] sm:leading-tight">
          {data.title || "Your launch title"}
        </h1>
        {data.subtitle && (
          <p className="mt-2 text-base font-medium text-zinc-500 sm:text-lg">
            {data.subtitle}
          </p>
        )}
        {data.description && (
          <p className="mx-auto mt-4 max-w-[36rem] text-base leading-relaxed text-zinc-600 sm:text-lg">
            {data.description}
          </p>
        )}

        {(phase === undefined || phase === "funding" || phase === "greenlit") && (
          <div ref={statusRef} className="mx-auto mt-6 max-w-md text-left">
            <GreenlightProgress
              data={data}
              onJoin={onJoin}
              compact={compact}
              forceGreenlit={phase === "greenlit"}
            />
          </div>
        )}

        {(place || joinBy) && (
          <div className="mt-4 space-y-1 text-sm text-zinc-500">
            {place && <p>{place}</p>}
            {joinBy && status !== "ended" && status !== "cancelled" && (
              <p>Join by {formatShortDate(data.cutOffDate)}</p>
            )}
          </div>
        )}
        {onWatchStory && (
          <button
            type="button"
            onClick={onWatchStory}
            className="mt-4 text-sm font-semibold text-pink-600"
          >
            Watch story
          </button>
        )}
      </div>
    </div>
  );
}