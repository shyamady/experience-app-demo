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
  let offset = 0;
  const slices = lines.map((line, index) => {
    const percent = total > 0 ? (line.amount / total) * 100 : 0;
    const start = offset;
    offset += percent;
    return {
      ...line,
      percent,
      start,
      color: BAR_COLORS[index % BAR_COLORS.length],
    };
  });

  const gradient = slices
    .map((slice) => `${slice.color} ${slice.start}% ${slice.start + slice.percent}%`)
    .join(", ");

  return (
    <section className="rounded-[1.75rem] bg-white px-5 py-6 shadow-meuse-card sm:px-7 sm:py-8">
      {publicView ? (
        <>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
            What {formatMoney(displayTotal)} makes possible
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            This is what participation is helping cover.
          </p>
        </>
      ) : (
        <>
          <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
            WHAT IT TAKES
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
            A realistic plan for this idea
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Estimated project cost
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {formatMoney(displayTotal)}
          </p>
        </>
      )}

      <div
        className={`mt-6 grid items-center gap-6 ${
          publicView ? "" : "sm:grid-cols-[11rem_1fr]"
        }`}
      >
        {!publicView && (
          <div className="mx-auto flex h-40 w-40 items-center justify-center sm:h-44 sm:w-44">
            <div
              className="relative h-full w-full rounded-full shadow-inner"
              style={{ background: `conic-gradient(${gradient})` }}
              aria-hidden
            >
              <div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-full bg-white shadow-meuse-chip">
                <p className="text-[0.625rem] font-semibold tracking-wide text-zinc-400">
                  TOTAL
                </p>
                <p className="text-sm font-bold text-zinc-900 sm:text-base">
                  {formatMoney(displayTotal)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="min-w-0">
          {publicView && (
            <div className="mb-5 flex h-3 overflow-hidden rounded-full">
              {slices.map((slice) => (
                <div
                  key={slice.label}
                  className="h-full"
                  style={{
                    width: `${Math.max(4, slice.percent)}%`,
                    backgroundColor: slice.color,
                  }}
                />
              ))}
            </div>
          )}

          <ul className="space-y-3">
            {slices.map((slice) => (
              <li key={slice.label} className="flex items-start gap-3">
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: slice.color }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-semibold text-zinc-900">{slice.label}</p>
                    <p className="shrink-0 text-sm font-bold text-zinc-800">
                      {formatMoney(slice.amount)}
                    </p>
                  </div>
                  {!publicView && (
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-rose-50">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.max(6, slice.percent)}%`,
                          backgroundColor: slice.color,
                        }}
                      />
                    </div>
                  )}
                  {!publicView && slice.description && (
                    <p className="mt-0.5 text-sm leading-relaxed text-zinc-500">
                      {slice.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {!publicView && (
        <p className="mt-6 text-sm font-medium text-zinc-500">
          Meuse turned this idea into a realistic starting plan. You can edit it later.
        </p>
      )}
    </section>
  );
}