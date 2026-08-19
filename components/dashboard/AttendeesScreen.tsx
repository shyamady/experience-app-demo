"use client";

import { useMemo, useState } from "react";
import { DashboardDataTable, DashboardTableBody, DashboardTableCell, DashboardTableHead, DashboardTableHeaderCell, DashboardTableRow } from "@/components/dashboard/DashboardDataTable";
import { DashboardSearchInput } from "@/components/dashboard/DashboardSearchInput";
import { LaunchDashboardShell } from "@/components/dashboard/LaunchDashboardShell";
import { attendeeStatusBadge } from "@/components/dashboard/DashboardStatusBadge";
import {
  formatPurchasedAt,
  formatCurrency,
  getDemoAttendees,
} from "@/lib/dashboard/mock-data";

type AttendeesScreenProps = {
  heading?: string;
};

export function AttendeesScreen({ heading = "Participants" }: AttendeesScreenProps) {
  const [search, setSearch] = useState("");
  const attendees = useMemo(() => getDemoAttendees(), []);

  const filteredAttendees = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return attendees;
    return attendees.filter(
      (attendee) =>
        attendee.name.toLowerCase().includes(query) ||
        attendee.email.toLowerCase().includes(query) ||
        attendee.packageName.toLowerCase().includes(query),
    );
  }, [attendees, search]);

  function exportCsv() {
    const header = [
      "Name",
      "Email",
      "Participation",
      "Amount",
      "Status",
      "Joined",
      "Checked in",
      "Notes",
    ];
    const rows = filteredAttendees.map((attendee) =>
      [
        attendee.name,
        attendee.email,
        attendee.packageName,
        attendee.amountPaid,
        attendee.status,
        attendee.joinedAt,
        attendee.checkedIn ? "yes" : "no",
        attendee.notes,
      ].join(","),
    );
    const blob = new Blob([[header.join(","), ...rows].join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "participants.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <LaunchDashboardShell>
      <div className="py-1">
        <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">{heading}</h2>
            <p className="mt-1 text-sm text-zinc-500">
              People who bought or claimed a participation right.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <DashboardSearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search participants"
            />
            <button
              type="button"
              onClick={exportCsv}
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700"
            >
              Export
            </button>
          </div>
        </div>

        <DashboardDataTable>
          <DashboardTableHead>
            <DashboardTableHeaderCell>Name</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Participation</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Amount</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Payment</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Joined</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Check-in</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Notes</DashboardTableHeaderCell>
          </DashboardTableHead>
          <DashboardTableBody>
            {filteredAttendees.map((attendee) => (
              <DashboardTableRow key={attendee.id}>
                <DashboardTableCell>
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={attendee.avatarUrl}
                      alt=""
                      className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-zinc-900">
                        {attendee.name}
                      </p>
                      <p className="truncate text-xs text-zinc-500">
                        {attendee.email}
                      </p>
                    </div>
                  </div>
                </DashboardTableCell>
                <DashboardTableCell className="text-zinc-700">
                  {attendee.packageName}
                </DashboardTableCell>
                <DashboardTableCell className="text-zinc-900">
                  {formatCurrency(attendee.amountPaid)}
                </DashboardTableCell>
                <DashboardTableCell>
                  {attendeeStatusBadge(attendee.status)}
                </DashboardTableCell>
                <DashboardTableCell className="text-zinc-600">
                  {formatPurchasedAt(attendee.joinedAt)}
                </DashboardTableCell>
                <DashboardTableCell className="text-zinc-600">
                  {attendee.checkedIn ? "Checked in" : "—"}
                </DashboardTableCell>
                <DashboardTableCell className="max-w-[12rem] truncate text-zinc-500">
                  {attendee.notes || "—"}
                </DashboardTableCell>
              </DashboardTableRow>
            ))}
          </DashboardTableBody>
        </DashboardDataTable>

        {filteredAttendees.length === 0 && (
          <p className="mt-6 text-center text-sm text-zinc-500">
            No participants match your search.
          </p>
        )}
      </div>
    </LaunchDashboardShell>
  );
}
