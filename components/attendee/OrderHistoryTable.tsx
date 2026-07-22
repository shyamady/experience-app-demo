import type { AttendeeOrder } from "@/lib/attendee/types";
import { formatAttendeeCurrency } from "@/lib/attendee/formatting";

type OrderHistoryTableProps = {
  orders: AttendeeOrder[];
};

export function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
  return (
    <div className="overflow-hidden rounded-meuse border border-pink-100 bg-white shadow-meuse-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-pink-50">
          <thead className="bg-zinc-50/80">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                Experience
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500 sm:table-cell">
                Package
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                Amount
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500 md:table-cell">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-zinc-50/60">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-600">
                  {order.id}
                </td>
                <td className="max-w-[10rem] truncate px-4 py-3 text-sm text-zinc-800 sm:max-w-xs">
                  {order.experience}
                </td>
                <td className="hidden whitespace-nowrap px-4 py-3 text-sm text-zinc-600 sm:table-cell">
                  {order.packageName}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-900">
                  {formatAttendeeCurrency(order.amount)}
                </td>
                <td className="hidden whitespace-nowrap px-4 py-3 text-sm text-zinc-500 md:table-cell">
                  {order.purchaseDate}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: AttendeeOrder["status"];
}) {
  const styles =
    status === "confirmed"
      ? "bg-emerald-50 text-emerald-700"
      : status === "pending"
        ? "bg-amber-50 text-amber-700"
        : "bg-zinc-100 text-zinc-600";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
