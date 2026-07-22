"use client";

import { useState } from "react";
import { AttendeeHeader } from "@/components/attendee/AttendeeHeader";
import { AttendeeNavigation } from "@/components/attendee/AttendeeNavigation";
import { getMockAttendeeProfile } from "@/lib/attendee/mock-data";

type AttendeeShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showWelcome?: boolean;
  hideHeader?: boolean;
};

export function AttendeeShell({
  children,
  title,
  subtitle,
  showWelcome = false,
  hideHeader = false,
}: AttendeeShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const profile = getMockAttendeeProfile();

  return (
    <div className="min-h-dvh bg-gradient-to-b from-meuse-bubble via-white to-white">
      <div className="flex w-full">
        <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 border-r border-pink-100 bg-white/80 backdrop-blur-sm md:block">
          <div className="border-b border-pink-50 px-4 py-5">
            <span className="font-meuse-display text-xl font-extrabold tracking-tight meuse-gradient-text">
              meuse
            </span>
            <p className="mt-1 text-xs text-zinc-500">Your experiences</p>
          </div>
          <AttendeeNavigation />
        </aside>

        {drawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/30"
              onClick={() => setDrawerOpen(false)}
            />
            <div className="relative h-full w-64 bg-white shadow-xl">
              <div className="border-b border-pink-50 px-4 py-5">
                <span className="font-meuse-display text-xl font-extrabold meuse-gradient-text">
                  meuse
                </span>
              </div>
              <AttendeeNavigation onNavigate={() => setDrawerOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col pb-20 md:pb-0">
          {!hideHeader && (
            <div>
              <div className="flex items-center justify-between border-b border-pink-50 px-4 py-3 md:hidden">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Open menu"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-pink-100 text-zinc-600"
                >
                  <MenuIcon />
                </button>
                <span className="font-meuse-display text-lg font-extrabold meuse-gradient-text">
                  meuse
                </span>
                <div className="w-9" />
              </div>
              <AttendeeHeader
                profile={profile}
                title={title}
                subtitle={subtitle}
                showWelcome={showWelcome}
              />
            </div>
          )}
          <main className="flex-1">{children}</main>
        </div>
      </div>

      <AttendeeNavigation variant="bottom" />
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
