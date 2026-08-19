"use client";

import { LaunchDashboardShell } from "@/components/dashboard/LaunchDashboardShell";

export default function MessagesPage() {
  return (
    <LaunchDashboardShell>
      <div className="rounded-2xl border border-zinc-200/80 bg-white px-5 py-12 text-center shadow-sm">
        <h1 className="text-lg font-bold text-zinc-900">Messages</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Conversations with participants and partners will live here.
        </p>
      </div>
    </LaunchDashboardShell>
  );
}
