import Link from "next/link";
import type { ChecklistItem } from "@/lib/attendee/types";

type ActionChecklistProps = {
  items: ChecklistItem[];
};

export function ActionChecklist({ items }: ActionChecklistProps) {
  const nextAction = items.find((item) => !item.completed && item.ctaLabel);

  return (
    <section className="rounded-meuse border border-pink-100 bg-white p-5 shadow-meuse-card sm:p-6">
      <h2 className="text-lg font-bold text-zinc-900">What you need to do</h2>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                item.completed
                  ? "bg-emerald-100 text-emerald-700"
                  : "border border-pink-200 bg-white text-zinc-400"
              }`}
            >
              {item.completed ? "✓" : ""}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className={`text-sm ${
                  item.completed
                    ? "text-zinc-500 line-through"
                    : "font-medium text-zinc-900"
                }`}
              >
                {item.label}
              </p>
              {!item.completed && item.ctaLabel && item.id === nextAction?.id && (
                item.href ? (
                  <Link
                    href={item.href}
                    className="mt-2 inline-flex rounded-full border border-pink-200 px-3 py-1.5 text-xs font-semibold text-pink-700 hover:bg-rose-50"
                  >
                    {item.ctaLabel}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="mt-2 inline-flex rounded-full border border-pink-200 px-3 py-1.5 text-xs font-semibold text-pink-700 hover:bg-rose-50"
                  >
                    {item.ctaLabel}
                  </button>
                )
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
