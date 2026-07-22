"use client";

import { useMemo } from "react";
import {
  DashboardDataTable,
  DashboardTableBody,
  DashboardTableCell,
  DashboardTableHead,
  DashboardTableHeaderCell,
  DashboardTableRow,
} from "@/components/dashboard/DashboardDataTable";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { paymentStatusBadge } from "@/components/dashboard/DashboardStatusBadge";
import {
  formatCurrency,
  formatPurchasedAt,
  getDemoOrders,
} from "@/lib/dashboard/mock-data";

export function OrdersScreen() {
  const orders = useMemo(() => getDemoOrders(), []);

  return (
    <DashboardShell
      title="Orders"
      subtitle="View payments and purchase history."
    >
      <div className="px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <DashboardDataTable>
          <DashboardTableHead>
            <DashboardTableHeaderCell>Order ID</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Customer</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Product</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Amount</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Payment Status</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Purchased At</DashboardTableHeaderCell>
          </DashboardTableHead>
          <DashboardTableBody>
            {orders.map((order) => (
              <DashboardTableRow key={order.id}>
                <DashboardTableCell className="font-mono text-xs text-zinc-600">
                  {order.id}
                </DashboardTableCell>
                <DashboardTableCell>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-zinc-900">
                      {order.customerName}
                    </p>
                    <p className="truncate text-xs text-zinc-500">
                      {order.customerEmail}
                    </p>
                  </div>
                </DashboardTableCell>
                <DashboardTableCell className="text-zinc-700">
                  {order.productName}
                </DashboardTableCell>
                <DashboardTableCell className="font-medium text-zinc-900">
                  {formatCurrency(order.amount)}
                </DashboardTableCell>
                <DashboardTableCell>
                  {paymentStatusBadge(order.paymentStatus)}
                </DashboardTableCell>
                <DashboardTableCell className="text-zinc-600">
                  {formatPurchasedAt(order.purchasedAt)}
                </DashboardTableCell>
              </DashboardTableRow>
            ))}
          </DashboardTableBody>
        </DashboardDataTable>
      </div>
    </DashboardShell>
  );
}
