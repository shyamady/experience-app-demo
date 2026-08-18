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

type AttendeesScreenProps = {
  heading?: string;
};

export function AttendeesScreen({ heading = "Attendees" }: AttendeesScreenProps) {
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
    <DashboardShell>
      <div className="py-1">
        <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">{heading}</h2>
            <p className="mt-1 text-sm text-zinc-500">
              <span className="font-semibold text-zinc-900">
                {filteredAttendees.length}
              </span>{" "}
              {filteredAttendees.length === 1
                ? heading === "Members"
                  ? "member"
                  : "attendee"
                : heading === "Members"
                  ? "members"
                  : "attendees"}
            </p>
          </div>
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
