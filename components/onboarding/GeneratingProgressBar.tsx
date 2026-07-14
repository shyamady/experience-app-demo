type GeneratingProgressBarProps = {
  progress: number;
};

export function GeneratingProgressBar({ progress }: GeneratingProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-pink-100">
      <div
        className="h-full rounded-full meuse-gradient-bg"
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
}
