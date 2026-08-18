"use client";

import Link from "next/link";
import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { CampaignSwitcher } from "@/components/dashboard/CampaignSwitcher";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import { getCreatorInitials } from "@/lib/dashboard/launch-readiness";

export function EventDashboardHeader() {
  const { activeCampaign } = useCampaign();
  const title = activeCampaign.title || activeCampaign.name || "Untitled experience";
  const creator = activeCampaign.creatorName || "Creator";
  const initials = getCreatorInitials(creator);
  const firstProductId =
    activeCampaign.products[0]?.id ?? "live-nashville-studio";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/dashboard"
          className="font-meuse-display text-xl font-extrabold tracking-tight meuse-gradient-text"
        >
          meuse
        </Link>
        <div className="flex items-center gap-3">
          <CampaignSwitcher />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100"
            aria-label="Notifications"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </button>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF4F9A] text-xs font-bold text-white"
            aria-hidden
          >
            {initials}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="truncate text-sm text-zinc-500">
          {creator}
          <span className="mx-1.5 text-zinc-300">›</span>
          <span className="text-zinc-700">{title}</span>
        </p>
        <div className="flex shrink-0 items-center gap-4">
          <Link
            href={`/dashboard/products/${firstProductId}/edit`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF4F9A]"
          >
            <SparkleIcon className="h-4 w-4" />
            Edit with AI
          </Link>
          <Link
            href={`/launch/${activeCampaign.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            Event page
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </Link>
        </div>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-[1.75rem]">
        {title}
      </h1>
    </div>
  );
}
