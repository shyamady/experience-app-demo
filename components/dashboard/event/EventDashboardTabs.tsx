"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EVENT_MORE_LINKS, EVENT_TABS } from "@/lib/dashboard/event-tabs";

export function EventDashboardTabs() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="relative border-b border-zinc-200">
      <nav className="-mb-px flex items-center gap-1 overflow-x-auto">
        {EVENT_TABS.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/dashboard" && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`shrink-0 border-b-2 px-3 py-3 text-sm transition ${
                isActive
                  ? "border-[#FF4F9A] font-semibold text-zinc-900"
                  : "border-transparent text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMoreOpen((open) => !open)}
            className="flex items-center gap-1 border-b-2 border-transparent px-3 py-3 text-sm text-zinc-500 transition hover:text-zinc-800"
          >
            More
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {moreOpen && (
            <div className="absolute top-full right-0 z-20 mt-1 w-48 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
              {EVENT_MORE_LINKS.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className="block px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
