import type { CalendarSession } from "@/lib/dashboard/calendar-types";
import { groupSessionsByDate } from "@/lib/dashboard/calendar-mock-data";
import { SessionCard } from "@/components/calendar/SessionCard";

type SessionListProps = {
  sessions: CalendarSession[];
  onView: (session: CalendarSession) => void;
  onEdit: (session: CalendarSession) => void;
  onDuplicate: (session: CalendarSession) => void;
  onCancel: (session: CalendarSession) => void;
};

export function SessionList({
  sessions,
  onView,
  onEdit,
  onDuplicate,
  onCancel,
}: SessionListProps) {
  const groups = groupSessionsByDate(sessions);

  if (groups.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 px-6 py-16 text-center">
        <p className="text-sm font-medium text-zinc-700">No sessions found</p>
        <p className="mt-1 text-sm text-zinc-500">
          Try adjusting filters or add a new session.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.date}>
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-zinc-500 uppercase">
            {group.displayDate}
          </h2>
          <div className="space-y-3">
            {group.sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onView={onView}
                onEdit={onEdit}
                onDuplicate={onDuplicate}
                onCancel={onCancel}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
