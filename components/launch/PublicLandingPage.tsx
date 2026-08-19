"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { WhatItTakesCard } from "@/components/experiences/WhatItTakesCard";
import { LaunchHero } from "@/components/launch/public/LaunchHero";
import { LiveProgressSection } from "@/components/launch/public/LiveProgressSection";
import { ParticipatePanel } from "@/components/launch/public/ParticipatePanel";
import { ProjectDetails, ProjectStory } from "@/components/launch/public/ProjectStory";
import { SponsorshipSection } from "@/components/launch/public/SponsorshipSection";
import {
  DesktopSummaryCard,
  StickyJoinBar,
} from "@/components/launch/public/StickyJoinBar";
import { UpdatesPanel } from "@/components/launch/public/UpdatesPanel";
import { getCampaignGoalType, getCampaignGoalValue } from "@/lib/dashboard/campaign-progress";
import { getCampaignDisplayStatus } from "@/lib/dashboard/campaign-status";
import type { LaunchData } from "@/lib/launch/types";
import {
  getLowestAvailablePrice,
  getPublicOffers,
  isLiveLaunch,
} from "@/lib/launch/public-view";

type PublicLandingPageProps = {
  data: LaunchData;
  compact?: boolean;
};

export function PublicLandingPage({ data, compact = false }: PublicLandingPageProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const joinRef = useRef<HTMLDivElement>(null);

  const offers = useMemo(() => getPublicOffers(data), [data]);
  const fromPrice = getLowestAvailablePrice(offers.participation);
  const selected =
    offers.participation.find((offer) => offer.product.id === selectedId)?.product ??
    offers.sponsorship.find((offer) => offer.product.id === selectedId)?.product ??
    null;
  const status = getCampaignDisplayStatus(data);
  const canJoin = isLiveLaunch(data);
  const waitlist = data.salesMode === "waitlist";
  const ended = status === "ended" || status === "cancelled";
  const remainingSpots = offers.participation.reduce<number | null>((lowest, offer) => {
    const remaining = offer.capacity.remaining;
    if (remaining === "unlimited" || offer.capacity.soldOut) return lowest;
    if (lowest === null) return remaining;
    return Math.min(lowest, remaining);
  }, null);
  const budgetLines = data.budgetLines ?? [];

  useEffect(() => {
    if (compact) return;
    const node = progressRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [compact]);

  function scrollToJoin() {
    joinRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function joinProduct(productId: string) {
    if (!canJoin) return;
    setSelectedId(productId);
    router.push(
      `/experience/checkout?campaign=${encodeURIComponent(data.slug)}&product=${encodeURIComponent(productId)}`,
    );
  }

  function handleStickyJoin() {
    if (selectedId) {
      joinProduct(selectedId);
      return;
    }
    scrollToJoin();
  }

  return (
    <div
      className={`bg-[#fff7fa] ${
        compact ? "overflow-hidden rounded-[2rem] shadow-meuse-card" : "min-h-dvh"
      }`}
    >
      {!compact && (
        <header className="sticky top-0 z-30 border-b border-pink-100/80 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto flex h-12 max-w-[800px] items-center justify-between px-5 lg:max-w-5xl">
            <span className="font-meuse-display text-lg font-extrabold tracking-tight meuse-gradient-text">
              meuse
            </span>
            <nav className="hidden items-center gap-4 text-sm text-zinc-500 sm:flex">
              <a href="#overview" className="hover:text-zinc-800">Overview</a>
              <a href="#join" className="hover:text-zinc-800">Join</a>
              {offers.sponsorship.length > 0 && (
                <a href="#sponsors" className="hover:text-zinc-800">Sponsors</a>
              )}
              <a href="#updates" className="hover:text-zinc-800">Updates</a>
            </nav>
          </div>
        </header>
      )}

      {status === "draft" && !compact && (
        <div className="border-b border-amber-100 bg-amber-50 px-4 py-2.5 text-center text-sm text-amber-800">
          <span className="font-semibold">DRAFT</span>
          {" — "}This is how your Launch will look when published.{" "}
          <Link href="/dashboard/overview" className="font-semibold underline">
            Edit Launch
          </Link>
        </div>
      )}

      <div className={compact ? "" : "mx-auto max-w-5xl lg:grid lg:grid-cols-[minmax(0,800px)_16rem] lg:items-start lg:justify-center lg:gap-8 lg:px-6"}>
        <div className={compact ? "" : "mx-auto w-full max-w-[800px]"}>
          <div id="overview">
            <LaunchHero data={data} compact={compact} />
          </div>

          <div className={compact ? "px-4" : "px-5 sm:px-6"}>
            <div ref={progressRef} className="mt-8">
              <LiveProgressSection
                data={data}
                canJoin={canJoin}
                onJoin={scrollToJoin}
              />
            </div>

            <div
              id="join"
              ref={joinRef}
              className={compact ? "mt-10 scroll-mt-4" : "mt-12 scroll-mt-16"}
            >
              <ParticipatePanel
                offers={offers.participation}
                selectedId={selectedId}
                canJoin={canJoin}
                waitlist={waitlist}
                onSelect={setSelectedId}
                onJoin={joinProduct}
              />
            </div>

            {budgetLines.length > 0 && (
              <div className="mt-12">
                <WhatItTakesCard
                  lines={budgetLines}
                  goalType={getCampaignGoalType(data)}
                  goalValue={getCampaignGoalValue(data)}
                  variant="public"
                />
              </div>
            )}

            {offers.sponsorship.length > 0 && (
              <div id="sponsors" className="mt-12 scroll-mt-16">
                <SponsorshipSection
                  offers={offers.sponsorship}
                  canJoin={canJoin}
                  onJoin={joinProduct}
                />
              </div>
            )}

            <div className="mt-12">
              <ProjectDetails data={data} />
            </div>
            <div className="mt-12">
              <ProjectStory data={data} />
            </div>
            <div id="updates" className={`mt-12 scroll-mt-16 ${compact ? "pb-6" : "pb-28"}`}>
              <UpdatesPanel campaignId={data.id} />
            </div>
          </div>
        </div>

        {!compact && !ended && (
          <DesktopSummaryCard
            data={data}
            offers={offers.participation}
            canJoin={canJoin}
            onJoin={scrollToJoin}
          />
        )}
      </div>

      {!compact && showSticky && (
        <StickyJoinBar
          data={data}
          selected={selected}
          fromPrice={fromPrice}
          remainingSpots={remainingSpots}
          canJoin={canJoin}
          ended={ended}
          onJoin={handleStickyJoin}
        />
      )}
    </div>
  );
}
