"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useCampaign } from "@/lib/dashboard/campaign-context";

export default function SettingsPage() {
  const { activeCampaign } = useCampaign();

  return (
    <DashboardShell>
      <div className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card">
        <h1 className="text-lg font-bold text-zinc-900">Settings</h1>
        <p className="mt-2 text-sm text-zinc-500">
          {activeCampaign.title || activeCampaign.name}
        </p>
        <p className="mt-4 text-sm text-zinc-600">
          Launch page, payments, and notifications can be managed here as this
          launch grows.
        </p>
      </div>
    </DashboardShell>
  );
}
