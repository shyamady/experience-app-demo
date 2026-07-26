export type SessionStatus =
  | "draft"
  | "published"
  | "selling-fast"
  | "sold-out"
  | "completed"
  | "cancelled";

export type SessionFormat = "online" | "in-person";

export type RecurrenceRule =
  | { type: "none" }
  | {
      type: "weekly" | "biweekly" | "monthly" | "custom";
      dayOfWeek?: string;
      intervalWeeks?: number;
      endsAfter?: number;
      endDate?: string;
      excludedDates?: string[];
    };

export type SessionProductInventory = {
  productId: string;
  productName: string;
  price: number;
  sold: number;
  capacity: number | null;
  paused: boolean;
  soldOut: boolean;
};

export type SessionAttendee = {
  id: string;
  name: string;
  email: string;
  productName: string;
  quantity: number;
  paymentStatus: "paid" | "pending" | "refunded";
  attendanceStatus: "registered" | "checked-in" | "no-show";
};

export type SessionUpdate = {
  id: string;
  title: string;
  message: string;
  publishedAt: string;
};

export type SessionContentItem = {
  id: string;
  type: "livestream" | "replay" | "download" | "gift" | "materials";
  title: string;
  url?: string;
};

export type CalendarSession = {
  id: string;
  title: string;
  experienceId: string;
  experienceTitle: string;
  description: string;
  format: SessionFormat;
  date: string;
  displayDate: string;
  startTime: string;
  endTime: string;
  timezone: string;
  meetingLink?: string;
  location?: string;
  status: SessionStatus;
  attendeeCount: number;
  revenue: number;
  seriesId?: string;
  recurrenceLabel?: string;
  inventory: SessionProductInventory[];
  attendees: SessionAttendee[];
  updates: SessionUpdate[];
  content: SessionContentItem[];
};

export type CalendarExperienceOption = {
  id: string;
  title: string;
};

export type SessionFormValues = {
  title: string;
  experienceId: string;
  description: string;
  format: SessionFormat;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  meetingLink: string;
  location: string;
  recurrenceType: "none" | "weekly" | "biweekly" | "monthly" | "custom";
  recurrenceDay: string;
  endsAfter: number;
};

export type CalendarViewMode = "list" | "calendar";

export type SessionFormatFilter = "all" | "online" | "in-person";

export type SessionStatusFilter = "all" | SessionStatus;

export type RecurrenceEditScope =
  | "this"
  | "this-and-future"
  | "all";
