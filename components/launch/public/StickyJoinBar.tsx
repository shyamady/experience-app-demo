import { formatMoney } from "@/lib/dashboard/commerce";
import {
  formatGreenlightDays,
  getGreenlightState,
} from "@/lib/launch/greenlight";
import type { ExperienceProduct } from "@/lib/onboarding/experiences";
import type { LaunchData } from "@/lib/launch/types";
import type { PublicOffer } from "@/lib/launch/public-view";

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
  const greenlight = getGreenlightState(data);
  const daysCopy = formatGreenlightDays(greenlight.daysLeft);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-pink-100 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_32px_rgba(255,79,154,0.08)] backdrop-blur-sm lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          {selected ? (
            <p className="truncate text-sm font-semibold text-zinc-900">
              {selected.title} · {formatMoney(selected.price)}
            </p>
          ) : greenlight.isGreenlit ? (
            <p className="text-sm font-semibold text-zinc-900">
              ✓ Greenlit — It’s happening
            </p>
          ) : (
            <>
              <p className="text-sm font-semibold text-zinc-900">
                {greenlight.percent}% to Greenlight · {greenlight.people} joined
              </p>
              {daysCopy && (
                <p className="text-xs font-medium text-zinc-500">{daysCopy}</p>
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
          {selected ? "Continue" : "Choose how to join"}
        </button>
      </div>
    </div>
  );
}

export function DesktopSummaryCard({
  data,
  canJoin,
  onJoin,
}: {
  data: LaunchData;
  offers: PublicOffer[];
  canJoin: boolean;
  onJoin: () => void;
}) {
  const greenlight = getGreenlightState(data);
  const daysCopy = formatGreenlightDays(greenlight.daysLeft);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 overflow-hidden rounded-[1.75rem] bg-white p-5 shadow-meuse-card">
        {greenlight.isGreenlit ? (
          <p className="text-lg font-bold text-zinc-900">
            ✓ Greenlit — It’s happening
          </p>
        ) : (
          <>
            <p className="text-lg font-bold text-zinc-900">
              {greenlight.percent}% to Greenlight
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-rose-50">
              <div
                className="h-full rounded-full meuse-gradient-bg"
                style={{ width: `${Math.max(4, greenlight.percent)}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-zinc-600">
              {greenlight.people} {greenlight.people === 1 ? "person" : "people"}{" "}
              already in
            </p>
            {daysCopy && (
              <p className="mt-1 text-sm text-zinc-500">{daysCopy}</p>
            )}
          </>
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
          Choose how to join
        </button>
      </div>
    </aside>
  );
}