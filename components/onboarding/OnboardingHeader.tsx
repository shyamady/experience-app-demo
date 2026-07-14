type OnboardingHeaderProps = {
  compact?: boolean;
};

export function OnboardingHeader({ compact = false }: OnboardingHeaderProps) {
  return (
    <header
      className={`flex shrink-0 items-center justify-center px-5 sm:px-8 ${
        compact ? "py-3 sm:py-4" : "py-5 sm:py-6"
      }`}
    >
      <span
        className={`font-meuse-display font-extrabold tracking-tight meuse-gradient-text ${
          compact
            ? "text-2xl sm:text-[1.75rem]"
            : "text-[1.75rem] sm:text-[2rem]"
        }`}
      >
        meuse
      </span>
    </header>
  );
}
