import type { ExperienceProduct } from "@/lib/onboarding/experiences";
import type { LaunchData } from "@/lib/launch/types";
import { getJoinProgress } from "@/lib/launch/public-view";

type StickyJoinBarProps = {
  data: LaunchData;
  selected: ExperienceProduct | null;
  fromPrice: number | null;
  canJoin: boolean;
  onJoin: () => void;
};

export function StickyJoinBar({
  data,
  selected,
  fromPrice,
  canJoin,
  onJoin,
}: StickyJoinBarProps) {
  const progress = getJoinProgress(data);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-100 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.04)] backdrop-blur-sm md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          {selected ? (
            <>
              <p className="truncate text-sm font-semibold text-zinc-900">
                {selected.title} · ${selected.price.toLocaleString()}
              </p>
              <p className="text-xs text-zinc-500">Join this way to participate</p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-zinc-900">
                {fromPrice !== null ? `From $${fromPrice.toLocaleString()}` : "Join the project"}
              </p>
              {progress.remaining !== null && (
                <p className="text-xs text-pink-600">
                  {progress.remaining} spots left
                </p>
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
          {selected ? "Join" : "Join →"}
        </button>
      </div>
    </div>
  );
}
