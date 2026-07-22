"use client";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { useState } from "react";

type DashboardShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
};

export function DashboardShell({
  children,
  title,
  subtitle,
}: DashboardShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-white">
        <div className="hidden md:flex">
          <DashboardSidebar />
        </div>

        {drawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/30"
              onClick={() => setDrawerOpen(false)}
            />
            <div className="relative h-full w-56 animate-[slideIn_0.2s_ease-out] bg-white shadow-xl">
              <DashboardSidebar onNavigate={() => setDrawerOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopbar
            title={title}
            subtitle={subtitle}
            onMenuClick={() => setDrawerOpen(true)}
          />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
    </div>
  );
}
