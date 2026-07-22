"use client";

import { LaunchProductsSummary } from "@/components/launch/LaunchProductsSummary";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useCampaign } from "@/lib/dashboard/campaign-context";

export function ProductsScreen() {
  const { activeCampaign } = useCampaign();

  return (
    <DashboardShell
      title="Products"
      subtitle="Fan experiences and packages for your campaign."
    >
      <div className="px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="rounded-meuse bg-white p-4 shadow-meuse-card sm:p-6">
          <LaunchProductsSummary products={activeCampaign.products} />
        </div>
      </div>
    </DashboardShell>
  );
}
