"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function MessagesPage() {
  return (
    <DashboardShell>
      <div className="rounded-[1.75rem] bg-white px-5 py-12 text-center shadow-meuse-card">
        <h1 className="text-lg font-bold text-zinc-900">Messages</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Conversations with participants and partners will live here.
        </p>
      </div>
    </DashboardShell>
  );
}
