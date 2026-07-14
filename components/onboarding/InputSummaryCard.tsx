type InputSummaryCardProps = {
  activity: string;
  dates?: string;
  location?: string;
  frequency: string;
  participation: string;
};

export function InputSummaryCard({
  activity,
  dates,
  location,
  frequency,
  participation,
}: InputSummaryCardProps) {
  const hasContent =
    activity || dates || location || frequency || participation;

  if (!hasContent) return null;

  return (
    <div className="w-full rounded-meuse-sm bg-meuse-hint px-4 py-3 text-center shadow-meuse-chip">
      {activity && (
        <p className="text-sm font-semibold text-zinc-800">{activity}</p>
      )}
      {dates && (
        <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">{dates}</p>
      )}
      {location && (
        <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">{location}</p>
      )}
      {frequency && (
        <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">{frequency}</p>
      )}
      {participation && (
        <p className="mt-1 text-xs text-pink-500 sm:text-sm">{participation}</p>
      )}
    </div>
  );
}
