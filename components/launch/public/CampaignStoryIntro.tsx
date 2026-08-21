"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getCampaignProgress } from "@/lib/dashboard/campaign-progress";
import { formatMoney } from "@/lib/dashboard/commerce";
import type { LaunchData } from "@/lib/launch/types";
import {
  formatDaysLeftCopy,
  getDaysLeftToJoin,
} from "@/lib/launch/public-view";
import { markProjectStoryCompleted } from "@/lib/launch/story";

type CampaignStoryIntroProps = {
  data: LaunchData;
  onComplete: () => void;
};

const IDEA_DURATION_MS = 5500;
const FUNDING_DURATION_MS = 6500;
const STORY_COUNT = 3;

export function CampaignStoryIntro({
  data,
  onComplete,
}: CampaignStoryIntroProps) {
  const [index, setIndex] = useState(0);
  const [fill, setFill] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  const finish = useCallback(() => {
    markProjectStoryCompleted(data.id);
    onComplete();
  }, [data.id, onComplete]);

  const goNext = useCallback(() => {
    if (indexRef.current >= STORY_COUNT - 1) {
      finish();
      return;
    }
    setIndex((current) => current + 1);
    setFill(0);
  }, [finish]);

  const goBack = useCallback(() => {
    if (indexRef.current <= 0) return;
    setIndex((current) => current - 1);
    setFill(0);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goBack();
      } else if (event.key === "Escape") {
        finish();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish, goBack, goNext]);

  useEffect(() => {
    setFill(0);
    let cancelled = false;
    let raf = 0;
    const start = performance.now();
    let duration = IDEA_DURATION_MS;

    if (index === 0) {
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      }
      duration = 10000;
    } else if (index === 2) {
      duration = FUNDING_DURATION_MS;
    }

    function tick(now: number) {
      if (cancelled) return;
      const video = videoRef.current;

      if (
        index === 0 &&
        video &&
        Number.isFinite(video.duration) &&
        video.duration > 0
      ) {
        setFill(Math.min(1, video.currentTime / video.duration));
        if (video.ended) {
          goNext();
          return;
        }
      } else {
        const ratio = Math.min(1, (now - start) / duration);
        setFill(ratio);
        if (ratio >= 1) {
          goNext();
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [goNext, index]);

  const progressValue = getCampaignProgress(data);
  const daysCopy = formatDaysLeftCopy(getDaysLeftToJoin(data));
  const idea =
    data.storyIdea ||
    data.description ||
    "I want to make this happen with my community.";

  return (
    <div className="fixed inset-0 z-50 flex bg-zinc-950 text-white">
      <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col lg:max-w-7xl">
        <div className="absolute inset-x-0 top-0 z-20 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5 sm:pt-4">
          <div className="flex gap-1.5">
            {Array.from({ length: STORY_COUNT }, (_, i) => (
              <div
                key={i}
                className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30"
              >
                <div
                  className="h-full rounded-full bg-white"
                  style={{
                    width:
                      i < index
                        ? "100%"
                        : i === index
                          ? `${Math.round(fill * 100)}%`
                          : "0%",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.avatarUrl}
                alt=""
                className="h-8 w-8 rounded-full object-cover ring-2 ring-white/40"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {data.creatorName}
                </p>
                <p className="truncate text-xs text-white/70">{data.title}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={finish}
              className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm"
            >
              Skip
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden">
          {index === 0 && data.creatorVideoUrl ? (
            <video
              ref={videoRef}
              src={data.creatorVideoUrl}
              className="absolute inset-0 h-full w-full object-cover"
              playsInline
              muted
              autoPlay
              onEnded={goNext}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.coverImageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />

          <button
            type="button"
            aria-label="Previous"
            className="absolute inset-y-0 left-0 z-10 w-1/3"
            onClick={(event) => {
              event.stopPropagation();
              goBack();
            }}
          />
          <button
            type="button"
            aria-label="Next"
            className="absolute inset-y-0 right-0 z-10 w-2/3"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-12">
            {index === 0 && (
              <p className="max-w-md text-2xl font-bold leading-snug sm:text-3xl">
                I want to make this happen.
              </p>
            )}
            {index === 1 && (
              <p className="max-w-lg text-2xl font-bold leading-snug sm:text-4xl">
                {idea}
              </p>
            )}
            {index === 2 && (
              <div className="max-w-md">
                <p className="text-sm font-semibold tracking-[0.16em] text-pink-200 uppercase">
                  Help make this happen
                </p>
                <p className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                  {formatMoney(progressValue.raised)}
                </p>
                <p className="mt-1 text-lg text-white/80">
                  of {formatMoney(progressValue.goalValue)}
                </p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/25">
                  <div
                    className="h-full rounded-full meuse-gradient-bg"
                    style={{
                      width: `${Math.max(4, progressValue.percent)}%`,
                    }}
                  />
                </div>
                {daysCopy && (
                  <p className="mt-3 text-sm font-medium text-white/85">
                    {daysCopy}
                  </p>
                )}
                <p className="mt-2 text-sm text-white/70">
                  Join early to help unlock the project.
                </p>
                <div className="pointer-events-auto mt-6">
                  <button
                    type="button"
                    onClick={finish}
                    className="rounded-full px-6 py-3 text-sm font-bold text-white meuse-gradient-bg shadow-lg shadow-pink-500/30"
                  >
                    See ways to join
                  </button>
                </div>
              </div>
            )}
            {index < 2 && (
              <p className="mt-6 text-xs font-medium tracking-wide text-white/55 uppercase">
                Tap to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
