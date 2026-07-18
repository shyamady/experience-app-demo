import Link from "next/link";
import { BackArrowIcon } from "@/components/icons/BackArrowIcon";

type MobileStickyActionBarProps = {
  backHref: string;
  continueLabel?: string;
  continueHref?: string;
  onContinue?: () => void;
  canContinue?: boolean;
  onContinueClick?: () => void;
};

export function MobileStickyActionBar({
  backHref,
  continueLabel = "Continue",
  continueHref,
  onContinue,
  canContinue = true,
  onContinueClick,
}: MobileStickyActionBarProps) {
  const continueClassName = `inline-flex flex-1 items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold transition-all ${
    canContinue
      ? "text-white meuse-gradient-bg shadow-lg shadow-pink-200/50"
      : "cursor-not-allowed bg-zinc-200 text-zinc-400"
  }`;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 sm:hidden">
      <div className="pointer-events-auto border-t border-pink-100 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(219,39,119,0.06)] backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-3.5 text-sm font-medium text-zinc-500"
          >
            <BackArrowIcon className="h-4 w-4" />
            Back
          </Link>

          {continueHref && canContinue ? (
            <Link
              href={continueHref}
              onClick={onContinue}
              className={continueClassName}
            >
              {continueLabel}
            </Link>
          ) : onContinueClick ? (
            <button
              type="button"
              onClick={onContinueClick}
              disabled={!canContinue}
              className={continueClassName}
            >
              {continueLabel}
            </button>
          ) : (
            <span className={continueClassName}>{continueLabel}</span>
          )}
        </div>
      </div>
    </div>
  );
}

/** Mobile bottom padding so content clears the fixed CTA bar. */
export const MOBILE_STICKY_CTA_PADDING =
  "pb-[calc(5.5rem+env(safe-area-inset-bottom))]";
