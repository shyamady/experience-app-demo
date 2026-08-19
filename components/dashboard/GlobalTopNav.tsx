"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GLOBAL_NAV_ITEMS, isGlobalNavActive } from "@/lib/dashboard/global-nav";
import { getCreatorInitials } from "@/lib/dashboard/launch-readiness";
import { useCampaign } from "@/lib/dashboard/campaign-context";

export function GlobalTopNav() {
  const pathname = usePathname();
  const { activeCampaign } = useCampaign();
  const initials = getCreatorInitials(activeCampaign.creatorName || "Creator");

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-6">
          <Link
            href="/dashboard"
            className="font-meuse-display text-xl font-extrabold tracking-tight meuse-gradient-text"
          >
            meuse
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {GLOBAL_NAV_ITEMS.map((item) => {
              const active = isGlobalNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-sm transition ${
                    active
                      ? "font-semibold text-zinc-900"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF4F9A] text-xs font-bold text-white"
          aria-hidden
        >
          {initials}
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-4 pb-2 sm:hidden">
        {GLOBAL_NAV_ITEMS.map((item) => {
          const active = isGlobalNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-full px-3 py-1 text-sm ${
                active ? "bg-rose-50 font-semibold text-pink-600" : "text-zinc-500"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
