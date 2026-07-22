"use client";

import { useState } from "react";
import { AccountSettings } from "@/components/attendee/AccountSettings";
import { AttendeeShell } from "@/components/attendee/AttendeeShell";
import {
  getMockAccountExtras,
  getMockAttendeeProfile,
  getMockOrders,
} from "@/lib/attendee/mock-data";
import type { AttendeeProfile } from "@/lib/attendee/types";

export function AttendeeAccountScreen() {
  const [profile, setProfile] = useState<AttendeeProfile>(getMockAttendeeProfile());
  const orders = getMockOrders();
  const extras = getMockAccountExtras();

  return (
    <AttendeeShell
      title="Account"
      subtitle="Manage your profile, preferences, and orders."
    >
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <AccountSettings
          profile={profile}
          orders={orders}
          extras={extras}
          onPreferenceChange={(key, value) => {
            setProfile((current) => ({
              ...current,
              preferences: { ...current.preferences, [key]: value },
            }));
          }}
        />
      </div>
    </AttendeeShell>
  );
}
