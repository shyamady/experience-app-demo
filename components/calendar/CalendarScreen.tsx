"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { SessionFilters } from "@/components/calendar/SessionFilters";
import { SessionList } from "@/components/calendar/SessionList";
import { SessionCalendar } from "@/components/calendar/SessionCalendar";
import { SessionForm } from "@/components/calendar/SessionForm";
import { SessionDetailDrawer } from "@/components/calendar/SessionDetailDrawer";
import {
  formatCurrency,
  getCalendarExperiences,
  getCalendarSessions,
  getEmptySessionForm,
} from "@/lib/dashboard/calendar-mock-data";
import type {
  CalendarSession,
  CalendarViewMode,
  RecurrenceEditScope,
  SessionFormValues,
  SessionFormatFilter,
  SessionStatusFilter,
} from "@/lib/dashboard/calendar-types";

type CancelModalState = {
  session: CalendarSession;
} | null;

function formatDisplayDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeLabel(time: string): string {
  if (!time.includes(":")) return time;
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function createSessionsFromForm(
  values: SessionFormValues,
  experiences: ReturnType<typeof getCalendarExperiences>,
): CalendarSession[] {
  const experience =
    experiences.find((item) => item.id === values.experienceId) ??
    experiences[0];

  const count =
    values.recurrenceType === "none" ? 1 : Math.max(1, values.endsAfter);
  const stepDays =
    values.recurrenceType === "biweekly"
      ? 14
      : values.recurrenceType === "monthly"
        ? 28
        : values.recurrenceType === "none"
          ? 0
          : 7;

  const seriesId =
    values.recurrenceType === "none"
      ? undefined
      : `series-${Date.now()}`;

  const recurrenceLabel =
    values.recurrenceType === "none"
      ? undefined
      : `${
          values.recurrenceType === "weekly"
            ? "Weekly"
            : values.recurrenceType === "biweekly"
              ? "Every two weeks"
              : values.recurrenceType === "monthly"
                ? "Monthly"
                : "Custom"
        } on ${values.recurrenceDay} · Ends after ${values.endsAfter} sessions`;

  const baseDate = new Date(`${values.date}T12:00:00`);
  const sessions: CalendarSession[] = [];

  for (let i = 0; i < count; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i * stepDays);
    const iso = date.toISOString().slice(0, 10);

    sessions.push({
      id: `session-${Date.now()}-${i}`,
      title: values.title || "Untitled Session",
      experienceId: experience.id,
      experienceTitle: experience.title,
      description: values.description,
      format: values.format,
      date: iso,
      displayDate: formatDisplayDate(iso),
      startTime: formatTimeLabel(values.startTime),
      endTime: formatTimeLabel(values.endTime),
      timezone: values.timezone,
      meetingLink: values.format === "online" ? values.meetingLink : undefined,
      location: values.format === "in-person" ? values.location : undefined,
      status: "draft",
      attendeeCount: 0,
      revenue: 0,
      seriesId,
      recurrenceLabel,
      inventory: [
        {
          productId: "live-access",
          productName: "Live Studio Access",
          price: 35,
          sold: 0,
          capacity: 80,
          paused: false,
          soldOut: false,
        },
      ],
      attendees: [],
      updates: [],
      content: [],
    });
  }

  return sessions;
}

