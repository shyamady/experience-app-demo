"use client";

import { useMemo, useState } from "react";
import { DashboardDataTable, DashboardTableBody, DashboardTableCell, DashboardTableHead, DashboardTableHeaderCell, DashboardTableRow } from "@/components/dashboard/DashboardDataTable";
import { DashboardSearchInput } from "@/components/dashboard/DashboardSearchInput";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { attendeeStatusBadge } from "@/components/dashboard/DashboardStatusBadge";
import {
  formatSeasonLabel,
  getDemoAttendees,
} from "@/lib/dashboard/mock-data";

export function AttendeesScreen() {
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

  return (
    <DashboardShell
      title="Attendees"
      subtitle="Manage recurring members and their access."
    >
      <div className="px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">
            <span className="font-semibold text-zinc-900">
              {filteredAttendees.length}
            </span>{" "}
            {filteredAttendees.length === 1 ? "attendee" : "attendees"}
          </p>
          <DashboardSearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search attendees"
          />
        </div>

        <DashboardDataTable>
          <DashboardTableHead>
            <DashboardTableHeaderCell>Attendee</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Package</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Joined</DashboardTableHeaderCell>
            <DashboardTableHeaderCell>Status</DashboardTableHeaderCell>
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
                <DashboardTableCell className="text-zinc-700">
                  {formatSeasonLabel(attendee.seasonsJoined)}
                </DashboardTableCell>
                <DashboardTableCell>
                  {attendeeStatusBadge(attendee.status)}
                </DashboardTableCell>
              </DashboardTableRow>
            ))}
          </DashboardTableBody>
        </DashboardDataTable>

        {filteredAttendees.length === 0 && (
          <p className="mt-6 text-center text-sm text-zinc-500">
            No attendees match your search.
          </p>
        )}
      </div>
    </DashboardShell>
  );
}
