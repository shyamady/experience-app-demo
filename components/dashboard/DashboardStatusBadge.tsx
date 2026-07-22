type DashboardStatusBadgeProps = {
  label: string;
  tone: "green" | "amber" | "red" | "zinc" | "blue";
};

const TONE_STYLES: Record<DashboardStatusBadgeProps["tone"], string> = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  red: "bg-rose-50 text-rose-700 ring-rose-600/20",
  zinc: "bg-zinc-100 text-zinc-600 ring-zinc-500/10",
  blue: "bg-sky-50 text-sky-700 ring-sky-600/20",
};

export function DashboardStatusBadge({ label, tone }: DashboardStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${TONE_STYLES[tone]}`}
    >
      {label}
    </span>
  );
}

export function attendeeStatusBadge(status: "confirmed" | "pending" | "cancelled") {
  switch (status) {
    case "confirmed":
      return <DashboardStatusBadge label="Confirmed" tone="green" />;
    case "pending":
      return <DashboardStatusBadge label="Pending" tone="amber" />;
    case "cancelled":
      return <DashboardStatusBadge label="Cancelled" tone="red" />;
  }
}

export function paymentStatusBadge(status: "paid" | "refunded" | "pending") {
  switch (status) {
    case "paid":
      return <DashboardStatusBadge label="Paid" tone="green" />;
    case "refunded":
      return <DashboardStatusBadge label="Refunded" tone="zinc" />;
    case "pending":
      return <DashboardStatusBadge label="Pending" tone="amber" />;
  }
}
