"use client";

import { CampaignSwitcher } from "@/components/dashboard/CampaignSwitcher";

type DashboardTopbarProps = {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
};

export function DashboardTopbar({
  title,
  subtitle,
  onMenuClick,
}: DashboardTopbarProps) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-pink-50 bg-white px-4 py-3.5 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-pink-100 text-zinc-600 md:hidden"
        >
          <MenuIcon className="h-4 w-4" />
        </button>

        <div className="min-w-0 md:hidden">
          <CampaignSwitcher />
        </div>

        <div className="hidden min-w-0 md:block">
          {title && (
            <h1 className="truncate text-base font-semibold text-zinc-900 sm:text-lg">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-0.5 truncate text-xs text-zinc-500 sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-pink-100 bg-zinc-50 px-3 py-2 sm:flex">
          <SearchIcon className="h-4 w-4 text-zinc-400" />
          <span className="text-sm text-zinc-400">Search</span>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-pink-100 bg-white text-zinc-500 hover:bg-zinc-50"
        >
          <BellIcon className="h-4 w-4" />
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop"
          alt=""
          className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-meuse-chip"
        />
      </div>
    </header>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
