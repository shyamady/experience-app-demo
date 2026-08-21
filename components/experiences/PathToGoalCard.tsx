import {
  formatMoney,
  type PathToGoalLine,
} from "@/lib/onboarding/plan-math";

const BAR_COLORS = [
  "#FF4F9A",
  "#FF7AB3",
  "#F9A8D4",
  "#FB7185",
  "#F472B6",
];

type PathToGoalCardProps = {
  lines: PathToGoalLine[];
  goalValue: number;
  total: number;
  participants: number;
};

export function PathToGoalCard({
  lines,
  goalValue,
  total,
  participants,
}: PathToGoalCardProps) {
  if (lines.length === 0) return null;

  const maxSubtotal = Math.max(...lines.map((line) => line.subtotal), 1);
  const coversCost = total >= goalValue;

  return (
    <section className="overflow-hidden rounded-[1.75rem] bg-white shadow-meuse-card">
      <div className="px-5 py-6 sm:px-7 sm:py-8">
        <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
          THIS CAN WORK
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          A realistic path to make this happen
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          One realistic mix of offer sales that can cover the project.
        </p>

        <div className="mt-6 space-y-3">
          {lines.map((line, index) => (
            <div key={`${line.title}-${line.price}`}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <p className="min-w-0 truncate text-sm font-medium text-zinc-700">
                  <span className="font-bold text-zinc-900">{line.quantity}</span>
                  {" × "}
                  {line.title}
                </p>
                <p className="shrink-0 text-sm font-bold text-zinc-900">
                  {formatMoney(line.subtotal)}
                </p>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-rose-50">
                <div
                  className="h-full rounded-full transition-[width] duration-700"
                  style={{
                    width: `${Math.max(8, (line.subtotal / maxSubtotal) * 100)}%`,
                    backgroundColor: BAR_COLORS[index % BAR_COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-rose-50 px-4 py-4 sm:px-5">
            <p className="text-xs font-semibold tracking-wide text-pink-500">
              Potential participation revenue
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              {formatMoney(total)}
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-50 px-4 py-4 sm:px-5">
            <p className="text-xs font-semibold tracking-wide text-zinc-500">
              Estimated project cost
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              {formatMoney(goalValue)}
            </p>
          </div>
        </div>

        <p className="mt-5 rounded-2xl bg-gradient-to-r from-rose-50 to-white px-4 py-3 text-sm font-semibold text-zinc-800 sm:text-base">
          {coversCost
            ? `This project can work with ~${participants} participants.`
            : `A strong start — ~${participants} participants gets this close.`}
        </p>
      </div>
    </section>
  );
}