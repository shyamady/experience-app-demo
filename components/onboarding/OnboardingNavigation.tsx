import Link from "next/link";
import { BackArrowIcon } from "@/components/icons/BackArrowIcon";

type OnboardingNavigationProps = {
  backHref: string;
  continueHref: string;
  canContinue: boolean;
  onContinue?: () => void;
  footerNote?: string;
};

export function OnboardingNavigation({
  backHref,
  continueHref,
  canContinue,
  onContinue,
  footerNote,
}: OnboardingNavigationProps) {
  return (
    <div className="space-y-2 pt-1">
      <div className="flex items-center justify-between gap-3">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-800"
        >
          <BackArrowIcon className="h-4 w-4" />
          Back
        </Link>

        {canContinue ? (
          <Link
            href={continueHref}
            onClick={onContinue}
            className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white meuse-gradient-bg shadow-lg shadow-pink-200/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Continue
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-zinc-100 px-6 py-2.5 text-sm font-semibold text-zinc-300"
          >
            Continue
          </button>
        )}
      </div>
      {footerNote && (
        <p className="text-center text-xs text-zinc-400">{footerNote}</p>
      )}
    </div>
  );
}