export function CalendarScreen() {
  const experiences = useMemo(() => getCalendarExperiences(), []);
  const [sessions, setSessions] = useState(() => getCalendarSessions());
  const [viewMode, setViewMode] = useState<CalendarViewMode>("list");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<SessionStatusFilter>("all");
  const [formatFilter, setFormatFilter] = useState<SessionFormatFilter>("all");

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [formValues, setFormValues] = useState<SessionFormValues>(
    getEmptySessionForm,
  );
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [recurrenceScope, setRecurrenceScope] =
    useState<RecurrenceEditScope>("this");
  const [cancelModal, setCancelModal] = useState<CancelModalState>(null);
  const [toast, setToast] = useState<string | null>(null);

  const selectedSession =
    sessions.find((session) => session.id === selectedSessionId) ?? null;
  const editingSession =
    sessions.find((session) => session.id === editingSessionId) ?? null;

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      if (
        experienceFilter !== "all" &&
        session.experienceId !== experienceFilter
      ) {
        return false;
      }
      if (statusFilter !== "all" && session.status !== statusFilter) {
        return false;
      }
      if (formatFilter !== "all" && session.format !== formatFilter) {
        return false;
      }
      return true;
    });
  }, [sessions, experienceFilter, statusFilter, formatFilter]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2800);
  }

  function openCreateForm() {
    setFormMode("create");
    setEditingSessionId(null);
    setFormValues(getEmptySessionForm());
    setRecurrenceScope("this");
    setFormOpen(true);
  }

  function openEditForm(session: CalendarSession) {
    setFormMode("edit");
    setEditingSessionId(session.id);
    setFormValues({
      title: session.title,
      experienceId: session.experienceId,
      description: session.description,
      format: session.format,
      date: session.date,
      startTime: "19:00",
      endTime: "21:00",
      timezone: session.timezone,
      meetingLink: session.meetingLink ?? "",
      location: session.location ?? "",
      recurrenceType: session.seriesId ? "weekly" : "none",
      recurrenceDay: "Wednesday",
      endsAfter: 8,
    });
    setRecurrenceScope("this");
    setFormOpen(true);
  }

  function handleSubmitForm() {
    if (formMode === "create") {
      const created = createSessionsFromForm(formValues, experiences);
      setSessions((prev) => [...prev, ...created]);
      setFormOpen(false);
      showToast(
        created.length > 1
          ? `Created ${created.length} sessions in the series`
          : "Session created",
      );
      return;
    }

    if (!editingSessionId) return;
    const experience =
      experiences.find((item) => item.id === formValues.experienceId) ??
      experiences[0];

    setSessions((prev) =>
      prev.map((session) => {
        const shouldUpdate =
          session.id === editingSessionId ||
          (recurrenceScope !== "this" &&
            session.seriesId &&
            session.seriesId === editingSession?.seriesId &&
            (recurrenceScope === "all" ||
              session.date >= (editingSession?.date ?? "")));

        if (!shouldUpdate) return session;

        return {
          ...session,
          title: formValues.title,
          experienceId: experience.id,
          experienceTitle: experience.title,
          description: formValues.description,
          format: formValues.format,
          date:
            session.id === editingSessionId ? formValues.date : session.date,
          displayDate:
            session.id === editingSessionId
              ? formatDisplayDate(formValues.date)
              : session.displayDate,
          startTime: formatTimeLabel(formValues.startTime),
          endTime: formatTimeLabel(formValues.endTime),
          timezone: formValues.timezone,
          meetingLink:
            formValues.format === "online"
              ? formValues.meetingLink
              : undefined,
          location:
            formValues.format === "in-person"
              ? formValues.location
              : undefined,
        };
      }),
    );

    setFormOpen(false);
    showToast("Session updated");
  }

  function handleDuplicate(session: CalendarSession) {
    const copy: CalendarSession = {
      ...session,
      id: `session-dup-${Date.now()}`,
      title: `${session.title} (Copy)`,
      status: "draft",
      attendeeCount: 0,
      revenue: 0,
      seriesId: undefined,
      recurrenceLabel: undefined,
      inventory: session.inventory.map((item) => ({
        ...item,
        sold: 0,
        soldOut: false,
        paused: false,
      })),
      attendees: [],
      updates: [],
    };
    setSessions((prev) => [...prev, copy]);
    showToast("Session duplicated as draft");
  }

  function confirmCancel(options: {
    notify: boolean;
    refund: boolean;
    credit: boolean;
    transfer: boolean;
  }) {
    if (!cancelModal) return;
    const target = cancelModal.session;

    setSessions((prev) =>
      prev.map((session) =>
        session.id === target.id
          ? {
              ...session,
              status: "cancelled",
              inventory: session.inventory.map((item) => ({
                ...item,
                paused: true,
              })),
            }
          : session,
      ),
    );

    const bits = [
      options.notify && "attendees notified",
      options.refund && "refunds queued",
      options.credit && "credit kept",
      options.transfer && "transfer offered",
    ].filter(Boolean);

    setCancelModal(null);
    showToast(
      bits.length
        ? `Session cancelled · ${bits.join(", ")}`
        : "Session cancelled",
    );
  }

  return (
    <DashboardShell variant="workspace">
      <div className="relative px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <CalendarHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onAddSession={openCreateForm}
          filters={
            <SessionFilters
              experiences={experiences}
              experienceId={experienceFilter}
              status={statusFilter}
              format={formatFilter}
              onExperienceChange={setExperienceFilter}
              onStatusChange={setStatusFilter}
              onFormatChange={setFormatFilter}
            />
          }
        />

        <div className="mt-6">
          {viewMode === "list" ? (
            <SessionList
              sessions={filteredSessions}
              onView={(session) => setSelectedSessionId(session.id)}
              onEdit={openEditForm}
              onDuplicate={handleDuplicate}
              onCancel={(session) => setCancelModal({ session })}
            />
          ) : (
            <SessionCalendar
              sessions={filteredSessions}
              onSelectSession={(session) => setSelectedSessionId(session.id)}
            />
          )}
        </div>

        {/* Mobile floating add */}
        <button
          type="button"
          onClick={openCreateForm}
          className="fixed right-4 bottom-4 z-30 flex h-12 items-center gap-2 rounded-full bg-[#FF4F9A] px-5 text-sm font-semibold text-white shadow-lg shadow-pink-200/60 sm:hidden"
        >
          + Add Session
        </button>
      </div>

      <SessionForm
        open={formOpen}
        mode={formMode}
        values={formValues}
        experiences={experiences}
        editingSession={editingSession}
        recurrenceScope={recurrenceScope}
        onRecurrenceScopeChange={setRecurrenceScope}
        onChange={(patch) => setFormValues((prev) => ({ ...prev, ...patch }))}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmitForm}
      />

      <SessionDetailDrawer
        session={selectedSession}
        inventory={selectedSession?.inventory ?? []}
        onInventoryChange={(inventory) => {
          if (!selectedSessionId) return;
          setSessions((prev) =>
            prev.map((session) =>
              session.id === selectedSessionId
                ? { ...session, inventory }
                : session,
            ),
          );
        }}
        onClose={() => setSelectedSessionId(null)}
        onEdit={(session) => {
          setSelectedSessionId(null);
          openEditForm(session);
        }}
        onCancel={(session) => {
          setSelectedSessionId(null);
          setCancelModal({ session });
        }}
        onPublishUpdate={(sessionId, title, message) => {
          setSessions((prev) =>
            prev.map((session) =>
              session.id === sessionId
                ? {
                    ...session,
                    updates: [
                      {
                        id: `u-${Date.now()}`,
                        title,
                        message,
                        publishedAt: "Just now",
                      },
                      ...session.updates,
                    ],
                  }
                : session,
            ),
          );
          showToast("Update published to attendees");
        }}
      />

      {cancelModal && (
        <CancelSessionModal
          session={cancelModal.session}
          onClose={() => setCancelModal(null)}
          onConfirm={confirmCancel}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </DashboardShell>
  );
}

