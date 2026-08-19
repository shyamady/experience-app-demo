"use client";

import { LaunchDashboardShell } from "@/components/dashboard/LaunchDashboardShell";
import { useCampaign } from "@/lib/dashboard/campaign-context";

export default function SettingsPage() {
  const { activeCampaign } = useCampaign();

  return (
    <LaunchDashboardShell>
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
        <h1 className="text-lg font-bold text-zinc-900">Settings</h1>
        <p className="mt-2 text-sm text-zinc-500">
          {activeCampaign.title || activeCampaign.name}
        </p>
        <p className="mt-4 text-sm text-zinc-600">
          Launch page, payments, and notifications can be managed here as this
          launch grows.
        </p>
      </div>
    </LaunchDashboardShell>
  );
}
