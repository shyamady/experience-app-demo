"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardNavIcon } from "@/components/dashboard/DashboardNavIcon";
import { isDashboardNavActive, MOBILE_TAB_ITEMS } from "@/lib/dashboard/nav";

export function DashboardMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-pink-100 bg-white/95 px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3">
        {MOBILE_TAB_ITEMS.map((item) => {
          const active = isDashboardNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-[0.6875rem] font-semibold ${
                active ? "text-pink-600" : "text-zinc-400"
              }`}
            >
              <DashboardNavIcon name={item.icon} className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
