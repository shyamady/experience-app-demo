"use client";

import type {
  CalendarExperienceOption,
  CalendarSession,
  RecurrenceEditScope,
  SessionFormValues,
} from "@/lib/dashboard/calendar-types";
import { RecurrenceSelector } from "@/components/calendar/RecurrenceSelector";

type SessionFormProps = {
  open: boolean;
  mode: "create" | "edit";
  values: SessionFormValues;
  experiences: CalendarExperienceOption[];
  editingSession?: CalendarSession | null;
  recurrenceScope: RecurrenceEditScope;
  onRecurrenceScopeChange: (scope: RecurrenceEditScope) => void;
  onChange: (patch: Partial<SessionFormValues>) => void;
  onClose: () => void;
  onSubmit: () => void;
};

const inputClass =
  "h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-500/20";

const labelClass = "mb-1.5 block text-sm font-medium text-zinc-700";

export function SessionForm({
  open,
  mode,
  values,
  experiences,
  editingSession,
  recurrenceScope,
  onRecurrenceScopeChange,
  onChange,
  onClose,
  onSubmit,
}: SessionFormProps) {
  if (!open) return null;

  const isSeries = Boolean(editingSession?.seriesId);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close form"
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      <div className="relative flex h-full w-full max-w-lg flex-col bg-white shadow-2xl animate-[slideIn_0.2s_ease-out] sm:max-w-md md:max-w-lg">
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              {mode === "create" ? "Add Session" : "Edit Session"}
            </h2>
            <p className="text-sm text-zinc-500">
              {mode === "create"
                ? "Create a one-time or recurring experience session."
                : "Update session details and inventory."}
            </p>
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

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-900">
                Basic Information
              </h3>

              <div>
                <label className={labelClass}>Session title</label>
                <input
                  className={inputClass}
                  value={values.title}
                  onChange={(e) => onChange({ title: e.target.value })}
                  placeholder="Nashville Recording Session"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Related experience</label>
                <select
                  className={inputClass}
                  value={values.experienceId}
                  onChange={(e) => onChange({ experienceId: e.target.value })}
                >
                  {experiences.map((experience) => (
                    <option key={experience.id} value={experience.id}>
                      {experience.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  className="min-h-[88px] w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-500/20"
                  value={values.description}
                  onChange={(e) => onChange({ description: e.target.value })}
                  placeholder="What attendees can expect…"
                />
              </div>

              <div>
                <label className={labelClass}>Format</label>
                <div className="inline-flex rounded-xl bg-zinc-100 p-1">
                  {(
                    [
                      { id: "online", label: "Online" },
                      { id: "in-person", label: "In Person" },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onChange({ format: option.id })}
                      className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition ${
                        values.format === option.id
                          ? "bg-white text-zinc-900 shadow-sm"
                          : "text-zinc-500"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>Date</label>
                  <input
                    type="date"
                    className={inputClass}
                    value={values.date}
                    onChange={(e) => onChange({ date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Timezone</label>
                  <select
                    className={inputClass}
                    value={values.timezone}
                    onChange={(e) => onChange({ timezone: e.target.value })}
                  >
                    <option value="CT">CT</option>
                    <option value="ET">ET</option>
                    <option value="PT">PT</option>
                    <option value="MT">MT</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Start time</label>
                  <input
                    type="time"
                    className={inputClass}
                    value={values.startTime}
                    onChange={(e) => onChange({ startTime: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>End time</label>
                  <input
                    type="time"
                    className={inputClass}
                    value={values.endTime}
                    onChange={(e) => onChange({ endTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              {values.format === "online" ? (
                <div>
                  <label className={labelClass}>Meeting link</label>
                  <input
                    className={inputClass}
                    value={values.meetingLink}
                    onChange={(e) => onChange({ meetingLink: e.target.value })}
                    placeholder="https://"
                  />
                </div>
              ) : (
                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    className={inputClass}
                    value={values.location}
                    onChange={(e) => onChange({ location: e.target.value })}
                    placeholder="Studio address"
                  />
                </div>
              )}
            </section>

            <section>
              <h3 className="mb-3 text-sm font-semibold text-zinc-900">
                Recurrence
              </h3>
              <RecurrenceSelector values={values} onChange={onChange} />
            </section>

            {mode === "edit" && isSeries && (
              <section className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4">
                <h3 className="mb-2 text-sm font-semibold text-zinc-900">
                  Apply changes to:
                </h3>
                <div className="space-y-2">
                  {(
                    [
                      { id: "this", label: "This session only" },
                      {
                        id: "this-and-future",
                        label: "This and future sessions",
                      },
                      { id: "all", label: "All sessions in the series" },
                    ] as const
                  ).map((option) => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-700"
                    >
                      <input
                        type="radio"
                        name="recurrence-scope"
                        checked={recurrenceScope === option.id}
                        onChange={() => onRecurrenceScopeChange(option.id)}
                        className="accent-[#FF4F9A]"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </section>
            )}
          </form>
        </div>

        <div className="flex gap-2 border-t border-zinc-100 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-10 flex-1 rounded-xl border border-zinc-200 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="h-10 flex-1 rounded-xl bg-[#FF4F9A] text-sm font-semibold text-white transition hover:brightness-95"
          >
            {mode === "create" ? "Create Session" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
