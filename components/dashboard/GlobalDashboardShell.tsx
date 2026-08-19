"use client";

import { GlobalTopNav } from "@/components/dashboard/GlobalTopNav";

export function GlobalDashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#fffafb]">
      <GlobalTopNav />
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
