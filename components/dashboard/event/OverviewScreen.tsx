"use client";

import Link from "next/link";
import { useState } from "react";
import { LaunchReadinessCard } from "@/components/dashboard/event/LaunchReadinessCard";
import { PublishBar } from "@/components/dashboard/event/PublishBar";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import {
  getAlternateGapClose,
  getCampaignProgress,
  getGapSuggestions,
} from "@/lib/dashboard/campaign-progress";
import {
  getCampaignDisplayStatus,
} from "@/lib/dashboard/campaign-status";
import { formatMoney, getLaunchCommerce } from "@/lib/dashboard/commerce";
import { getLaunchReadiness } from "@/lib/dashboard/launch-readiness";

export function OverviewScreen() {
  const { activeCampaign, updateCampaign } = useCampaign();
  const status = getCampaignDisplayStatus(activeCampaign);
  const progress = getCampaignProgress(activeCampaign);
  const readiness = getLaunchReadiness(activeCampaign);

  if (status === "draft") {
    return (
      <div className="space-y-5">
        <LaunchReadinessCard percent={readiness.percent} items={readiness.items} />
        <PublishBar />
      </div>
    );
  }

  if (status === "greenlit") {
    return (
      <div className="space-y-5">
        <section className="rounded-2xl border border-pink-100 bg-white px-5 py-6 shadow-sm sm:px-7">
          <p className="text-sm font-bold tracking-[0.16em] text-pink-500">
            🎉 GREENLIT
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
            You made it happen.
          </h2>
          <p className="mt-4 text-2xl font-bold text-zinc-900">
            {formatMoney(progress.raised)} raised
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            {progress.people} participants · Goal{" "}
            {progress.goalType === "people"
              ? `${progress.goalValue} people`
              : formatMoney(progress.goalValue)}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full bg-[#FF4F9A] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Keep accepting participation
            </button>
            <button
              type="button"
              onClick={() => updateCampaign({ status: "ended" })}
              className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-700"
            >
              Close Launch
            </button>
          </div>
        </section>
        <FillPlan progress={progress} />
        <SalesBreakdown />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <CampaignProgressCard />
      <FillPlan progress={progress} />
      <GapCard />
      <SalesBreakdown />
    </div>
  );
}

function CampaignProgressCard() {
  const { activeCampaign } = useCampaign();
  const progress = getCampaignProgress(activeCampaign);
  const [copied, setCopied] = useState(false);
  const isPeople = progress.goalType === "people";

  function share() {
    const url = `${window.location.origin}/launch/${activeCampaign.slug}`;
    void navigator.clipboard?.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-white px-5 py-6 shadow-sm sm:px-7">
      <p className="text-[0.65rem] font-bold tracking-[0.16em] text-zinc-400">
        IS THIS PROJECT GOING TO HAPPEN?
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        {isPeople
          ? `${progress.people} / ${progress.goalValue} people`
          : `${formatMoney(progress.raised)} raised`}
      </h2>
      {!isPeople && (
        <p className="mt-1 text-sm text-zinc-500">
          of {formatMoney(progress.goalValue)} goal
        </p>
      )}
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full meuse-gradient-bg"
          style={{ width: `${Math.max(3, progress.percent)}%` }}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-zinc-600">
        <p>
          <span className="font-semibold text-zinc-900">{progress.percent}%</span>{" "}
          {isPeople ? "filled" : "funded"}
        </p>
        <p>
          <span className="font-semibold text-zinc-900">{progress.people}</span>{" "}
          participants
        </p>
        {!isPeople && (
          <p>
            <span className="font-semibold text-zinc-900">
              {formatMoney(progress.raised)}
            </span>{" "}
            committed
          </p>
        )}
        {isPeople && (
          <p>
            <span className="font-semibold text-zinc-900">
              {formatMoney(progress.raised)}
            </span>{" "}
            in sales
          </p>
        )}
        {progress.daysLeft !== null && progress.daysLeft >= 0 && (
          <p>
            <span className="font-semibold text-zinc-900">{progress.daysLeft}</span>{" "}
            days left
          </p>
        )}
      </div>
      {progress.remaining > 0 && (
        <p className="mt-4 text-lg font-bold text-zinc-900">
          {isPeople
            ? `${progress.remaining} to go`
            : `${formatMoney(progress.remaining)} to go`}
        </p>
      )}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={share}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-[#FF4F9A] px-5 py-3 text-sm font-semibold text-white"
        >
          {copied ? "Link copied" : "Share Launch"}
        </button>
        <Link
          href={`/launch/${activeCampaign.slug}`}
          className="inline-flex flex-1 items-center justify-center rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700"
        >
          View Public Page
        </Link>
      </div>
    </section>
  );
}

function FillPlan({
  progress,
}: {
  progress: ReturnType<typeof getCampaignProgress>;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-white px-5 py-5 shadow-sm sm:px-6">
      <h2 className="text-base font-semibold text-zinc-900">What needs to fill</h2>
      <div className="mt-4 space-y-4">
        {progress.offers.map((offer) => {
          const percent =
            offer.capacity && offer.capacity > 0
              ? Math.min(100, Math.round((offer.sold / offer.capacity) * 100))
              : offer.sold > 0
                ? 40
                : 0;
          return (
            <div key={offer.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-zinc-900">{offer.title}</p>
                  <p className="text-sm text-zinc-500">
                    {offer.capacity
                      ? `${offer.sold} / ${offer.capacity} sold`
                      : `${offer.sold} sold`}{" "}
                    · {formatMoney(offer.price)} each
                  </p>
                </div>
                <p className="text-sm font-semibold text-pink-600">
                  {offer.remaining === null
                    ? "Open"
                    : offer.remaining === 0
                      ? "Sold out"
                      : `${offer.remaining} left`}
                </p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full meuse-gradient-bg"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function GapCard() {
  const { activeCampaign } = useCampaign();
  const progress = getCampaignProgress(activeCampaign);
  if (progress.remaining <= 0) return null;
  const suggestions = getGapSuggestions(progress);
  const alternate = getAlternateGapClose(progress);
  const isPeople = progress.goalType === "people";

  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-white px-5 py-5 shadow-sm sm:px-6">
      <p className="text-sm font-medium text-zinc-500">Still needed</p>
      <p className="mt-1 text-3xl font-bold text-zinc-900">
        {isPeople
          ? `${progress.remaining} people`
          : formatMoney(progress.remaining)}
      </p>
      {suggestions.length > 0 && (
        <div className="mt-3">
          <p className="text-sm text-zinc-500">To reach your goal:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
            {suggestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {alternate && (
        <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-zinc-700">
          ✨ Another way to close the gap: sell {alternate}
        </p>
      )}
    </section>
  );
}

function SalesBreakdown() {
  const { activeCampaign } = useCampaign();
  const commerce = getLaunchCommerce(activeCampaign);
  const rows = [...commerce.participationLines, ...commerce.sponsorshipLines];

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
      <div className="px-5 py-4">
        <h2 className="text-base font-semibold text-zinc-900">
          Sales by Participation
        </h2>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="border-y border-zinc-100 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
          <tr>
            <th className="px-5 py-2 font-semibold">Participation</th>
            <th className="px-5 py-2 text-right font-semibold">Sold</th>
            <th className="px-5 py-2 text-right font-semibold">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-zinc-50 last:border-0">
              <td className="px-5 py-3 text-zinc-800">{row.title}</td>
              <td className="px-5 py-3 text-right tabular-nums text-zinc-700">
                {row.sold}
              </td>
              <td className="px-5 py-3 text-right tabular-nums font-medium text-zinc-900">
                {formatMoney(row.revenue)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

