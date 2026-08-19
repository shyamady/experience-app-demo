"use client";

import Link from "next/link";
import { LaunchDashboardShell } from "@/components/dashboard/LaunchDashboardShell";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import { getCampaignProgress } from "@/lib/dashboard/campaign-progress";
import { formatMoney } from "@/lib/dashboard/commerce";

const SPONSOR_CONTACTS: Record<string, { name: string; email: string; notes: string }> = {
  "exp-partner": {
    name: "Shibuya Creative Hub",
    email: "partners@creativehub.jp",
    notes: "Venue and hospitality in kind + cash.",
  },
};

export function SponsorsScreen() {
  const { activeCampaign } = useCampaign();
  const progress = getCampaignProgress(activeCampaign);
  const offers = progress.offers.filter((offer) => offer.isSponsor);

  return (
    <LaunchDashboardShell>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Sponsors</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Sponsorship packages helping fund the launch.
          </p>
        </div>

        {offers.length === 0 && (
          <p className="rounded-2xl border border-zinc-200/80 bg-white px-5 py-10 text-center text-sm text-zinc-500">
            No sponsor packages yet.
          </p>
        )}

        {offers.map((offer) => {
          const contact = SPONSOR_CONTACTS[offer.id];
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
                  {offer.sold > 0 ? "Manage" : "Edit"}
                </Link>
              </div>
              <p className="mt-3 text-sm text-zinc-600">
                {offer.capacity ?? "Open"} available · {offer.sold} sold
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">
                {formatMoney(offer.revenue)} committed
              </p>
              {contact && (
                <div className="mt-4 rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
                  <p>
                    <span className="font-medium text-zinc-800">Current sponsor:</span>{" "}
                    {offer.sold > 0 ? contact.name : "None yet"}
                  </p>
                  <p className="mt-1">{contact.email}</p>
                  <p className="mt-1">{contact.notes}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </LaunchDashboardShell>
  );
}
