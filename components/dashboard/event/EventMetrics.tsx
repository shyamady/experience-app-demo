import type { LaunchData } from "@/lib/launch/types";
import { formatCurrency } from "@/lib/dashboard/mock-data";

type EventMetricsProps = {
  campaign: LaunchData;
};

export function EventMetrics({ campaign }: EventMetricsProps) {
  const metrics = [
    { label: "Revenue", value: formatCurrency(campaign.revenueRaised) },
    { label: "Tickets sold", value: String(campaign.registrationCount) },
    { label: "Orders", value: String(campaign.registrationCount) },
  ];

  return (
    <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className={`px-4 py-4 sm:px-6 ${
            index > 0 ? "border-l border-zinc-100" : ""
          }`}
        >
          <p className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
            {metric.label}
          </p>
          <p className="mt-1 text-lg font-bold text-zinc-900 sm:text-xl">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}
