import type { LaunchData } from "@/lib/launch/types";
import {
  formatEventDate,
  getCapacityLabel,
  getEventLocationLabel,
} from "@/lib/dashboard/launch-readiness";

type EventQuickStatsProps = {
  campaign: LaunchData;
};

export function EventQuickStats({ campaign }: EventQuickStatsProps) {
  const stats = [
    {
      label: "Date",
      value: formatEventDate(campaign.firstDate),
      iconBg: "bg-sky-50 text-sky-600",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      label: "Location",
      value: getEventLocationLabel(campaign),
      iconBg: "bg-emerald-50 text-emerald-600",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.2" />
        </svg>
      ),
    },
    {
      label: "Capacity",
      value: getCapacityLabel(campaign),
      iconBg: "bg-orange-50 text-orange-600",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      ),
    },
    {
      label: "Currency",
      value: "USD",
      iconBg: "bg-pink-50 text-[#FF4F9A]",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 py-3.5 shadow-sm"
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
          >
            {stat.icon}
          </span>
          <div className="min-w-0">
            <p className="text-xs text-zinc-400">{stat.label}</p>
            <p className="truncate text-sm font-semibold text-zinc-900">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
