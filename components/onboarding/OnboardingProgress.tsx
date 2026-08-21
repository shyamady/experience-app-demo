type OnboardingProgressProps = {
  currentStep: number;
  totalSteps?: number;
  compact?: boolean;
};

const STEP_LABELS = ["Idea", "Target", "Offers", "Preview"] as const;

export function OnboardingProgress({
  currentStep,
  totalSteps = 4,
  compact = false,
}: OnboardingProgressProps) {
  return (
    <div
      className={`shrink-0 px-5 text-center sm:px-8 ${
        compact ? "pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2" : "pb-8 pt-4"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-1 text-[0.6875rem] font-semibold tracking-wide text-zinc-400 sm:text-xs">
        {STEP_LABELS.slice(0, totalSteps).map((label, index) => (
          <span
            key={label}
            className={
              index + 1 === currentStep
                ? "text-pink-500"
                : index + 1 < currentStep
                  ? "text-zinc-600"
                  : ""
            }
          >
            {label}
          </span>
        ))}
      </div>
      <div className="mx-auto mt-2 flex max-w-md gap-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              index < currentStep ? "meuse-gradient-bg" : "bg-pink-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
