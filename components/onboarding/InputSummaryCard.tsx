type InputSummaryCardProps = {
  activity: string;
  category?: string;
  needs?: string;
  goal?: string;
  participation: string;
};

export function InputSummaryCard({
  activity,
  category,
  needs,
  goal,
  participation,
}: InputSummaryCardProps) {
  const goalLine = goal || needs;
  const hasContent = activity || category || goalLine || participation;

  if (!hasContent) return null;

  return (
    <div className="w-full rounded-meuse-sm bg-meuse-hint px-4 py-3 text-center shadow-meuse-chip">
      {activity && (
        <p className="text-sm font-semibold text-zinc-800">{activity}</p>
      )}
      {category && (
        <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">{category}</p>
      )}
      {goalLine && (
        <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">{goalLine}</p>
      )}
      {participation && (
        <p className="mt-1 text-xs text-pink-500 sm:text-sm">{participation}</p>
      )}
    </div>
  );
}
