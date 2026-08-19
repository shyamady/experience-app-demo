"use client";

import { EventDashboardHeader } from "@/components/dashboard/event/EventDashboardHeader";
import { EventDashboardTabs } from "@/components/dashboard/event/EventDashboardTabs";
import { GlobalTopNav } from "@/components/dashboard/GlobalTopNav";

export function LaunchDashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#fffafb]">
      <GlobalTopNav />
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
        <EventDashboardHeader />
        <div className="mt-4">
          <EventDashboardTabs />
        </div>
        <div className="mt-6 pb-12">{children}</div>
      </div>
    </div>
  );
}
