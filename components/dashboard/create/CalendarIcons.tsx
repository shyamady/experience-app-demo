import type { CalendarEventCategory } from "@/lib/dashboard/create-types";

const ICONS: Record<CalendarEventCategory, string> = {
  dinner: "🍽",
  recording: "🎙",
  travel: "✈️",
  brand: "🤝",
  fitness: "🏃",
  performance: "🎤",
  other: "📅",
};

export function CalendarEventIcon({
  category,
  className = "text-base",
}: {
  category: CalendarEventCategory;
  className?: string;
}) {
  return (
    <span className={className} aria-hidden>
      {ICONS[category]}
    </span>
  );
}

export function GoogleCalendarIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#fff"
        d="M36 6H12a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h24a6 6 0 0 0 6-6V12a6 6 0 0 0-6-6z"
      />
      <path fill="#1A73E8" d="M36 6v8H12V6h24z" />
      <path fill="#EA4335" d="M12 14H6v24a6 6 0 0 0 6 6V14z" />
      <path fill="#34A853" d="M42 14H36v30a6 6 0 0 0 6-6V14z" />
      <path fill="#FBBC04" d="M12 38h24v6H12z" />
      <path fill="#4285F4" d="M18 22h4v4h-4zm8 0h4v4h-4zm-8 8h4v4h-4zm8 0h4v4h-4z" />
    </svg>
  );
}
