"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardNavIcon } from "@/components/dashboard/DashboardNavIcon";
import { resolveNavHref } from "@/components/dashboard/DashboardSidebar";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import {
  DASHBOARD_NAV_GROUPS,
  isDashboardNavActive,
} from "@/lib/dashboard/nav";

type DashboardMenuDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function DashboardMenuDrawer({ open, onClose }: DashboardMenuDrawerProps) {
  const pathname = usePathname();
  const { activeCampaign } = useCampaign();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-zinc-900/30"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-pink-50 px-4 py-4">
          <span className="font-meuse-display text-xl font-extrabold meuse-gradient-text">
            meuse
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-zinc-500"
          >
            Close
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {DASHBOARD_NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="px-2 pb-1.5 text-[0.625rem] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const href = resolveNavHref(item, activeCampaign.slug);
                  const active = isDashboardNavActive(
                    pathname,
                    item.href === "/dashboard/launch-page" ? href : item.href,
                  );
                  return (
                    <Link
                      key={item.label}
                      href={href}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                        active
                          ? "bg-rose-50 text-pink-700"
                          : "text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      <DashboardNavIcon name={item.icon} className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
