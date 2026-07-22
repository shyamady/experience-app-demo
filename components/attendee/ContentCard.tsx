import type { AttendeeContent } from "@/lib/attendee/types";
import {
  getContentAvailabilityLabel,
  getContentAvailabilityStyles,
  getContentTypeLabel,
} from "@/lib/attendee/formatting";

type ContentCardProps = {
  content: AttendeeContent;
  compact?: boolean;
};

export function ContentCard({ content, compact = false }: ContentCardProps) {
  const isAvailable = content.availability === "available";

  return (
    <article className="overflow-hidden rounded-meuse border border-pink-100 bg-white shadow-meuse-card">
      <div className={`relative ${compact ? "aspect-[16/9]" : "aspect-[16/10]"} bg-meuse-hint`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.thumbnailUrl}
          alt=""
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide text-zinc-700">
          {getContentTypeLabel(content.contentType)}
        </span>
      </div>

      <div className={compact ? "p-4" : "p-5"}>
        <h3 className="text-sm font-semibold text-zinc-900 sm:text-base">
          {content.title}
        </h3>
        {!compact && (
          <p className="mt-1 text-xs text-zinc-500">{content.experienceName}</p>
        )}
        <p
          className={`mt-2 text-xs font-medium ${getContentAvailabilityStyles(content.availability)}`}
        >
          {getContentAvailabilityLabel(content.availability)}
          {content.expirationDate && ` · Expires ${content.expirationDate}`}
        </p>
        <button
          type="button"
          disabled={!isAvailable}
          className={`mt-3 w-full rounded-full py-2.5 text-sm font-semibold transition-all ${
            isAvailable
              ? "border border-pink-200 text-pink-700 hover:bg-rose-50"
              : "cursor-not-allowed bg-zinc-100 text-zinc-400"
          }`}
        >
          {content.ctaLabel}
        </button>
      </div>
    </article>
  );
}
