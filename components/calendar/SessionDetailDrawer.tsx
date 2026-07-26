"use client";

import { useState } from "react";
import type {
  CalendarSession,
  SessionProductInventory,
} from "@/lib/dashboard/calendar-types";
import {
  formatCurrency,
  getInventoryStatusLabel,
} from "@/lib/dashboard/calendar-mock-data";
import { SessionStatusBadge } from "@/components/calendar/SessionStatusBadge";
import { SessionInventoryTable } from "@/components/calendar/SessionInventoryTable";
import {
  DashboardDataTable,
  DashboardTableBody,
  DashboardTableCell,
  DashboardTableHead,
  DashboardTableHeaderCell,
  DashboardTableRow,
} from "@/components/dashboard/DashboardDataTable";
import {
  paymentStatusBadge,
} from "@/components/dashboard/DashboardStatusBadge";

type SessionDetailDrawerProps = {
  session: CalendarSession | null;
  inventory: SessionProductInventory[];
  onInventoryChange: (inventory: SessionProductInventory[]) => void;
  onClose: () => void;
  onEdit: (session: CalendarSession) => void;
  onCancel: (session: CalendarSession) => void;
  onPublishUpdate: (sessionId: string, title: string, message: string) => void;
};

const TABS = [
  "Overview",
  "Products",
  "Attendees",
  "Updates",
  "Content",
  "Settings",
] as const;

type Tab = (typeof TABS)[number];

