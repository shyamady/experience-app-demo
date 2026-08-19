"use client";

import Link from "next/link";
import { LaunchDashboardShell } from "@/components/dashboard/LaunchDashboardShell";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import { getCampaignProgress } from "@/lib/dashboard/campaign-progress";
import { formatMoney } from "@/lib/dashboard/commerce";

export function ProductsScreen() {
  const { activeCampaign } = useCampaign();
  const progress = getCampaignProgress(activeCampaign);
  const offers = progress.offers.filter((offer) => !offer.isSponsor);

  return (
    <LaunchDashboardShell>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Participation</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Rights people can buy to help make this happen.
            </p>
          </div>
        </div>

        {offers.map((offer) => {
          const remaining =
            offer.remaining === null
              ? "Open"
              : `${offer.remaining} spots left`;
          return (
            <article
              key={offer.id}
              className="rounded-2xl border border-zinc-200/80 bg-white px-5 py-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {offer.title}
                  </h3>
                  <p className="mt-1 text-2xl font-bold text-zinc-900">
                    {formatMoney(offer.price)}
                  </p>
                </div>
                <Link
                  href={`/dashboard/products/${offer.id}/edit`}
                  className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700"
                >
                  Manage
                </Link>
              </div>
              <p className="mt-3 text-sm text-zinc-600">
                {offer.capacity
                  ? `${offer.sold} / ${offer.capacity} sold`
                  : `${offer.sold} sold`}
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">
                {formatMoney(offer.revenue)}
              </p>
              <p className="mt-2 text-sm font-medium text-pink-600">{remaining}</p>
            </article>
          );
        })}
      </div>
    </LaunchDashboardShell>
  );
}
