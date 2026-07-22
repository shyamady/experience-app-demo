"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CampaignSwitcher } from "@/components/dashboard/CampaignSwitcher";
import { DashboardNavIcon } from "@/components/dashboard/DashboardNavIcon";
import { DASHBOARD_NAV_ITEMS } from "@/lib/dashboard/nav";

type DashboardSidebarProps = {
  onNavigate?: () => void;
};

export function DashboardSidebar({ onNavigate }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-pink-100 bg-white">
      <div className="border-b border-pink-50 px-3 py-4">
        <Link
          href="/dashboard/products"
          onClick={onNavigate}
          className="mb-3 block px-1 font-meuse-display text-xl font-extrabold tracking-tight meuse-gradient-text"
        >
          meuse
        </Link>
        <CampaignSwitcher />
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-4">
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[0.8125rem] font-medium transition-colors ${
                isActive
                  ? "bg-rose-50 text-pink-700"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              <DashboardNavIcon name={item.icon} className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
