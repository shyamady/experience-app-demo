"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import {
  formatEventDate,
  getEventLocationLabel,
} from "@/lib/dashboard/launch-readiness";
import {
  formatMoney,
  getDaysLeft,
  getLaunchCommerce,
  getPeopleGoal,
} from "@/lib/dashboard/commerce";
import {
  ACTIVE_CO_CREATE,
  NEW_IDEA_COUNT,
  getCommunityPosts,
  getVisibleFeed,
} from "@/lib/dashboard/community";
import { CommunityPostCard } from "@/components/community/CommunityPostCard";
import { SparkleIcon } from "@/components/icons/SparkleIcon";

export function LaunchHomeScreen() {
  const { activeCampaign } = useCampaign();
  const isLive = activeCampaign.status === "published";

  return isLive ? (
    <LiveLaunchHome />
  ) : (
    <DraftLaunchHome />
  );
}

function LiveLaunchHome() {
  const { activeCampaign } = useCampaign();
  const commerce = getLaunchCommerce(activeCampaign);
  const goal = getPeopleGoal(activeCampaign);
  const people = activeCampaign.registrationCount;
  const daysLeft = getDaysLeft(activeCampaign.firstDate);
  const posts = useMemo(
    () => getVisibleFeed(getCommunityPosts(activeCampaign.id)).slice(0, 2),
    [activeCampaign.id],
  );
  const progress = Math.min(100, Math.round((people / goal) * 100));

  return (
    <div className="space-y-5">
      <LaunchHeader live />

      <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card sm:p-6">
        <p className="text-[1.65rem] font-bold tracking-tight text-zinc-900 sm:text-3xl">
          {people} people are making this happen
        </p>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-pink-100">
          <div
            className="h-full rounded-full meuse-gradient-bg"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm font-medium text-zinc-500">
          {people} / {goal}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-zinc-600">
          <p>
            <span className="font-semibold text-zinc-900">
              {formatMoney(commerce.total)}
            </span>{" "}
            total sales
          </p>
          {daysLeft !== null && daysLeft >= 0 && (
            <p>
              <span className="font-semibold text-zinc-900">{daysLeft}</span>{" "}
              days left
            </p>
          )}
        </div>
        <ShareLaunchButton slug={activeCampaign.slug} />
      </section>

      <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card sm:p-6">
        <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
          CO-CREATE ✨
        </p>
        <h2 className="mt-1 text-lg font-bold text-zinc-900">
          What should we create together next?
        </h2>
        <div className="mt-4 rounded-2xl bg-rose-50/80 px-4 py-3">
          <p className="font-semibold text-zinc-900">{ACTIVE_CO_CREATE.title}</p>
          <p className="mt-1 text-sm text-zinc-500">
            {ACTIVE_CO_CREATE.votes} votes · {ACTIVE_CO_CREATE.comments} comments
          </p>
        </div>
        <p className="mt-3 text-sm text-zinc-600">
          {NEW_IDEA_COUNT} new ideas from members
        </p>
        <Link
          href="/dashboard/co-create"
          className="mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white meuse-gradient-bg shadow-lg shadow-pink-200/40"
        >
          Ask Everyone
        </Link>
      </section>

      <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card sm:p-6">
        <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
          COMMUNITY
        </p>
        <div className="mt-3 space-y-4">
          {posts.map((post) => (
            <CommunityPostCard key={post.id} post={post} compact />
          ))}
        </div>
        <Link
          href="/dashboard/community"
          className="mt-4 inline-flex text-sm font-semibold text-pink-600"
        >
          View Community →
        </Link>
      </section>

      <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card sm:p-6">
        <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
          SALES
        </p>
        <p className="mt-2 text-3xl font-bold text-zinc-900">
          {formatMoney(commerce.total)}
        </p>
        <p className="text-sm text-zinc-500">Total sales</p>
        <div className="mt-4 flex gap-6 text-sm">
          <p>
            <span className="font-semibold text-zinc-900">
              {commerce.participants}
            </span>{" "}
            Participants
          </p>
          <p>
            <span className="font-semibold text-zinc-900">
              {commerce.sponsors}
            </span>{" "}
            Sponsors
          </p>
        </div>
        <div className="mt-3 space-y-1 text-sm text-zinc-500">
          <p>Participation — {formatMoney(commerce.participationRevenue)}</p>
          <p>Sponsorship — {formatMoney(commerce.sponsorshipRevenue)}</p>
        </div>
        <Link
          href="/dashboard/sales"
          className="mt-4 inline-flex text-sm font-semibold text-pink-600"
        >
          Manage Sales →
        </Link>
      </section>
    </div>
  );
}

