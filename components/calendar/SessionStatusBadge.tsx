import type { SessionStatus } from "@/lib/dashboard/calendar-types";
import { DashboardStatusBadge } from "@/components/dashboard/DashboardStatusBadge";

const STATUS_CONFIG: Record<
  SessionStatus,
  { label: string; tone: "green" | "amber" | "red" | "zinc" | "blue" }
> = {
  draft: { label: "Draft", tone: "zinc" },
  published: { label: "Published", tone: "blue" },
  "selling-fast": { label: "Selling Fast", tone: "amber" },
  "sold-out": { label: "Sold Out", tone: "red" },
  completed: { label: "Completed", tone: "green" },
  cancelled: { label: "Cancelled", tone: "zinc" },
};

export function SessionStatusBadge({ status }: { status: SessionStatus }) {
  const config = STATUS_CONFIG[status];
  return <DashboardStatusBadge label={config.label} tone={config.tone} />;
}
