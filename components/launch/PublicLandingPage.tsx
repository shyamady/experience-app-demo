"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CoCreatePanel } from "@/components/launch/public/CoCreatePanel";
import { LaunchHero } from "@/components/launch/public/LaunchHero";
import { LaunchTabs, type LaunchTabId } from "@/components/launch/public/LaunchTabs";
import { LiveProgressSection } from "@/components/launch/public/LiveProgressSection";
import { ParticipatePanel } from "@/components/launch/public/ParticipatePanel";
import { ProjectStory } from "@/components/launch/public/ProjectStory";
import { SponsorshipSection } from "@/components/launch/public/SponsorshipSection";
import { StickyJoinBar } from "@/components/launch/public/StickyJoinBar";
import { UpdatesPanel } from "@/components/launch/public/UpdatesPanel";
import {
  getPublicCoCreate,
  getPublicMomentum,
  getPublicUpdates,
} from "@/lib/dashboard/community";
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
  const [tab, setTab] = useState<LaunchTabId>("participate");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const participateRef = useRef<HTMLDivElement>(null);

  const offers = useMemo(() => getPublicOffers(data), [data]);
  const fromPrice = getLowestAvailablePrice(offers.participation);
  const selected = offers.participation.find(
    (offer) => offer.product.id === selectedId,
  )?.product ?? offers.sponsorship.find((offer) => offer.product.id === selectedId)?.product ?? null;
  const canJoin = isLiveLaunch(data);
  const waitlist = data.salesMode === "waitlist";

  const coCreate = useMemo(
    () => getPublicCoCreate(data.id),
    [data.id],
  );
  const updates = useMemo(() => getPublicUpdates(data.id), [data.id]);
  const momentum = useMemo(() => getPublicMomentum(data.id), [data.id]);

  useEffect(() => {
    if (compact) return;
    const node = progressRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [compact]);

  function scrollToParticipate() {
    setTab("participate");
    window.requestAnimationFrame(() => {
      participateRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
    scrollToParticipate();
  }

  return (
    <div
      className={`bg-white ${
        compact ? "overflow-hidden rounded-[2rem] shadow-meuse-card" : "min-h-dvh"
      }`}
    >
      {!compact && (
        <header className="sticky top-0 z-30 border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex h-12 max-w-[760px] items-center justify-between px-5">
            <span className="font-meuse-display text-lg font-extrabold tracking-tight meuse-gradient-text">
              meuse
            </span>
            <span className="text-xs font-medium text-zinc-400">Launch</span>
          </div>
        </header>
      )}

      <div className={compact ? "" : "mx-auto max-w-[760px]"}>
        <LaunchHero data={data} compact={compact} />

        <div className={compact ? "px-4" : "px-5 sm:px-6"}>
          <div ref={progressRef} className={compact ? "mt-5" : "mt-6"}>
            <LiveProgressSection data={data} />
          </div>

          <div className="mt-5">
            <h2 className="text-lg font-bold tracking-tight text-zinc-900">
              Join the Project
            </h2>
            <button
              type="button"
              onClick={scrollToParticipate}
              className={`mt-3 w-full rounded-full py-3.5 text-sm font-semibold ${
                canJoin
                  ? "text-white meuse-gradient-bg shadow-lg shadow-pink-200/50"
                  : "bg-zinc-100 text-zinc-400"
              }`}
            >
              {data.status !== "published"
                ? "Preview only"
                : waitlist
                  ? "Join Waitlist"
                  : "See Ways to Join"}
            </button>
            <p className="mt-2 text-center text-sm text-zinc-400">
              Choose how you want to participate.
            </p>
          </div>
        </div>

        <div className={compact ? "mt-6" : "mt-8"}>
          <LaunchTabs
            active={tab}
            onChange={setTab}
            sticky={!compact}
          />

          <div
            ref={participateRef}
            className={compact ? "scroll-mt-4 px-4 pt-5" : "scroll-mt-28 px-5 pt-5 sm:px-6"}
          >
            {tab === "participate" && (
              <ParticipatePanel
                offers={offers.participation}
                selectedId={selectedId}
                canJoin={canJoin}
                waitlist={waitlist}
                onSelect={setSelectedId}
                onJoin={joinProduct}
              />
            )}
            {tab === "cocreate" && (
              <CoCreatePanel
                entries={coCreate}
                momentum={momentum}
                onJoin={scrollToParticipate}
              />
            )}
            {tab === "updates" && (
              <UpdatesPanel
                posts={updates}
                momentum={momentum}
                onCta={() => setTab("cocreate")}
              />
            )}
          </div>
        </div>

        <div className={compact ? "px-4 pb-6" : "px-5 pb-28 sm:px-6"}>
          <div className="mt-10">
            <SponsorshipSection
              offers={offers.sponsorship}
              creatorName={data.creatorName}
              canJoin={canJoin}
              onJoin={joinProduct}
            />
          </div>

          <div className="mt-10">
            <ProjectStory data={data} />
          </div>
        </div>
      </div>

      {!compact && showSticky && (
        <StickyJoinBar
          data={data}
          selected={selected}
          fromPrice={fromPrice}
          canJoin={canJoin}
          onJoin={handleStickyJoin}
        />
      )}
    </div>
  );
}
