import { formatMoney } from "@/lib/onboarding/plan-math";
import type { PathToGoalLine } from "@/lib/onboarding/plan-math";

type PathToGoalCardProps = {
  lines: PathToGoalLine[];
  goalValue: number;
  total: number;
};

export function PathToGoalCard({
  lines,
  goalValue,
  total,
}: PathToGoalCardProps) {
  if (lines.length === 0) return null;

  return (
    <section className="rounded-[1.75rem] bg-white px-5 py-6 shadow-meuse-card sm:px-6">
      <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
        One way this reaches {formatMoney(goalValue)}
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        A realistic mix of offers that can fund the project.
      </p>
      <ul className="mt-5 space-y-3">
        {lines.map((line) => (
          <li
            key={`${line.title}-${line.price}`}
            className="flex items-baseline justify-between gap-3 text-sm"
          >
            <p className="font-medium text-zinc-700">
              {line.quantity} × {formatMoney(line.price)}
              <span className="text-zinc-400"> · {line.title}</span>
            </p>
            <p className="shrink-0 font-bold text-zinc-900">
              {formatMoney(line.subtotal)}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-zinc-100 pt-4 text-base font-bold text-zinc-900">
        Total: {formatMoney(total)}
      </p>
    </section>
  );
}
