"use client";

import { LaunchDashboardShell } from "@/components/dashboard/LaunchDashboardShell";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import { getCampaignProgress } from "@/lib/dashboard/campaign-progress";
import { formatMoney, getLaunchCommerce } from "@/lib/dashboard/commerce";

export function InsightsScreen() {
  const { activeCampaign } = useCampaign();
  const progress = getCampaignProgress(activeCampaign);
  const commerce = getLaunchCommerce(activeCampaign);
  const views = 1840;
  const conversion = progress.people > 0 ? Math.round((progress.people / views) * 1000) / 10 : 2.4;

  const metrics = [
    { label: "Page views", value: views.toLocaleString() },
    { label: "Conversion rate", value: `${conversion}%` },
    { label: "Total participants", value: String(progress.people) },
    { label: "Total revenue", value: formatMoney(progress.raised) },
    {
      label: "Funding progress",
      value: `${progress.percent}%`,
    },
    { label: "Sponsor revenue", value: formatMoney(commerce.sponsorshipRevenue) },
    {
      label: "Days remaining",
      value: progress.daysLeft === null ? "—" : String(Math.max(0, progress.daysLeft)),
    },
    { label: "Referral source", value: "Direct · Instagram" },
  ];

  return (
    <LaunchDashboardShell>
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Insights</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Lightweight campaign metrics. Not a community analytics suite.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-zinc-200/80 bg-white px-4 py-4 shadow-sm"
            >
              <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                {metric.label}
              </p>
              <p className="mt-2 text-xl font-bold text-zinc-900">{metric.value}</p>
            </div>
          ))}
        </div>
        <section className="rounded-2xl border border-zinc-200/80 bg-white px-5 py-5 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-900">
            Participation offer conversion
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {progress.offers.map((offer) => (
              <li key={offer.id} className="flex justify-between gap-3">
                <span className="text-zinc-700">{offer.title}</span>
                <span className="tabular-nums text-zinc-500">
                  {offer.capacity
                    ? `${offer.sold}/${offer.capacity}`
                    : `${offer.sold} sold`}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </LaunchDashboardShell>
  );
}
