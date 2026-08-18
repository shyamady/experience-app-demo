"use client";

import { useState } from "react";
import Link from "next/link";
import { CampaignSwitcher } from "@/components/dashboard/CampaignSwitcher";
import { DashboardMenuDrawer } from "@/components/dashboard/DashboardMenuDrawer";
import { DashboardMobileNav } from "@/components/dashboard/DashboardMobileNav";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

type DashboardShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: "event" | "workspace" | "launch";
};

export function DashboardShell({
  children,
  title,
  subtitle,
  variant = "launch",
}: DashboardShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isWorkspace = variant === "workspace";

  return (
    <div className="min-h-dvh bg-[#fffafb]">
      <div className="flex min-h-dvh">
        {!isWorkspace && (
          <div className="sticky top-0 hidden h-dvh md:flex">
            <DashboardSidebar />
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-pink-50 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              {!isWorkspace && (
                <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open menu"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-pink-100 text-zinc-600 md:hidden"
                >
                  <MenuIcon />
                </button>
              )}
              {isWorkspace ? (
                <Link
                  href="/dashboard"
                  className="font-meuse-display text-xl font-extrabold tracking-tight meuse-gradient-text"
                >
                  meuse
                </Link>
              ) : (
                <div className="min-w-0 md:hidden">
                  <CampaignSwitcher />
                </div>
              )}
              {(title || subtitle) && (
                <div className="hidden min-w-0 md:block">
                  {title && (
                    <h1 className="truncate text-base font-semibold text-zinc-900">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="truncate text-xs text-zinc-500">{subtitle}</p>
                  )}
                </div>
              )}
            </div>
            {isWorkspace && (
              <div className="flex items-center gap-3">
                <CampaignSwitcher />
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-zinc-500 hover:text-zinc-800"
                >
                  Back to launch
                </Link>
              </div>
            )}
          </header>

          <main
            className={
              isWorkspace
                ? "flex-1"
                : "mx-auto w-full max-w-xl flex-1 px-4 py-5 pb-24 sm:px-6 md:pb-10"
            }
          >
            {children}
          </main>
        </div>
      </div>

      {!isWorkspace && (
        <>
          <DashboardMobileNav />
          <DashboardMenuDrawer
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          />
        </>
      )}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
