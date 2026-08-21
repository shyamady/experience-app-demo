import type { LaunchData } from "@/lib/launch/types";
import { formatFirstDate, formatShortDate, getPrimaryPlace } from "@/lib/launch/formatting";
import {
  displayStatusLabel,
  getCampaignDisplayStatus,
} from "@/lib/dashboard/campaign-status";
import { getCampaignProgress } from "@/lib/dashboard/campaign-progress";
import {
  formatDaysLeftCopy,
  getExpectedDateCopy,
} from "@/lib/launch/public-view";

type LaunchHeroProps = {
  data: LaunchData;
  compact?: boolean;
  phaseLabel?: string;
  onWatchStory?: () => void;
};

export function LaunchHero({
  data,
  compact = false,
  phaseLabel,
  onWatchStory,
}: LaunchHeroProps) {
  const place = getPrimaryPlace(data);
  const status = getCampaignDisplayStatus(data);
  const progress = getCampaignProgress(data);
  const daysCopy = formatDaysLeftCopy(progress.daysLeft);
  const expected = getExpectedDateCopy(data);
  const joinBy = data.cutOffDate ? formatFirstDate(data.cutOffDate) : "";
  const statusLabel =
    phaseLabel ??
    (status === "greenlit"
      ? "🎉 GREENLIT"
      : status === "ended"
        ? "ENDED"
        : status === "cancelled"
          ? "CANCELLED"
          : displayStatusLabel(status));

  return (
    <div>
      <div
        className={`relative w-full overflow-hidden ${
          compact ? "h-52" : "h-[22rem] sm:h-[32rem]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.coverImageUrl}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[0.625rem] font-bold tracking-[0.16em] text-zinc-800 shadow-sm">
          {statusLabel}
        </span>
        <div className="absolute inset-x-0 bottom-0 px-5 pb-8 sm:px-8 sm:pb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {data.title || "Your launch title"}
          </h1>
          {data.subtitle && (
            <p className="mt-1 text-base font-medium text-white/85 sm:text-xl">
              {data.subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-10 flex items-end gap-3 px-5 sm:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.avatarUrl}
          alt=""
          className={`rounded-full border-[4px] border-white object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${
            compact ? "mt-[-1.75rem] h-16 w-16" : "mt-[-2.25rem] h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20"
          }`}
        />
        <p className="mb-1 text-sm font-semibold text-pink-500">
          by {data.creatorName}
        </p>
      </div>

      <div className={`px-5 sm:px-8 ${compact ? "mt-3" : "mt-4"}`}>
        {data.description && (
          <p className="max-w-[36rem] text-lg font-medium leading-snug text-zinc-800 sm:text-xl">
            {data.description}
          </p>
        )}

        <div className="mt-5 space-y-2 text-sm text-zinc-600">
          {place && <p>📍 {place}</p>}
          <p>📅 Expected: {expected}</p>
          {joinBy && (
            <p className="font-semibold text-pink-600">
              ⏳ Join by: {formatShortDate(data.cutOffDate)}
            </p>
          )}
          {daysCopy && status !== "ended" && status !== "cancelled" && (
            <p className="text-sm font-medium text-zinc-500">{daysCopy}</p>
          )}
        </div>
        {onWatchStory && (
          <button
            type="button"
            onClick={onWatchStory}
            className="mt-5 text-sm font-semibold text-pink-600"
          >
            Watch story
          </button>
        )}
      </div>
    </div>
  );
}
