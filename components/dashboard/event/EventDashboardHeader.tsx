"use client";

import Link from "next/link";
import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { CampaignSwitcher } from "@/components/dashboard/CampaignSwitcher";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import {
  displayStatusLabel,
  getCampaignDisplayStatus,
} from "@/lib/dashboard/campaign-status";

export function EventDashboardHeader() {
  const { activeCampaign } = useCampaign();
  const title = activeCampaign.title || activeCampaign.name || "Untitled launch";
  const creator = activeCampaign.creatorName || "Creator";
  const firstProductId = activeCampaign.products[0]?.id ?? "live-nashville-studio";
  const status = getCampaignDisplayStatus(activeCampaign);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-1.5 text-sm text-zinc-500">
          <span className="truncate">{creator}</span>
          <span className="text-zinc-300">›</span>
          <CampaignSwitcher />
        </div>
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
            View Launch Page
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

      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-[1.75rem]">
          {title}
        </h1>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold tracking-[0.12em] ${
            status === "live" || status === "greenlit"
              ? "bg-emerald-50 text-emerald-700"
              : status === "draft"
                ? "bg-zinc-100 text-zinc-500"
                : "bg-zinc-100 text-zinc-600"
          }`}
        >
          {displayStatusLabel(status)}
        </span>
      </div>
    </div>
  );
}
