"use client";

import type { InspirationExperience } from "@/lib/dashboard/create-types";
import { formatGmv } from "@/lib/dashboard/create-mock-data";

type InspirationDetailDrawerProps = {
  experience: InspirationExperience | null;
  remixing: boolean;
  onClose: () => void;
  onRemix: (experience: InspirationExperience) => void;
};

export function InspirationDetailDrawer({
  experience,
  remixing,
  onClose,
  onRemix,
}: InspirationDetailDrawerProps) {
  if (!experience) return null;

  const metrics = [
    experience.metrics.ticketsSold != null &&
      `${experience.metrics.ticketsSold} tickets sold`,
    experience.metrics.gmv != null && formatGmv(experience.metrics.gmv),
    experience.metrics.membersJoined != null &&
      `${experience.metrics.membersJoined} members joined`,
    experience.metrics.capacity != null &&
      `Capacity ${experience.metrics.capacity}`,
    experience.metrics.status,
  ].filter(Boolean) as string[];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        disabled={remixing}
      />
      <div className="relative flex h-full w-full max-w-lg flex-col bg-white shadow-2xl animate-[slideIn_0.2s_ease-out]">
        <div className="relative h-48 shrink-0 overflow-hidden sm:h-56">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={experience.thumbnail}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            disabled={remixing}
            className="absolute top-3 right-3 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition hover:bg-black/55"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h2 className="text-xl font-semibold text-white">
              {experience.title}
            </h2>
            <p className="mt-1 text-sm text-white/80">
              {experience.creatorName} · {experience.creatorCategory}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {remixing ? (
            <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-pink-200 border-t-pink-500" />
              <p className="text-sm font-medium text-zinc-700">
                Adapting this experience for your audience...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-sm leading-relaxed text-zinc-600">
                {experience.description}
              </p>

              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-pink-50 bg-zinc-50/80 p-3">
                  <dt className="text-xs text-zinc-400">Format</dt>
                  <dd className="mt-1 font-medium text-zinc-800">
                    {experience.format}
                  </dd>
                </div>
                <div className="rounded-xl border border-pink-50 bg-zinc-50/80 p-3">
                  <dt className="text-xs text-zinc-400">Location</dt>
                  <dd className="mt-1 font-medium text-zinc-800">
                    {experience.location ?? "—"}
                  </dd>
                </div>
              </dl>

              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Results</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {metrics.map((metric) => (
                    <li
                      key={metric}
                      className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-pink-700"
                    >
                      {metric}
                    </li>
                  ))}
                  <li className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-pink-700">
                    {experience.products.length} product types
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-900">
                  Products included
                </h3>
                <ul className="mt-2 space-y-2">
                  {experience.products.map((product) => (
                    <li
                      key={product.title}
                      className="flex items-center justify-between rounded-xl border border-pink-100 px-3.5 py-2.5 text-sm"
                    >
                      <span className="font-medium text-zinc-800">
                        {product.title}
                      </span>
                      <span className="text-zinc-500">
                        {product.price != null
                          ? `$${product.price.toLocaleString()}`
                          : product.type}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-pink-100 bg-rose-50/50 p-4">
                <p className="text-xs font-semibold tracking-wide text-pink-500 uppercase">
                  Why it may fit you
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-700">
                  {experience.relevanceReason}
                </p>
              </div>
            </div>
          )}
        </div>

        {!remixing && (
          <div className="flex gap-2 border-t border-pink-50 px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="h-11 flex-1 rounded-xl border border-zinc-200 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onRemix(experience)}
              className="h-11 flex-[1.3] rounded-xl bg-[#FF4F9A] text-sm font-semibold text-white transition hover:brightness-95"
            >
              Remix This Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
