type OnboardingProgressProps = {
  currentStep: number;
  totalSteps?: number;
  compact?: boolean;
};

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
      <p className="text-sm font-medium text-zinc-400">
        Step {currentStep} of {totalSteps}
      </p>
      <div className="mx-auto mt-2 flex max-w-xs gap-2">
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
