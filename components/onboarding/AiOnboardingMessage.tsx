import { SparkleIcon } from "@/components/icons/SparkleIcon";

type AiOnboardingMessageProps = {
  headline: string;
  supportingText: string;
  compact?: boolean;
  animationDelay?: string;
  stepLabel?: string;
  hint?: string;
};

export function AiOnboardingMessage({
  headline,
  supportingText,
  compact = false,
  animationDelay = "0.05s",
  stepLabel,
  hint,
}: AiOnboardingMessageProps) {
  return (
    <div
      className={`meuse-fade-in-up bg-meuse-bubble shadow-meuse-card ${
        compact
          ? "rounded-meuse p-4 sm:p-5"
          : "rounded-meuse-lg p-6 sm:p-8"
      }`}
      style={{ animationDelay }}
    >
      <div className={`flex items-center gap-2 ${compact ? "mb-2.5" : "mb-4"}`}>
        {stepLabel ? (
          <span
            className={`font-semibold tracking-widest text-pink-400 ${
              compact ? "text-[0.625rem]" : "text-xs"
            }`}
          >
            {stepLabel}
          </span>
        ) : (
          <>
            <SparkleIcon
              className={`text-pink-400 ${compact ? "h-4 w-4" : "h-5 w-5"}`}
            />
            <span
              className={`font-medium text-pink-400 ${
                compact ? "text-xs" : "text-sm"
              }`}
            >
              meuse
            </span>
          </>
        )}
      </div>
      <h1
        className={`font-bold leading-tight tracking-tight text-zinc-900 ${
          compact
            ? "text-xl sm:text-[1.625rem]"
            : "text-[1.75rem] sm:text-[2rem]"
        }`}
      >
        {headline}
      </h1>
      <p
        className={`leading-relaxed text-zinc-600 ${
          compact
            ? "mt-2 text-sm sm:text-[0.9375rem]"
            : "mt-3 max-w-lg text-base sm:text-lg"
        }`}
      >
        {supportingText}
      </p>
      {hint && (
        <p
          className={`meuse-playful-hint text-pink-400 ${
            compact ? "mt-1.5 text-sm" : "mt-2 text-base"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
