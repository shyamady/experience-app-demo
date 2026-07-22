import { SparkleIcon } from "@/components/icons/SparkleIcon";

type PreviewEarningsHighlightProps = {
  estimatedRevenue?: string;
  fallbackRevenue: string;
};

const HIGHLIGHTS = [
  "Based on similar creators",
  "No upfront cost",
  "Launch in minutes",
] as const;

export function PreviewEarningsHighlight({
  estimatedRevenue,
  fallbackRevenue,
}: PreviewEarningsHighlightProps) {
  const displayRevenue = estimatedRevenue ?? fallbackRevenue;
  const showMonthSuffix = !displayRevenue.toLowerCase().includes("month");

  return (
    <div className="rounded-meuse border border-pink-100 bg-white/90 px-5 py-4 shadow-meuse-card backdrop-blur-sm sm:px-6 sm:py-5">
      <p className="text-[0.625rem] font-bold tracking-[0.16em] text-zinc-400">
        YOUR POTENTIAL EARNINGS
      </p>
      <p className="mt-2 text-2xl font-bold tracking-tight sm:text-[1.75rem]">
        <span className="meuse-gradient-text">{displayRevenue}</span>
        {showMonthSuffix && (
          <span className="text-lg font-semibold text-zinc-700 sm:text-xl">
            {" "}
            in month one
          </span>
        )}
      </p>
      <ul className="mt-4 space-y-2">
        {HIGHLIGHTS.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-xs text-zinc-600 sm:text-sm"
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-50 text-pink-500">
              <CheckIcon />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-end">
        <SparkleIcon className="h-4 w-4 text-pink-300" />
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className="h-2.5 w-2.5"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
