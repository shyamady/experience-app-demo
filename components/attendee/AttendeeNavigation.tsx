"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AttendeeNavIcon } from "@/components/attendee/AttendeeNavIcon";
import { ATTENDEE_NAV_ITEMS } from "@/lib/attendee/nav";

type AttendeeNavigationProps = {
  variant?: "sidebar" | "bottom";
  onNavigate?: () => void;
};

export function AttendeeNavigation({
  variant = "sidebar",
  onNavigate,
}: AttendeeNavigationProps) {
  const pathname = usePathname();

  if (variant === "bottom") {
    return (
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-pink-100 bg-white/95 backdrop-blur-sm md:hidden">
        <div className="grid grid-cols-5 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1">
          {ATTENDEE_NAV_ITEMS.map((item) => {
            const isActive = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex flex-col items-center gap-1 rounded-lg px-1 py-2 text-[0.625rem] font-medium ${
                  isActive ? "text-pink-600" : "text-zinc-500"
                }`}
              >
                <AttendeeNavIcon name={item.icon} className="h-5 w-5" />
                <span className="truncate">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav className="space-y-1 px-3 py-4">
      {ATTENDEE_NAV_ITEMS.map((item) => {
        const isActive = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-rose-50 text-pink-700"
                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
          >
            <AttendeeNavIcon name={item.icon} className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/attendee") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
