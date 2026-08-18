"use client";

import { EventPreviewCard } from "@/components/dashboard/event/EventPreviewCard";
import { EventQuickStats } from "@/components/dashboard/event/EventQuickStats";
import { EventMetrics } from "@/components/dashboard/event/EventMetrics";
import { HostCard } from "@/components/dashboard/event/HostCard";
import { LaunchReadinessCard } from "@/components/dashboard/event/LaunchReadinessCard";
import { ManageGrid } from "@/components/dashboard/event/ManageGrid";
import { PublishBar } from "@/components/dashboard/event/PublishBar";
import { RecentRegistrations } from "@/components/dashboard/event/RecentRegistrations";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import { getLaunchReadiness } from "@/lib/dashboard/launch-readiness";

export function OverviewScreen() {
  const { activeCampaign } = useCampaign();
  const readiness = getLaunchReadiness(activeCampaign);

  return (
    <div className="space-y-5 pb-10">
      <LaunchReadinessCard
        percent={readiness.percent}
        items={readiness.items}
      />
      <PublishBar />
      <EventPreviewCard campaign={activeCampaign} />
      <EventQuickStats campaign={activeCampaign} />
      <EventMetrics campaign={activeCampaign} />
      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
        <RecentRegistrations />
        <HostCard
          name={activeCampaign.creatorName}
          email="hello@meuse.co"
        />
      </div>
      <ManageGrid />
    </div>
  );
}
