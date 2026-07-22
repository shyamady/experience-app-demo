import type { NextSession } from "@/lib/attendee/types";
import {
  getFormatLabel,
  getFormatStyles,
  getSessionStatusStyles,
} from "@/lib/attendee/formatting";

type NextSessionCardProps = {
  session: NextSession;
  sticky?: boolean;
};

export function NextSessionCard({ session, sticky = false }: NextSessionCardProps) {
  return (
    <section
      className={`overflow-hidden rounded-meuse border border-pink-200 bg-white shadow-meuse-card ${
        sticky ? "lg:sticky lg:top-6" : ""
      }`}
    >
      <div className="bg-gradient-to-r from-rose-50 via-white to-pink-50 px-5 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-pink-600">
              Next session
            </p>
            <h2 className="mt-1 text-lg font-bold text-zinc-900 sm:text-xl">
              {session.experienceTitle}
            </h2>
          </div>
          <span
            className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${getSessionStatusStyles(session.status)}`}
          >
            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={session.creatorAvatarUrl}
            alt=""
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
          />
          <div>
            <p className="text-sm font-medium text-zinc-900">
              {session.creatorName}
            </p>
            <p className="text-xs text-zinc-500">Creator</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5 py-5 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <InfoBlock label="Date" value={session.sessionDate} />
          <InfoBlock
            label="Time"
            value={`${session.sessionTime} ${session.timezone}`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getFormatStyles(session.format)}`}
          >
            {getFormatLabel(session.format)}
          </span>
          <span className="rounded-full bg-pink-50 px-2.5 py-1 text-xs font-semibold text-pink-700">
            {session.countdownLabel}
          </span>
        </div>

        {!session.joinAvailable && (
          <p className="rounded-xl bg-meuse-hint px-3 py-2.5 text-sm text-zinc-600">
            {session.joinLinkHint}
          </p>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            disabled={!session.joinAvailable}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition-all ${
              session.joinAvailable
                ? "text-white meuse-gradient-bg shadow-lg shadow-pink-200/50"
                : "cursor-not-allowed bg-zinc-200 text-zinc-400"
            }`}
          >
            {session.primaryCta}
          </button>
          <button
            type="button"
            className="rounded-full border border-pink-200 px-5 py-3 text-sm font-semibold text-pink-700 hover:bg-rose-50"
          >
            Add to Calendar
          </button>
          <button
            type="button"
            className="rounded-full border border-pink-200 px-5 py-3 text-sm font-semibold text-pink-700 hover:bg-rose-50"
          >
            View Details
          </button>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-meuse-hint/70 px-3 py-2.5">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-zinc-900">{value}</p>
    </div>
  );
}
