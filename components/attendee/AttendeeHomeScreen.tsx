"use client";

import Link from "next/link";
import { ActionChecklist } from "@/components/attendee/ActionChecklist";
import { AttendeeShell } from "@/components/attendee/AttendeeShell";
import { ContentCard } from "@/components/attendee/ContentCard";
import { NextSessionCard } from "@/components/attendee/NextSessionCard";
import { PurchasedPackageCard } from "@/components/attendee/PurchasedPackageCard";
import { UpdateCard } from "@/components/attendee/UpdateCard";
import {
  getMockChecklist,
  getMockContent,
  getMockNextSession,
  getMockPurchasedPackage,
  getMockUpdates,
} from "@/lib/attendee/mock-data";

export function AttendeeHomeScreen() {
  const session = getMockNextSession();
  const pkg = getMockPurchasedPackage();
  const checklist = getMockChecklist();
  const updates = getMockUpdates().slice(0, 3);
  const content = getMockContent().slice(0, 3);

  return (
    <AttendeeShell showWelcome>
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-8">
          <div className="space-y-6">
            <NextSessionCard session={session} />

            <div className="grid gap-6 md:grid-cols-2">
              <PurchasedPackageCard package={pkg} />
              <ActionChecklist items={checklist} />
            </div>

            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-900">
                  Latest updates
                </h2>
                <Link
                  href="/attendee/updates"
                  className="text-sm font-semibold text-pink-600 hover:text-pink-700"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {updates.map((update) => (
                  <UpdateCard key={update.id} update={update} compact />
                ))}
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-900">
                  Available content
                </h2>
                <Link
                  href="/attendee/content"
                  className="text-sm font-semibold text-pink-600 hover:text-pink-700"
                >
                  View library
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {content.map((item) => (
                  <ContentCard key={item.id} content={item} compact />
                ))}
              </div>
            </section>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-6">
              <div className="rounded-meuse border border-pink-100 bg-white p-4 shadow-meuse-card">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Your status
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-900">
                  {pkg.packageName}
                </p>
                <p className="mt-1 text-sm text-emerald-600">Confirmed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-pink-100 bg-white/95 px-4 py-3 backdrop-blur-sm lg:hidden">
        <button
          type="button"
          disabled={!session.joinAvailable}
          className={`w-full rounded-full py-3 text-sm font-semibold ${
            session.joinAvailable
              ? "text-white meuse-gradient-bg shadow-lg shadow-pink-200/50"
              : "cursor-not-allowed bg-zinc-200 text-zinc-400"
          }`}
        >
          {session.primaryCta}
        </button>
      </div>
    </AttendeeShell>
  );
}
