"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import { formatMoney, getLaunchCommerce } from "@/lib/dashboard/commerce";

export function SponsorsScreen() {
  const { activeCampaign } = useCampaign();
  const commerce = getLaunchCommerce(activeCampaign);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Sponsorship</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Brands helping make this launch happen.
        </p>
      </div>
      {commerce.sponsorshipLines.map((line) => (
        <section
          key={line.id}
          className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card"
        >
          <p className="font-semibold text-zinc-900">{line.title}</p>
          <p className="mt-1 text-sm text-zinc-500">
            {formatMoney(line.price)} · {line.sold}{" "}
            {line.sold === 1 ? "sponsor" : "sponsors"}
          </p>
          <p className="mt-3 text-sm text-zinc-600">
            Status: {line.sold > 0 ? "Active" : "Open"}
          </p>
        </section>
      ))}
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <DashboardShell>
      <SponsorsScreen />
    </DashboardShell>
  );
}
