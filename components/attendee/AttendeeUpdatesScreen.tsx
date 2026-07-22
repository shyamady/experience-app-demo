"use client";

import { AttendeeShell } from "@/components/attendee/AttendeeShell";
import { UpdateCard } from "@/components/attendee/UpdateCard";
import { getMockUpdates } from "@/lib/attendee/mock-data";

export function AttendeeUpdatesScreen() {
  const updates = getMockUpdates();

  return (
    <AttendeeShell
      title="Updates"
      subtitle="Announcements from creators and organizers."
    >
      <div className="space-y-4 px-4 py-6 sm:px-6 sm:py-8">
        {updates.map((update) => (
          <UpdateCard key={update.id} update={update} />
        ))}
      </div>
    </AttendeeShell>
  );
}
