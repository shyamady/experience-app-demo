"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import { formatMoney, getLaunchCommerce, getPeopleGoal } from "@/lib/dashboard/commerce";

export default function AnalyticsPage() {
  const { activeCampaign } = useCampaign();
  const commerce = getLaunchCommerce(activeCampaign);
  const goal = getPeopleGoal(activeCampaign);

  return (
    <DashboardShell>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-zinc-900">Analytics</h1>
        <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card">
          <p className="text-sm text-zinc-500">People making this happen</p>
          <p className="mt-1 text-3xl font-bold text-zinc-900">
            {commerce.participants} / {goal}
          </p>
        </section>
        <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card">
          <p className="text-sm text-zinc-500">Total sales</p>
          <p className="mt-1 text-3xl font-bold text-zinc-900">
            {formatMoney(commerce.total)}
          </p>
        </section>
      </div>
    </DashboardShell>
  );
}
