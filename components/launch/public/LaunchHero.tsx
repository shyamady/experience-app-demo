import type { LaunchData } from "@/lib/launch/types";
import { formatShortDate, getPrimaryPlace } from "@/lib/launch/formatting";
import { isLiveLaunch } from "@/lib/launch/public-view";

type LaunchHeroProps = {
  data: LaunchData;
  compact?: boolean;
};

export function LaunchHero({ data, compact = false }: LaunchHeroProps) {
  const place = getPrimaryPlace(data);
  const date = formatShortDate(data.firstDate);
  const live = isLiveLaunch(data);

  return (
    <div>
      <div className={`relative w-full overflow-hidden ${compact ? "h-36" : "h-52 sm:h-64"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.coverImageUrl}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.14em] text-pink-600 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
          {live ? "LIVE PROJECT" : "PREVIEW"}
        </span>
      </div>

      <div className="relative z-10 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.avatarUrl}
          alt=""
          className={`relative rounded-full border-[4px] border-white object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${
            compact
              ? "mt-[-2.25rem] h-[4.25rem] w-[4.25rem]"
              : "mt-[-2.75rem] h-24 w-24 sm:h-[6.5rem] sm:w-[6.5rem]"
          }`}
        />
      </div>

      <div className={`text-center ${compact ? "mt-3" : "mt-4"}`}>
        <h1 className="text-[1.65rem] font-bold tracking-tight text-zinc-900 sm:text-3xl">
          {data.title || "Your launch title"}
        </h1>
        {data.subtitle && (
          <p className="mt-1 text-base font-semibold text-zinc-700 sm:text-lg">
            {data.subtitle}
          </p>
        )}
        <p className="mt-2 text-sm font-medium text-pink-500">
          by {data.creatorName}
        </p>
        {data.description && (
          <p className="mx-auto mt-3 max-w-[34rem] text-sm leading-relaxed text-zinc-600 sm:text-[0.9375rem]">
            {data.description}
          </p>
        )}

        {(place || date) && (
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-zinc-500">
            {place && <span>📍 {place}</span>}
            {date && <span>📅 {date}</span>}
          </p>
        )}
      </div>
    </div>
  );
}
