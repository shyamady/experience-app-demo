"use client";

import Link from "next/link";
import { LaunchProductsSummary } from "@/components/launch/LaunchProductsSummary";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useCampaign } from "@/lib/dashboard/campaign-context";

export function ProductsScreen() {
  const { activeCampaign } = useCampaign();
  const firstProductId = activeCampaign.products[0]?.id ?? "live-nashville-studio";

  return (
    <DashboardShell
      title="Products"
      subtitle="Fan experiences and packages for your campaign."
    >
      <div className="px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-4 flex justify-end">
          <Link
            href={`/dashboard/products/${firstProductId}/edit`}
            className="rounded-full bg-[#FF4F9A] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-200/50 transition-transform hover:scale-[1.02]"
          >
            Edit Product
          </Link>
        </div>
        <div className="rounded-meuse bg-white p-4 shadow-meuse-card sm:p-6">
          <LaunchProductsSummary products={activeCampaign.products} />
        </div>
      </div>
    </DashboardShell>
  );
}
