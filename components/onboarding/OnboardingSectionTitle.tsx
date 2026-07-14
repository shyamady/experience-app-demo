type OnboardingSectionTitleProps = {
  children: React.ReactNode;
};

export function OnboardingSectionTitle({
  children,
}: OnboardingSectionTitleProps) {
  return (
    <h2 className="text-sm font-semibold text-zinc-900 sm:text-[0.9375rem]">
      {children}
    </h2>
  );
}
