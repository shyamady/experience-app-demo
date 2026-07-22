import type {
  AttendeeExperienceStatus,
  ContentAvailability,
  ContentType,
  SessionFormat,
  SessionStatus,
} from "@/lib/attendee/types";

export function formatAttendeeCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getExperienceStatusStyles(status: AttendeeExperienceStatus): string {
  switch (status) {
    case "upcoming":
      return "bg-sky-50 text-sky-700 ring-sky-600/20";
    case "active":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
    case "completed":
      return "bg-zinc-100 text-zinc-600 ring-zinc-500/10";
    case "cancelled":
      return "bg-rose-50 text-rose-700 ring-rose-600/20";
  }
}

export function getSessionStatusStyles(status: SessionStatus): string {
  switch (status) {
    case "confirmed":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
    case "pending":
      return "bg-amber-50 text-amber-700 ring-amber-600/20";
    case "cancelled":
      return "bg-rose-50 text-rose-700 ring-rose-600/20";
  }
}

export function getFormatLabel(format: SessionFormat): string {
  switch (format) {
    case "online":
      return "Online";
    case "in-person":
      return "In person";
    case "hybrid":
      return "Hybrid";
  }
}

export function getFormatStyles(format: SessionFormat): string {
  switch (format) {
    case "online":
      return "bg-fuchsia-50 text-fuchsia-700";
    case "in-person":
      return "bg-violet-50 text-violet-700";
    case "hybrid":
      return "bg-indigo-50 text-indigo-700";
  }
}

export function getContentAvailabilityLabel(
  availability: ContentAvailability,
): string {
  switch (availability) {
    case "available":
      return "Available now";
    case "unlocks-after-session":
      return "Unlocks after session";
    case "coming-soon":
      return "Coming soon";
    case "expired":
      return "Expired";
  }
}

export function getContentAvailabilityStyles(
  availability: ContentAvailability,
): string {
  switch (availability) {
    case "available":
      return "text-emerald-600";
    case "unlocks-after-session":
      return "text-amber-600";
    case "coming-soon":
      return "text-zinc-500";
    case "expired":
      return "text-rose-600";
  }
}

export function getContentTypeLabel(type: ContentType): string {
  switch (type) {
    case "live":
      return "Live";
    case "replay":
      return "Replay";
    case "video":
      return "Video";
    case "download":
      return "Download";
    case "gift":
      return "Gift";
  }
}

export function capitalizeStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
