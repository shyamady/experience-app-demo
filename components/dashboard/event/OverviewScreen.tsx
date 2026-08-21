"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { LaunchReadinessCard } from "@/components/dashboard/event/LaunchReadinessCard";
import { PublishBar } from "@/components/dashboard/event/PublishBar";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import {
  formatViabilityMix,
  getCampaignProgress,
  getFeaturedParticipation,
  getOverviewNextActions,
  getViabilityMix,
  type CampaignProgress,
  type OfferFill,
} from "@/lib/dashboard/campaign-progress";
import { getCampaignDisplayStatus } from "@/lib/dashboard/campaign-status";
import {
  formatMoney,
  getLaunchCommerce,
} from "@/lib/dashboard/commerce";
import { formatPurchasedAt } from "@/lib/dashboard/mock-data";
import { getLaunchReadiness } from "@/lib/dashboard/launch-readiness";
import type { Order } from "@/lib/dashboard/types";

const PAGE_VIEWS = 1840;
const FEATURED_OFFER_COUNT = 4;

export function OverviewScreen() {
  const { activeCampaign } = useCampaign();
  const status = getCampaignDisplayStatus(activeCampaign);
  const progress = getCampaignProgress(activeCampaign);
  const readiness = getLaunchReadiness(activeCampaign);
  const commerce = getLaunchCommerce(activeCampaign);

  if (status === "draft") {
    return (
      <div className="space-y-5">
        <LaunchReadinessCard percent={readiness.percent} items={readiness.items} />
        <PublishBar />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {status === "greenlit" && (
        <p className="text-sm font-semibold tracking-wide text-pink-500">
          🎉 This project is viable — keep the momentum going.
        </p>
      )}
      <ProjectStatusHeader progress={progress} />
      <NextActionsCard progress={progress} />
      <PathToViabilityCard progress={progress} />
      <ParticipationPerformance progress={progress} />
      <ProjectActivity
        progress={progress}
        orders={commerce.recentOrders}
        views={PAGE_VIEWS}
      />
    </div>
  );
}

function ProjectStatusHeader({ progress }: { progress: CampaignProgress }) {
  const { activeCampaign } = useCampaign();
  const [copied, setCopied] = useState(false);
  const liveOffers = progress.participationOffers.filter((offer) => offer.sold > 0)
    .length;
  const offerCount = liveOffers || progress.participationOffers.length;

  function share() {
    const url = `${window.location.origin}/launch/${activeCampaign.slug}`;
    void navigator.clipboard?.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="rounded-[1.75rem] bg-white px-5 py-6 shadow-meuse-card sm:px-7 sm:py-7">
      <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
        PROJECT STATUS
      </p>
      <div className="mt-5 grid gap-6 sm:grid-cols-3">
        <Metric
          value={formatMoney(progress.revenue)}
          label="Revenue"
          hint="from participation"
        />
        <Metric
          value={String(progress.people)}
          label="Participants"
          hint={`across ${offerCount} ${offerCount === 1 ? "offer" : "offers"}`}
        />
        <Metric
          value={`${progress.viablePercent}%`}
          label="to Viable"
          hint={
            progress.toViable > 0
              ? progress.goalType === "people"
                ? `${progress.toViable} more to target`
                : `${formatMoney(progress.toViable)} more to target`
              : "Project target reached"
          }
        />
      </div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center justify-center rounded-full bg-[#FF4F9A] px-5 py-2.5 text-sm font-semibold text-white"
        >
          {copied ? "Link copied" : "Share Launch"}
        </button>
        <Link
          href={`/launch/${activeCampaign.slug}`}
          className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-700"
        >
          View Public Page
        </Link>
      </div>
    </section>
  );
}

function Metric({
  value,
  label,
  hint,
}: {
  value: string;
  label: string;
  hint: string;
}) {
  return (
    <div>
      <p className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        {value}
        <span className="ml-1.5 text-base font-semibold text-zinc-500 sm:text-lg">
          {label}
        </span>
      </p>
      <p className="mt-1 text-sm text-zinc-400">{hint}</p>
    </div>
  );
}

function NextActionsCard({ progress }: { progress: CampaignProgress }) {
  const actions = getOverviewNextActions(progress);
  if (actions.length === 0) return null;

  return (
    <section className="rounded-[1.75rem] border border-pink-100 bg-gradient-to-br from-rose-50 via-white to-white px-5 py-6 shadow-meuse-chip sm:px-7">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900">
          What should I do next?
        </h2>
        <SparkleIcon className="h-4 w-4 text-pink-400" />
      </div>
      <ul className="mt-4 space-y-3">
        {actions.map((action) => (
          <li
            key={action.id}
            className="flex flex-col gap-2 rounded-2xl bg-white/80 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="font-semibold text-zinc-900">{action.title}</p>
              <p className="mt-0.5 text-sm text-zinc-500">{action.detail}</p>
            </div>
            <Link
              href={action.href}
              className="shrink-0 text-sm font-semibold text-pink-500 hover:text-pink-600"
            >
              {action.cta}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PathToViabilityCard({ progress }: { progress: CampaignProgress }) {
  const mix = getViabilityMix(progress);
  const isPeople = progress.goalType === "people";
  const current = isPeople ? progress.people : progress.revenue;
  const potential = Math.max(
    isPeople
      ? progress.participationOffers.reduce(
          (sum, offer) => sum + (offer.capacity ?? offer.sold),
          0,
        )
      : progress.soldOutPotential,
    progress.goalValue,
    1,
  );
  const currentPct = Math.min(100, (current / potential) * 100);
  const viablePct = Math.min(100, (progress.goalValue / potential) * 100);
  const formatPoint = (value: number) =>
    isPeople ? value.toLocaleString() : formatMoney(value);

  return (
    <section
      id="path-to-viability"
      className="scroll-mt-20 rounded-[1.75rem] bg-white px-5 py-6 shadow-meuse-card sm:px-7 sm:py-7"
    >
      <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
        PATH TO VIABILITY
      </p>
      <h2 className="mt-1 text-xl font-bold tracking-tight text-zinc-900">
        Current → Viable → Potential
      </h2>

      <div className="mt-6">
        <div className="relative mx-3 h-10">
          <div className="absolute top-[1.125rem] right-0 left-0 h-[3px] rounded-full bg-zinc-100" />
          <div
            className="absolute top-[1.125rem] left-0 h-[3px] rounded-full bg-pink-200"
            style={{ width: `${viablePct}%` }}
          />
          <div
            className="absolute top-[1.125rem] left-0 h-[3px] rounded-full meuse-gradient-bg"
            style={{ width: `${Math.max(3, currentPct)}%` }}
          />
          <RangeDot left={Math.max(1, currentPct)} tone="current" />
          <RangeDot left={viablePct} tone="viable" />
          <RangeDot left={100} tone="potential" />
        </div>
        <div className="mt-1 flex justify-between gap-3 text-sm">
          <div>
            <p className="text-xs text-zinc-400">Current</p>
            <p className="font-bold text-zinc-900">{formatPoint(current)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-zinc-400">Viable</p>
            <p className="font-bold text-zinc-900">
              {formatPoint(progress.goalValue)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-400">Sold-out potential</p>
            <p className="font-bold text-zinc-900">{formatPoint(potential)}</p>
          </div>
        </div>
      </div>

      <p className="mt-5 text-lg font-bold text-zinc-900">
        {progress.toViable > 0
          ? isPeople
            ? `${progress.toViable} more participants to make this viable`
            : `${formatMoney(progress.toViable)} to make this project viable`
          : "This project is already viable"}
      </p>
      {mix.length > 0 && (
        <p className="mt-2 text-sm text-zinc-500">
          <span className="font-semibold text-zinc-700">One possible path: </span>
          {formatViabilityMix(mix)}
        </p>
      )}
    </section>
  );
}

function RangeDot({
  left,
  tone,
}: {
  left: number;
  tone: "current" | "viable" | "potential";
}) {
  const styles =
    tone === "current"
      ? "border-white bg-[#FF4F9A] shadow-sm"
      : tone === "viable"
        ? "border-pink-400 bg-white"
        : "border-zinc-200 bg-white";

  return (
    <span
      className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${styles}`}
      style={{ left: `${left}%` }}
    />
  );
}

function ParticipationPerformance({ progress }: { progress: CampaignProgress }) {
  const featured = getFeaturedParticipation(progress, FEATURED_OFFER_COUNT);

  return (
    <section className="rounded-[1.75rem] bg-white px-5 py-6 shadow-meuse-card sm:px-7 sm:py-7">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
            PARTICIPATION
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-zinc-900">
            What’s selling
          </h2>
        </div>
        <Link
          href="/dashboard/products"
          className="shrink-0 text-sm font-semibold text-pink-500"
        >
          View all participation →
        </Link>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {featured.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}

function OfferCard({ offer }: { offer: OfferFill }) {
  const percent =
    offer.capacity && offer.capacity > 0
      ? Math.min(100, Math.round((offer.sold / offer.capacity) * 100))
      : offer.sold > 0
        ? 40
        : 0;
  const scarce =
    offer.remaining !== null && offer.remaining > 0 && offer.remaining <= 3;

  return (
    <article className="rounded-2xl bg-rose-50/60 px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold text-zinc-900">{offer.title}</p>
          <p className="mt-0.5 text-sm text-zinc-500">
            {formatMoney(offer.price)}
          </p>
        </div>
        <p className="shrink-0 text-sm font-bold text-zinc-900">
          {formatMoney(offer.revenue)}
        </p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full meuse-gradient-bg"
          style={{ width: `${Math.max(4, percent)}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 text-xs">
        <p className="text-zinc-500">
          {offer.capacity
            ? `${offer.sold} / ${offer.capacity} sold`
            : `${offer.sold} sold`}
        </p>
        {offer.remaining === 0 ? (
          <p className="font-semibold text-zinc-400">Sold out</p>
        ) : scarce ? (
          <p className="font-semibold text-pink-500">
            {offer.remaining} {offer.remaining === 1 ? "spot" : "spots"} left
          </p>
        ) : null}
      </div>
    </article>
  );
}

function ProjectActivity({
  progress,
  orders,
  views,
}: {
  progress: CampaignProgress;
  orders: Order[];
  views: number;
}) {
  const paidOrders = orders.filter((order) => order.paymentStatus === "paid");
  const conversion =
    views > 0 ? Math.round((progress.people / views) * 1000) / 10 : 0;
  const mix = useMemo(() => {
    const selling = progress.participationOffers.filter((offer) => offer.revenue > 0);
    const total = selling.reduce((sum, offer) => sum + offer.revenue, 0) || 1;
    return selling.slice(0, 4).map((offer) => ({
      title: offer.title,
      percent: Math.round((offer.revenue / total) * 100),
    }));
  }, [progress.participationOffers]);
  const spark = useMemo(() => weeklySpark(paidOrders, progress.revenue), [paidOrders, progress.revenue]);

  return (
    <section className="rounded-[1.75rem] bg-white px-5 py-6 shadow-meuse-card sm:px-7">
      <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
        ACTIVITY
      </p>
      <h2 className="mt-1 text-xl font-bold tracking-tight text-zinc-900">
        Recent momentum
      </h2>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Recent purchases
          </p>
          {paidOrders.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-500">No purchases yet.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {paidOrders.slice(0, 4).map((order) => (
                <li key={order.id} className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-800">
                      {order.customerName}
                    </p>
                    <p className="truncate text-xs text-zinc-400">
                      {order.productName} · {formatPurchasedAt(order.purchasedAt)}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-zinc-900">
                    {formatMoney(order.amount)}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/dashboard/orders"
            className="mt-3 inline-block text-sm font-semibold text-pink-500"
          >
            View orders →
          </Link>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
              Revenue over time
            </p>
            <div className="mt-3 flex h-16 items-end gap-1.5">
              {spark.map((value, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-md bg-pink-200"
                  style={{ height: `${Math.max(12, value)}%` }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                Page views → purchases
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                <span className="font-bold text-zinc-900">{views.toLocaleString()}</span>{" "}
                views ·{" "}
                <span className="font-bold text-zinc-900">{progress.people}</span>{" "}
                joined
              </p>
            </div>
            <p className="text-lg font-bold text-pink-500">{conversion}%</p>
          </div>
          {mix.length > 0 && (
            <div>
              <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                Participation mix
              </p>
              <div className="mt-2 flex h-2 overflow-hidden rounded-full">
                {mix.map((item, index) => (
                  <div
                    key={item.title}
                    className="h-full"
                    style={{
                      width: `${Math.max(6, item.percent)}%`,
                      backgroundColor: MIX_COLORS[index % MIX_COLORS.length],
                    }}
                  />
                ))}
              </div>
              <p className="mt-2 truncate text-xs text-zinc-400">
                {mix.map((item) => item.title).join(" · ")}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const MIX_COLORS = ["#FF4F9A", "#F9A8D4", "#FB7185", "#F472B6"];

function weeklySpark(orders: Order[], fallbackTotal: number): number[] {
  if (orders.length === 0) {
    const base = [18, 28, 22, 40, 36, 52, 48];
    return base.map((value) => Math.round((value / 52) * 100));
  }
  const buckets = [0, 0, 0, 0, 0, 0, 0];
  for (const order of orders) {
    const day = new Date(order.purchasedAt).getDay();
    buckets[day] += order.amount;
  }
  const max = Math.max(...buckets, fallbackTotal / 7, 1);
  return buckets.map((value) => Math.round((value / max) * 100));
}