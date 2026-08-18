"use client";

import { useState } from "react";
import Link from "next/link";
import type { LaunchData } from "@/lib/launch/types";

type EventPreviewCardProps = {
  campaign: LaunchData;
};

export function EventPreviewCard({ campaign }: EventPreviewCardProps) {
  const [copied, setCopied] = useState(false);
  const title = campaign.title || campaign.name;
  const firstProductId = campaign.products[0]?.id ?? "live-nashville-studio";
  const publicPath = `/launch/${campaign.slug}`;
  const displayUrl = `meuse.co/${campaign.slug}`;

  function copyLink() {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    void navigator.clipboard?.writeText(`${origin}${publicPath}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
      <div className="grid sm:grid-cols-[220px_1fr]">
        <div className="aspect-[4/3] bg-zinc-100 sm:aspect-auto sm:min-h-[220px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={campaign.coverImageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col p-5">
          <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500">
            {campaign.description}
          </p>

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2">
            <p className="min-w-0 flex-1 truncate text-sm text-zinc-600">
              {displayUrl}
            </p>
            <button
              type="button"
              onClick={copyLink}
              className="shrink-0 text-sm font-semibold text-[#FF4F9A]"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <SocialIcon label="X" />
            <SocialIcon label="Facebook" />
            <SocialIcon label="LinkedIn" />
            <div className="ml-auto flex flex-wrap gap-2">
              <Link
                href={`/dashboard/products/${firstProductId}/edit`}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                Edit Event
              </Link>
              <Link
                href={`/dashboard/products/${firstProductId}/edit`}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="8.5" cy="10.5" r="1.5" />
                  <path d="m21 16-5-5-8 8" />
                </svg>
                Change Photo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ label }: { label: string }) {
  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-[10px] font-semibold text-zinc-500"
      aria-label={label}
    >
      {label === "X" ? "X" : label.slice(0, 2)}
    </span>
  );
}
