"use client";

import Link from "next/link";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import { formatCurrency, formatPurchasedAt } from "@/lib/dashboard/mock-data";
import { formatMoney, getLaunchCommerce } from "@/lib/dashboard/commerce";

export function SalesScreen() {
  const { activeCampaign } = useCampaign();
  const commerce = getLaunchCommerce(activeCampaign);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
          SALES
        </p>
        <p className="mt-1 text-3xl font-bold text-zinc-900">
          {formatMoney(commerce.total)}
        </p>
        <p className="text-sm text-zinc-500">Total sales</p>
      </div>

      <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card">
        <p className="text-[0.625rem] font-bold tracking-[0.14em] text-zinc-400">
          PARTICIPATION
        </p>
        <p className="mt-1 text-sm font-medium text-zinc-600">
          {formatMoney(commerce.participationRevenue)} · {commerce.participants}{" "}
          sold
        </p>
        <div className="mt-3 space-y-2">
          {commerce.participationLines.map((line) => (
            <div key={line.id} className="flex items-baseline justify-between gap-3">
              <p className="text-sm text-zinc-800">{line.title}</p>
              <p className="shrink-0 text-sm text-zinc-500">
                {line.sold} × {formatMoney(line.price)}
              </p>
            </div>
          ))}
        </div>
        <Link
          href="/dashboard/products"
          className="mt-4 inline-flex text-sm font-semibold text-pink-600"
        >
          Manage Offers →
        </Link>
      </section>

      <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card">
        <p className="text-[0.625rem] font-bold tracking-[0.14em] text-zinc-400">
          SPONSORSHIP
        </p>
        <p className="mt-1 text-sm font-medium text-zinc-600">
          {formatMoney(commerce.sponsorshipRevenue)} · {commerce.sponsors}{" "}
          sponsors
        </p>
        <div className="mt-3 space-y-2">
          {commerce.sponsorshipLines.map((line) => (
            <div key={line.id} className="flex items-baseline justify-between gap-3">
              <p className="text-sm text-zinc-800">{line.title}</p>
              <p className="shrink-0 text-sm text-zinc-500">
                {line.sold} × {formatMoney(line.price)}
              </p>
            </div>
          ))}
        </div>
        <Link
          href="/dashboard/sponsors"
          className="mt-4 inline-flex text-sm font-semibold text-pink-600"
        >
          Manage Sponsors →
        </Link>
      </section>

      <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card">
        <p className="text-[0.625rem] font-bold tracking-[0.14em] text-zinc-400">
          ORDERS
        </p>
        <div className="mt-3 space-y-3">
          {commerce.recentOrders.map((order) => (
            <div key={order.id} className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-zinc-900">
                  {order.customerName}
                </p>
                <p className="text-xs text-zinc-500">{order.productName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-zinc-900">
                  {formatCurrency(order.amount)}
                </p>
                <p className="text-xs text-zinc-400">
                  {formatPurchasedAt(order.purchasedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/dashboard/orders"
          className="mt-4 inline-flex text-sm font-semibold text-pink-600"
        >
          View All Orders
        </Link>
      </section>
    </div>
  );
}