function CancelSessionModal({
  session,
  onClose,
  onConfirm,
}: {
  session: CalendarSession;
  onClose: () => void;
  onConfirm: (options: {
    notify: boolean;
    refund: boolean;
    credit: boolean;
    transfer: boolean;
  }) => void;
}) {
  const [notify, setNotify] = useState(true);
  const [refund, setRefund] = useState(false);
  const [credit, setCredit] = useState(true);
  const [transfer, setTransfer] = useState(false);

  return (
    <div className="fixed inset-0 z-[55] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-6">
        <h2 className="text-lg font-semibold text-zinc-900">Cancel session?</h2>
        <p className="mt-1 text-sm text-zinc-500">
          {session.title} · {session.displayDate} ·{" "}
          {formatCurrency(session.revenue)} in sales
        </p>

        <div className="mt-4 space-y-2">
          {(
            [
              {
                id: "notify",
                label: "Notify attendees automatically",
                checked: notify,
                set: setNotify,
              },
              {
                id: "transfer",
                label: "Offer transfer to another session",
                checked: transfer,
                set: setTransfer,
              },
              {
                id: "refund",
                label: "Issue refunds",
                checked: refund,
                set: setRefund,
              },
              {
                id: "credit",
                label: "Keep payments as credit",
                checked: credit,
                set: setCredit,
              },
            ] as const
          ).map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-zinc-100 px-3 py-2.5 text-sm text-zinc-700"
            >
              <input
                type="checkbox"
                checked={option.checked}
                onChange={(e) => option.set(e.target.checked)}
                className="accent-[#FF4F9A]"
              />
              {option.label}
            </label>
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 flex-1 rounded-xl border border-zinc-200 text-sm font-medium text-zinc-700"
          >
            Keep Session
          </button>
          <button
            type="button"
            onClick={() => onConfirm({ notify, refund, credit, transfer })}
            className="h-10 flex-1 rounded-xl bg-rose-600 text-sm font-semibold text-white"
          >
            Cancel Session
          </button>
        </div>
      </div>
    </div>
  );
}
