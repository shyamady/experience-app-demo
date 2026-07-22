"use client";

import type {
  AttendeeAccountExtras,
  AttendeeOrder,
  AttendeeProfile,
} from "@/lib/attendee/types";
import { OrderHistoryTable } from "@/components/attendee/OrderHistoryTable";

type AccountSettingsProps = {
  profile: AttendeeProfile;
  orders: AttendeeOrder[];
  extras: AttendeeAccountExtras;
  onPreferenceChange?: (
    key: keyof AttendeeProfile["preferences"],
    value: boolean,
  ) => void;
};

export function AccountSettings({
  profile,
  orders,
  extras,
  onPreferenceChange,
}: AccountSettingsProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-meuse border border-pink-100 bg-white p-5 shadow-meuse-card sm:p-6">
        <h2 className="text-lg font-bold text-zinc-900">Profile</h2>
        <div className="mt-4 flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatarUrl}
            alt=""
            className="h-16 w-16 rounded-full object-cover ring-4 ring-rose-50"
          />
          <div>
            <p className="font-semibold text-zinc-900">{profile.name}</p>
            <p className="text-sm text-zinc-600">{profile.email}</p>
            <p className="mt-1 text-sm text-zinc-500">
              Timezone: {profile.timezone}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 rounded-full border border-pink-200 px-4 py-2 text-sm font-semibold text-pink-700 hover:bg-rose-50"
        >
          Edit profile
        </button>
      </section>

      <section className="rounded-meuse border border-pink-100 bg-white p-5 shadow-meuse-card sm:p-6">
        <h2 className="text-lg font-bold text-zinc-900">Preferences</h2>
        <div className="mt-4 space-y-3">
          <PreferenceToggle
            label="Email notifications"
            checked={profile.preferences.emailNotifications}
            onChange={(value) =>
              onPreferenceChange?.("emailNotifications", value)
            }
          />
          <PreferenceToggle
            label="Session reminders"
            checked={profile.preferences.sessionReminders}
            onChange={(value) =>
              onPreferenceChange?.("sessionReminders", value)
            }
          />
          <PreferenceToggle
            label="Creator updates"
            checked={profile.preferences.creatorUpdates}
            onChange={(value) => onPreferenceChange?.("creatorUpdates", value)}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-zinc-900">Orders</h2>
        <OrderHistoryTable orders={orders} />
      </section>

      {(extras.emergencyContact || extras.waiverStatus) && (
        <section className="rounded-meuse border border-pink-100 bg-white p-5 shadow-meuse-card sm:p-6">
          <h2 className="text-lg font-bold text-zinc-900">
            Additional information
          </h2>
          <div className="mt-4 space-y-3 text-sm text-zinc-600">
            {extras.emergencyContact && (
              <p>
                <span className="font-medium text-zinc-900">
                  Emergency contact:
                </span>{" "}
                {extras.emergencyContact}
              </p>
            )}
            {extras.waiverStatus && (
              <p>
                <span className="font-medium text-zinc-900">Waiver:</span>{" "}
                {extras.waiverStatus}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="rounded-full border border-pink-200 px-5 py-3 text-sm font-semibold text-pink-700 hover:bg-rose-50"
        >
          Request cancellation or refund
        </button>
        <button
          type="button"
          className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-50"
        >
          Log out
        </button>
      </section>
    </div>
  );
}

function PreferenceToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl bg-meuse-hint/50 px-4 py-3">
      <span className="text-sm font-medium text-zinc-800">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? "bg-pink-500" : "bg-zinc-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "left-[1.375rem]" : "left-0.5"
          }`}
        />
      </button>
    </label>
  );
}