export function SessionDetailDrawer({
  session,
  inventory,
  onInventoryChange,
  onClose,
  onEdit,
  onCancel,
  onPublishUpdate,
}: SessionDetailDrawerProps) {
  const [tab, setTab] = useState<Tab>("Overview");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  if (!session) return null;

  const totalCapacity = inventory.reduce(
    (sum, item) => sum + (item.capacity ?? item.sold),
    0,
  );
  const totalSold = inventory.reduce((sum, item) => sum + item.sold, 0);
  const remaining = Math.max(totalCapacity - totalSold, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end sm:items-stretch">
      <button
        type="button"
        aria-label="Close details"
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      <div className="relative flex max-h-[92dvh] w-full flex-col rounded-t-2xl bg-white shadow-2xl animate-[slideIn_0.2s_ease-out] sm:max-h-none sm:max-w-xl sm:rounded-none">
        <div className="border-b border-zinc-100 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-zinc-900">
                {session.title}
              </h2>
              <p className="mt-0.5 truncate text-sm text-zinc-500">
                {session.experienceTitle}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <SessionStatusBadge status={session.status} />
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                    session.format === "online"
                      ? "bg-sky-50 text-sky-700 ring-sky-600/20"
                      : "bg-rose-50 text-[#FF4F9A] ring-pink-500/20"
                  }`}
                >
                  {session.format === "online" ? "Online" : "In Person"}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4 -mx-1 flex gap-1 overflow-x-auto pb-1">
            {TABS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  tab === item
                    ? "bg-rose-50 text-[#FF4F9A]"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {tab === "Overview" && (
            <div className="space-y-5">
              <dl className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Date & time",
                    value: `${session.displayDate} · ${session.startTime}–${session.endTime} ${session.timezone}`,
                  },
                  {
                    label: session.format === "online" ? "Meeting link" : "Location",
                    value:
                      session.format === "online"
                        ? session.meetingLink || "—"
                        : session.location || "—",
                  },
                  {
                    label: "Attendees",
                    value: String(session.attendeeCount),
                  },
                  {
                    label: "Revenue",
                    value: formatCurrency(session.revenue),
                  },
                  {
                    label: "Ticket inventory",
                    value: `${totalSold} / ${totalCapacity} sold`,
                  },
                  {
                    label: "Remaining capacity",
                    value: String(remaining),
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-3"
                  >
                    <dt className="text-xs font-medium text-zinc-500">
                      {row.label}
                    </dt>
                    <dd className="mt-1 break-all text-sm font-medium text-zinc-900">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {session.recurrenceLabel && (
                <p className="text-sm text-zinc-500">
                  Series: {session.recurrenceLabel}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(session)}
                  className="h-9 rounded-xl bg-[#FF4F9A] px-4 text-sm font-semibold text-white"
                >
                  Edit Session
                </button>
                <button
                  type="button"
                  onClick={() => onCancel(session)}
                  className="h-9 rounded-xl border border-zinc-200 px-4 text-sm font-medium text-rose-600"
                >
                  Cancel Session
                </button>
              </div>
            </div>
          )}

          {tab === "Products" && (
            <div className="space-y-4">
              <p className="text-sm text-zinc-500">
                Date-specific inventory. Changes affect availability on the
                public experience page.
              </p>
              <SessionInventoryTable
                inventory={inventory}
                editable
                onChange={onInventoryChange}
              />
              <ul className="space-y-1 text-sm text-zinc-600">
                {inventory.map((item) => (
                  <li key={item.productId}>
                    {item.productName}: {getInventoryStatusLabel(item)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "Attendees" && (
            <DashboardDataTable>
              <DashboardTableHead>
                <DashboardTableHeaderCell>Name</DashboardTableHeaderCell>
                <DashboardTableHeaderCell>Product</DashboardTableHeaderCell>
                <DashboardTableHeaderCell>Qty</DashboardTableHeaderCell>
                <DashboardTableHeaderCell>Payment</DashboardTableHeaderCell>
                <DashboardTableHeaderCell>Attendance</DashboardTableHeaderCell>
              </DashboardTableHead>
              <DashboardTableBody>
                {session.attendees.length === 0 ? (
                  <DashboardTableRow>
                    <DashboardTableCell
                      className="text-zinc-500"
                    >
                      No attendees yet
                    </DashboardTableCell>
                  </DashboardTableRow>
                ) : (
                  session.attendees.map((attendee) => (
                    <DashboardTableRow key={attendee.id}>
                      <DashboardTableCell>
                        <p className="font-medium text-zinc-900">
                          {attendee.name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {attendee.email}
                        </p>
                      </DashboardTableCell>
                      <DashboardTableCell className="text-zinc-700">
                        {attendee.productName}
                      </DashboardTableCell>
                      <DashboardTableCell className="text-zinc-700">
                        {attendee.quantity}
                      </DashboardTableCell>
                      <DashboardTableCell>
                        {paymentStatusBadge(attendee.paymentStatus)}
                      </DashboardTableCell>
                      <DashboardTableCell className="capitalize text-zinc-700">
                        {attendee.attendanceStatus.replace("-", " ")}
                      </DashboardTableCell>
                    </DashboardTableRow>
                  ))
                )}
              </DashboardTableBody>
            </DashboardDataTable>
          )}

          {tab === "Updates" && (
            <div className="space-y-4">
              <div className="space-y-3 rounded-xl border border-zinc-100 p-4">
                <h3 className="text-sm font-semibold text-zinc-900">
                  Publish announcement
                </h3>
                <input
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  placeholder="Update title"
                  className="h-10 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-pink-300"
                />
                <textarea
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                  placeholder="Message for attendees…"
                  className="min-h-[80px] w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-pink-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!updateTitle.trim() || !updateMessage.trim()) return;
                    onPublishUpdate(session.id, updateTitle, updateMessage);
                    setUpdateTitle("");
                    setUpdateMessage("");
                  }}
                  className="h-9 rounded-xl bg-[#FF4F9A] px-4 text-sm font-semibold text-white"
                >
                  Publish Update
                </button>
              </div>

              <div className="space-y-3">
                {session.updates.length === 0 ? (
                  <p className="text-sm text-zinc-500">No updates yet.</p>
                ) : (
                  session.updates.map((update) => (
                    <article
                      key={update.id}
                      className="rounded-xl border border-zinc-100 p-4"
                    >
                      <h4 className="font-medium text-zinc-900">
                        {update.title}
                      </h4>
                      <p className="mt-1 text-sm text-zinc-600">
                        {update.message}
                      </p>
                      <p className="mt-2 text-xs text-zinc-400">
                        {update.publishedAt}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </div>
          )}

          {tab === "Content" && (
            <div className="space-y-3">
              {session.content.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No content attached yet. Add livestream links, replays,
                  downloads, or gifts.
                </p>
              ) : (
                session.content.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-zinc-100 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900">
                        {item.title}
                      </p>
                      <p className="text-xs capitalize text-zinc-500">
                        {item.type}
                      </p>
                    </div>
                    {item.url && (
                      <span className="text-xs text-[#FF4F9A]">
                        Linked
                      </span>
                    )}
                  </div>
                ))
              )}
              <button
                type="button"
                className="h-9 rounded-xl border border-dashed border-zinc-200 px-4 text-sm font-medium text-zinc-600"
              >
                + Attach content
              </button>
            </div>
          )}

          {tab === "Settings" && (
            <div className="space-y-4">
              <p className="text-sm text-zinc-500">
                Series and cancellation controls for this session.
              </p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => onEdit(session)}
                  className="block w-full rounded-xl border border-zinc-200 px-4 py-3 text-left text-sm font-medium text-zinc-800 transition hover:bg-zinc-50"
                >
                  Reschedule session
                </button>
                <button
                  type="button"
                  onClick={() => onCancel(session)}
                  className="block w-full rounded-xl border border-rose-200 px-4 py-3 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                >
                  Cancel this session
                </button>
                {session.seriesId && (
                  <button
                    type="button"
                    onClick={() => onCancel(session)}
                    className="block w-full rounded-xl border border-rose-200 px-4 py-3 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                  >
                    Cancel entire series
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
