import type { BudgetLine } from "@/types/launch";
import { formatMoney } from "@/lib/onboarding/plan-math";

const BAR_COLORS = [
  "#FF4F9A",
  "#FF7AB3",
  "#F9A8D4",
  "#FB7185",
  "#F472B6",
  "#E879A9",
  "#FDA4AF",
];

type WhatItTakesCardProps = {
  lines: BudgetLine[];
  goalValue: number;
  goalType: "people" | "funding";
  variant?: "plan" | "public";
};

export function WhatItTakesCard({
  lines,
  goalValue,
  goalType,
  variant = "plan",
}: WhatItTakesCardProps) {
  const total = lines.reduce((sum, line) => sum + line.amount, 0) || goalValue;
  const displayTotal =
    goalType === "funding" && goalValue > 0 ? goalValue : total;

  if (lines.length === 0) return null;

  const publicView = variant === "public";

  return (
    <section className="rounded-meuse bg-white px-5 py-6 shadow-meuse-card sm:px-6">
      <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
        {publicView
          ? `What ${formatMoney(displayTotal)} makes possible`
          : `What the ${formatMoney(displayTotal)} makes possible`}
      </h2>
      {!publicView && (
        <p className="mt-1 text-sm text-zinc-500">
          A realistic starting breakdown for this project.
        </p>
      )}
      {publicView && (
        <p className="mt-2 text-2xl font-bold text-zinc-900">
          Estimated need: {formatMoney(displayTotal)}
        </p>
      )}
      {publicView && (
        <p className="mt-1 text-sm text-zinc-500">
          This is what participation is helping cover.
        </p>
      )}
      {!publicView && (
        <p className="mt-1 text-xs text-zinc-400">
          AI starting estimate. You can edit this later.
        </p>
      )}

      <div className="mt-4 flex h-3 overflow-hidden rounded-full">
        {lines.map((line, index) => (
          <div
            key={line.label}
            className="h-full"
            style={{
              width: `${Math.max(4, (line.amount / total) * 100)}%`,
              backgroundColor: BAR_COLORS[index % BAR_COLORS.length],
            }}
          />
        ))}
      </div>

      <ul className={`mt-5 ${publicView ? "space-y-2.5" : "space-y-3"}`}>
        {lines.map((line, index) => (
          <li key={line.label} className="flex items-start gap-3">
            <span
              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: BAR_COLORS[index % BAR_COLORS.length] }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-semibold text-zinc-900">{line.label}</p>
                <p className="shrink-0 text-sm font-bold text-zinc-800">
                  {formatMoney(line.amount)}
                </p>
              </div>
              {!publicView && line.description && (
                <p className="mt-0.5 text-sm leading-relaxed text-zinc-500">
                  {line.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
      {!publicView && (
        <p className="mt-5 border-t border-zinc-100 pt-4 text-sm font-bold text-zinc-900">
          Total: {formatMoney(displayTotal)}
        </p>
      )}
    </section>
  );
}
