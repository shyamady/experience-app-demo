"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GlobalDashboardShell } from "@/components/dashboard/GlobalDashboardShell";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import { getCampaignProgress } from "@/lib/dashboard/campaign-progress";
import {
  displayStatusLabel,
  getCampaignDisplayStatus,
} from "@/lib/dashboard/campaign-status";
import { formatMoney } from "@/lib/dashboard/commerce";
import type { LaunchData } from "@/lib/launch/types";

export function LaunchesListScreen() {
  const { campaigns, switchCampaign } = useCampaign();
  const router = useRouter();

  function openLaunch(campaign: LaunchData) {
    switchCampaign(campaign.id);
    router.push("/dashboard/overview");
  }

  return (
    <GlobalDashboardShell>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Your Launches
        </h1>
        <Link
          href="/dashboard/create"
          className="rounded-full bg-[#FF4F9A] px-4 py-2.5 text-sm font-semibold text-white"
        >
          + Start a Launch
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {campaigns.map((campaign) => {
          const status = getCampaignDisplayStatus(campaign);
          const progress = getCampaignProgress(campaign);
          return (
            <article
              key={campaign.id}
              className="rounded-2xl border border-zinc-200/80 bg-white px-5 py-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-zinc-900">
                      {campaign.title || campaign.name}
                    </h2>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[0.65rem] font-bold tracking-[0.12em] text-zinc-600">
                      {displayStatusLabel(status)}
                    </span>
                  </div>
                  {status === "draft" ? (
                    <p className="mt-2 text-sm text-zinc-500">Ready to publish</p>
                  ) : (
                    <div className="mt-2 space-y-1 text-sm text-zinc-600">
                      <p>
                        {progress.goalType === "people"
                          ? `${progress.people} / ${progress.goalValue} people`
                          : `${formatMoney(progress.raised)} / ${formatMoney(progress.goalValue)}`}
                      </p>
                      <p>{progress.people} participants</p>
                      {progress.daysLeft !== null && progress.daysLeft >= 0 && (
                        <p>{progress.daysLeft} days left</p>
                      )}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => openLaunch(campaign)}
                  className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800"
                >
                  {status === "draft" ? "Continue" : "Manage"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </GlobalDashboardShell>
  );
}
