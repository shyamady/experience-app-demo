import type { AttendeeUpdate } from "@/lib/attendee/types";

type UpdateCardProps = {
  update: AttendeeUpdate;
  compact?: boolean;
};

export function UpdateCard({ update, compact = false }: UpdateCardProps) {
  return (
    <article
      className={`rounded-meuse border bg-white transition-colors ${
        update.read
          ? "border-pink-100"
          : "border-pink-200 bg-rose-50/30 shadow-meuse-card"
      } ${compact ? "p-4" : "p-5"}`}
    >
      <div className="flex items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={update.creatorAvatarUrl}
          alt=""
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-pink-500">
                {update.creatorName}
              </p>
              <h3 className="mt-0.5 text-sm font-semibold text-zinc-900">
                {update.title}
              </h3>
            </div>
            {!update.read && (
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500" />
            )}
          </div>
          <p
            className={`mt-2 text-sm leading-relaxed text-zinc-600 ${
              compact ? "line-clamp-2" : ""
            }`}
          >
            {update.message}
          </p>
          <p className="mt-2 text-xs text-zinc-400">{update.publishedAt}</p>
        </div>
      </div>
    </article>
  );
}
