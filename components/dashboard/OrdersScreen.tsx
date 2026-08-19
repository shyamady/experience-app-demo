"use client";

import { useMemo, useState } from "react";
import {
  DashboardDataTable,
  DashboardTableBody,
  DashboardTableCell,
  DashboardTableHead,
  DashboardTableHeaderCell,
  DashboardTableRow,
} from "@/components/dashboard/DashboardDataTable";
import { DashboardSearchInput } from "@/components/dashboard/DashboardSearchInput";
import { LaunchDashboardShell } from "@/components/dashboard/LaunchDashboardShell";
import { paymentStatusBadge } from "@/components/dashboard/DashboardStatusBadge";
import {
  formatCurrency,
  formatPurchasedAt,
  getDemoOrders,
} from "@/lib/dashboard/mock-data";
import type { PaymentStatus } from "@/lib/dashboard/types";

const FILTERS: { id: "all" | PaymentStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "paid", label: "Paid" },
  { id: "pending", label: "Pending" },
  { id: "refunded", label: "Refunded" },
];

export function OrdersScreen() {
  const orders = useMemo(() => getDemoOrders(), []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      if (filter !== "all" && order.paymentStatus !== filter) return false;
      if (!query) return true;
      return (
        order.customerName.toLowerCase().includes(query) ||
        order.customerEmail.toLowerCase().includes(query) ||
        order.productName.toLowerCase().includes(query)
      );
    });
  }, [filter, orders, search]);

  return (
    <LaunchDashboardShell>
      <div className="py-1">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">Orders</h2>
          <DashboardSearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search orders"
          />
        </div>
        <div className="mb-4 flex gap-2 overflow-x-auto">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                filter === item.id
                  ? "bg-zinc-900 text-white"
                  : "bg-white text-zinc-600 ring-1 ring-zinc-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <DashboardDataTable>
          <DashboardTableHead>
            <DashboardTableHeaderCell>Buyer</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Participation</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Amount</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Date</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Payment</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Refund</DashboardTableHeaderCell>
          </DashboardTableHead>
          <DashboardTableBody>
            {filtered.map((order) => (
              <DashboardTableRow key={order.id}>
                <DashboardTableCell>
                  <p className="font-medium text-zinc-900">{order.customerName}</p>
                  <p className="text-xs text-zinc-500">{order.customerEmail}</p>
                </DashboardTableCell>
                <DashboardTableCell className="text-zinc-700">
                  {order.productName}
                </DashboardTableCell>
                <DashboardTableCell className="font-medium text-zinc-900">
                  {formatCurrency(order.amount)}
                </DashboardTableCell>
                <DashboardTableCell className="text-zinc-600">
                  {formatPurchasedAt(order.purchasedAt)}
                </DashboardTableCell>
                <DashboardTableCell>
                  {paymentStatusBadge(order.paymentStatus)}
                </DashboardTableCell>
                <DashboardTableCell className="text-zinc-600">
                  {order.paymentStatus === "refunded" ? "Refunded" : "—"}
                </DashboardTableCell>
              </DashboardTableRow>
            ))}
          </DashboardTableBody>
        </DashboardDataTable>
      </div>
    </LaunchDashboardShell>
  );
}
