"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CampaignSwitcher } from "@/components/dashboard/CampaignSwitcher";
import { DashboardNavIcon } from "@/components/dashboard/DashboardNavIcon";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import {
  DASHBOARD_NAV_GROUPS,
  isDashboardNavActive,
  type DashboardNavItem,
} from "@/lib/dashboard/nav";

type DashboardSidebarProps = {
  onNavigate?: () => void;
};

export function DashboardSidebar({ onNavigate }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { activeCampaign } = useCampaign();

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-pink-100 bg-white">
      <div className="border-b border-pink-50 px-3 py-4">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="mb-3 block px-1 font-meuse-display text-xl font-extrabold tracking-tight meuse-gradient-text"
        >
          meuse
        </Link>
        <CampaignSwitcher />
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-2 py-4">
        {DASHBOARD_NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-2.5 pb-1.5 text-[0.625rem] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <SidebarLink
                  key={item.label}
                  item={item}
                  href={resolveNavHref(item, activeCampaign.slug)}
                  active={isDashboardNavActive(
                    pathname,
                    item.href === "/dashboard/launch-page"
                      ? `/launch/${activeCampaign.slug}`
                      : item.href,
                  )}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export function resolveNavHref(item: DashboardNavItem, slug: string): string {
  if (item.href === "/dashboard/launch-page") return `/launch/${slug}`;
  return item.href;
}

function SidebarLink({
  item,
  href,
  active,
  onNavigate,
}: {
  item: DashboardNavItem;
  href: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[0.8125rem] font-medium transition-colors ${
        active
          ? "bg-rose-50 text-pink-700"
          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
      }`}
    >
      <DashboardNavIcon name={item.icon} className="h-4 w-4 shrink-0" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
