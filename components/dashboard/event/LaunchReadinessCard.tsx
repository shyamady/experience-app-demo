import Link from "next/link";
import type { ReadinessItem } from "@/lib/dashboard/launch-readiness";

type LaunchReadinessCardProps = {
  percent: number;
  items: ReadinessItem[];
};

export function LaunchReadinessCard({
  percent,
  items,
}: LaunchReadinessCardProps) {
  const featured = items.filter((item) => item.featured);
  const rest = items.filter((item) => !item.featured);
  const degrees = Math.round((percent / 100) * 360);

  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex items-center gap-4 lg:w-56 lg:shrink-0 lg:flex-col lg:items-start lg:pt-1">
          <div
            className="relative h-[88px] w-[88px] shrink-0 rounded-full"
            style={{
              background: `conic-gradient(#FF4F9A ${degrees}deg, #f4f4f5 0deg)`,
            }}
            aria-label={`${percent}% ready to launch`}
          >
            <div className="absolute inset-[10px] flex items-center justify-center rounded-full bg-white text-xl font-bold text-zinc-900">
              {percent}%
            </div>
          </div>
          <p className="text-sm leading-relaxed text-zinc-600">
            <span className="font-semibold text-zinc-900">{percent}% Ready to Launch.</span>{" "}
            Publish when you are ready to sell tickets.
          </p>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            {featured.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 px-4 py-3.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <StatusIcon status={item.status} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900">
                      {item.title}
                    </p>
                    {item.hint && (
                      <p className="mt-0.5 truncate text-xs text-zinc-500">
                        {item.hint}
                      </p>
                    )}
                  </div>
                </div>
                <Link
                  href={item.href}
                  className="shrink-0 text-sm font-semibold text-[#FF4F9A]"
                >
                  {item.actionLabel}
                </Link>
              </div>
            ))}
          </div>

          <div className="grid gap-x-6 sm:grid-cols-2">
            {rest.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 border-t border-zinc-100 py-3"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <StatusIcon status={item.status} />
                  <p className="truncate text-sm font-medium text-zinc-800">
                    {item.title}
                  </p>
                </div>
                {item.status === "action" ? (
                  <Link
                    href={item.href}
                    className="shrink-0 rounded-full bg-[#FF4F9A] px-3 py-1 text-xs font-semibold text-white"
                  >
                    {item.actionLabel}
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    className="shrink-0 text-sm font-semibold text-[#FF4F9A]"
                  >
                    {item.actionLabel}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusIcon({ status }: { status: ReadinessItem["status"] }) {
  if (status === "complete") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
    );
  }

  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-dashed border-zinc-300 text-zinc-400">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="8" />
      </svg>
    </span>
  );
}
