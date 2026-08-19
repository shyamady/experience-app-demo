import { getCampaignProgress } from "@/lib/dashboard/campaign-progress";
import { formatMoney } from "@/lib/dashboard/commerce";
import type { ExperienceProduct } from "@/lib/onboarding/experiences";
import type { LaunchData } from "@/lib/launch/types";
import {
  formatDaysLeftCopy,
  type PublicOffer,
} from "@/lib/launch/public-view";

type StickyJoinBarProps = {
  data: LaunchData;
  selected: ExperienceProduct | null;
  fromPrice: number | null;
  remainingSpots: number | null;
  canJoin: boolean;
  ended: boolean;
  onJoin: () => void;
};

export function StickyJoinBar({
  data,
  selected,
  fromPrice,
  canJoin,
  ended,
  onJoin,
}: StickyJoinBarProps) {
  if (ended) return null;
  const progress = getCampaignProgress(data);
  const daysCopy = formatDaysLeftCopy(progress.daysLeft);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-pink-100 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_32px_rgba(255,79,154,0.08)] backdrop-blur-sm lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          {selected ? (
            <p className="truncate text-sm font-semibold text-zinc-900">
              {selected.title} · {formatMoney(selected.price)}
            </p>
          ) : (
            <>
              <p className="text-sm font-semibold text-zinc-900">
                {fromPrice !== null
                  ? `From ${formatMoney(fromPrice)}`
                  : "Join the project"}
              </p>
              {daysCopy && (
                <p className="text-xs font-medium text-pink-600">{daysCopy}</p>
              )}
            </>
          )}
        </div>
        <button
          type="button"
          disabled={!canJoin}
          onClick={onJoin}
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold ${
            canJoin
              ? "text-white meuse-gradient-bg shadow-md shadow-pink-200/40"
              : "bg-zinc-100 text-zinc-400"
          }`}
        >
          {selected ? "Continue" : "Join the Project"}
        </button>
      </div>
    </div>
  );
}

export function DesktopSummaryCard({
  data,
  offers,
  canJoin,
  onJoin,
}: {
  data: LaunchData;
  offers: PublicOffer[];
  canJoin: boolean;
  onJoin: () => void;
}) {
  const progress = getCampaignProgress(data);
  const remaining = offers
    .map((offer) => offer.capacity.remaining)
    .filter((value): value is number => typeof value === "number")
    .reduce((sum, value) => sum + value, 0);
  const daysCopy = formatDaysLeftCopy(progress.daysLeft);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 overflow-hidden rounded-[1.75rem] bg-white p-5 shadow-meuse-card">
        <p className="text-xl font-bold text-zinc-900">
          {progress.goalType === "people"
            ? `${progress.people} / ${progress.goalValue}`
            : `${formatMoney(progress.raised)} / ${formatMoney(progress.goalValue)}`}
        </p>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-pink-100">
          <div
            className="h-full rounded-full meuse-gradient-bg transition-[width] duration-700"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
        {daysCopy && (
          <p className="mt-3 text-sm font-medium text-pink-600">{daysCopy}</p>
        )}
        {remaining > 0 && (
          <p className="mt-1 text-sm text-zinc-500">{remaining} spots left</p>
        )}
        <button
          type="button"
          disabled={!canJoin}
          onClick={onJoin}
          className={`mt-4 w-full rounded-full py-3 text-sm font-semibold ${
            canJoin
              ? "text-white meuse-gradient-bg"
              : "bg-zinc-100 text-zinc-400"
          }`}
        >
          Join the Project
        </button>
      </div>
    </aside>
  );
}
