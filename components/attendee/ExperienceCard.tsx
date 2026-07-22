"use client";

import { useState, type ReactNode } from "react";
import type { AttendeeExperience } from "@/lib/attendee/types";
import {
  capitalizeStatus,
  formatAttendeeCurrency,
  getExperienceStatusStyles,
  getFormatLabel,
  getFormatStyles,
} from "@/lib/attendee/formatting";

type ExperienceCardProps = {
  experience: AttendeeExperience;
  defaultExpanded?: boolean;
};

export function ExperienceCard({
  experience,
  defaultExpanded = false,
}: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <article className="overflow-hidden rounded-meuse border border-pink-100 bg-white shadow-meuse-card">
      <div className="relative h-36 sm:h-40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={experience.coverImageUrl}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${getExperienceStatusStyles(experience.status)}`}
        >
          {capitalizeStatus(experience.status)}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={experience.creatorAvatarUrl}
            alt=""
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-pink-500">
              {experience.creatorName}
            </p>
            <h3 className="mt-0.5 text-base font-bold text-zinc-900">
              {experience.title}
            </h3>
          </div>
        </div>

        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <Meta label="Package" value={experience.packageName} />
          <Meta label="Next session" value={experience.nextSessionDate} />
          <Meta label="Paid" value={formatAttendeeCurrency(experience.pricePaid)} />
          <Meta
            label="Format"
            value={
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${getFormatStyles(experience.format)}`}
              >
                {getFormatLabel(experience.format)}
              </span>
            }
          />
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white meuse-gradient-bg shadow-md shadow-pink-200/50"
          >
            {experience.primaryCta}
          </button>
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="rounded-full border border-pink-200 px-5 py-2.5 text-sm font-semibold text-pink-700 hover:bg-rose-50"
          >
            {expanded ? "Hide details" : "View details"}
          </button>
        </div>

        {expanded && (
          <div className="mt-5 space-y-5 border-t border-pink-50 pt-5">
            <DetailSection title="Schedule" items={experience.schedule} />
            <DetailSection title="What's included" items={experience.includes} />
            <DetailSection
              title="Participation instructions"
              items={experience.participationInstructions}
            />
            <div className="rounded-xl bg-meuse-hint/70 p-4 text-sm">
              <p className="font-semibold text-zinc-900">Order information</p>
              <p className="mt-2 text-zinc-600">Order ID: {experience.orderId}</p>
              <p className="text-zinc-600">
                Purchased: {experience.purchaseDate}
              </p>
            </div>

            {experience.accessType === "online" && (
              <AccessPanel title="Online access">
                <p>Join link appears 15 minutes before the session.</p>
                <p>Submit questions before the session date.</p>
                <p>Replay available in Content after the session.</p>
              </AccessPanel>
            )}

            {experience.accessType === "in-person" && experience.location && (
              <AccessPanel title="In-person access">
                <p>
                  <strong>Location:</strong> {experience.location}
                </p>
                {experience.checkInTime && (
                  <p>
                    <strong>Check-in:</strong> {experience.checkInTime}
                  </p>
                )}
                <p>QR ticket will be emailed 24 hours before your visit.</p>
                <p>
                  Waiver status:{" "}
                  {experience.waiverSigned ? "Signed" : "Pending signature"}
                </p>
              </AccessPanel>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function Meta({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs text-zinc-500">{label}</p>
      <div className="mt-0.5 font-medium text-zinc-800">{value}</div>
    </div>
  );
}

function DetailSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-zinc-900">{title}</h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-zinc-600">
            <span className="text-pink-400">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AccessPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-pink-100 bg-white p-4">
      <h4 className="text-sm font-semibold text-zinc-900">{title}</h4>
      <div className="mt-2 space-y-1 text-sm text-zinc-600">{children}</div>
    </div>
  );
}