function DraftLaunchHome() {
  const { activeCampaign, publishCampaign } = useCampaign();
  const hasIdea = Boolean(
    activeCampaign.title.trim() && activeCampaign.description.trim(),
  );
  const hasOffers = activeCampaign.products.some((product) => product.active);
  const hasGoal =
    (activeCampaign.totalSpots !== "unlimited" && activeCampaign.totalSpots > 0) ||
    activeCampaign.fundingGoal > 0;

  return (
    <div className="space-y-5">
      <LaunchHeader live={false} />

      <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card">
        <p className="text-lg font-bold text-zinc-900">
          Your launch is almost ready.
        </p>
        <ul className="mt-4 space-y-2.5 text-sm">
          <ReadinessRow complete={hasIdea} label="Launch idea" />
          <ReadinessRow complete={hasOffers} label="Participation offers" />
          <ReadinessRow complete={hasGoal} label="Goal" />
        </ul>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link
            href={`/launch/${activeCampaign.slug}`}
            className="inline-flex items-center justify-center rounded-full border border-pink-100 px-4 py-3 text-sm font-semibold text-zinc-700"
          >
            Preview
          </Link>
          <button
            type="button"
            onClick={() => publishCampaign()}
            className="inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-white meuse-gradient-bg"
          >
            Launch →
          </button>
        </div>
      </section>
    </div>
  );
}

function LaunchHeader({ live }: { live: boolean }) {
  const { activeCampaign } = useCampaign();
  const location = getEventLocationLabel(activeCampaign);
  const date = formatEventDate(activeCampaign.firstDate);

  return (
    <section className="overflow-hidden rounded-[1.75rem] bg-white shadow-meuse-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={activeCampaign.coverImageUrl}
        alt=""
        className="h-36 w-full object-cover sm:h-40"
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
            {activeCampaign.title || activeCampaign.name}
          </h1>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.12em] ${
              live
                ? "bg-emerald-50 text-emerald-700"
                : "bg-zinc-100 text-zinc-500"
            }`}
          >
            {live ? "LIVE" : "DRAFT"}
          </span>
        </div>
        <p className="mt-2 text-sm text-zinc-500">
          {location}
          {activeCampaign.firstDate ? ` · ${date}` : ""}
        </p>
        {!live && (
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            {activeCampaign.description ||
              "Bring my community together to help create this project."}
          </p>
        )}
      </div>
    </section>
  );
}

function ReadinessRow({ complete, label }: { complete: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2 text-zinc-700">
      <span className={complete ? "text-emerald-600" : "text-zinc-300"}>
        {complete ? "✓" : "○"}
      </span>
      {label}
    </li>
  );
}

function ShareLaunchButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  function share() {
    const url =
      typeof window === "undefined"
        ? `/launch/${slug}`
        : `${window.location.origin}/launch/${slug}`;
    void navigator.clipboard?.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={share}
      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white meuse-gradient-bg shadow-lg shadow-pink-200/40"
    >
      <SparkleIcon className="h-4 w-4" />
      {copied ? "Link copied" : "Share Launch"}
    </button>
  );
}
