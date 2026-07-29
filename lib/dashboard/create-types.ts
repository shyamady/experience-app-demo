export type CalendarEventStatus = "upcoming" | "past" | "unavailable";

export type CalendarEventCategory =
  | "dinner"
  | "recording"
  | "travel"
  | "brand"
  | "fitness"
  | "performance"
  | "other";

export type CalendarEvent = {
  id: string;
  title: string;
  startAt: string;
  endAt?: string;
  displayDate: string;
  displayTime: string;
  location?: string;
  description?: string;
  category: CalendarEventCategory;
  status: CalendarEventStatus;
  opportunityLabel: string;
  productIdeas: Array<{ title: string; type: string }>;
};

export type CreatorProfile = {
  name: string;
  category: string;
  location: string;
  audienceSize: string;
  audienceDemographics: string;
  previousProducts: string[];
  upcomingActivities: string[];
};

export type InspirationProduct = {
  title: string;
  price?: number;
  type: string;
};

export type InspirationExperience = {
  id: string;
  title: string;
  creatorName: string;
  creatorCategory: string;
  thumbnail: string;
  location?: string;
  format: string;
  description: string;
  metrics: {
    ticketsSold?: number;
    gmv?: number;
    capacity?: number;
    membersJoined?: number;
    status?: string;
  };
  performanceSignal: string;
  relevanceLabel?: string;
  products: InspirationProduct[];
  relevanceReason: string;
};

export type RemixResult = {
  inspiredBy: string;
  generatedTitle: string;
  suggestedProducts: string[];
  prompt: string;
};
