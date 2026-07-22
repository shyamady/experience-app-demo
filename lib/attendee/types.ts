export type AttendeeExperienceStatus =
  | "upcoming"
  | "active"
  | "completed"
  | "cancelled";

export type SessionFormat = "online" | "in-person" | "hybrid";

export type SessionStatus = "confirmed" | "pending" | "cancelled";

export type ProductAccessType =
  | "online"
  | "in-person"
  | "gift"
  | "monthly";

export type ContentType =
  | "live"
  | "replay"
  | "video"
  | "download"
  | "gift";

export type ContentAvailability =
  | "available"
  | "unlocks-after-session"
  | "coming-soon"
  | "expired";

export type ChecklistItem = {
  id: string;
  label: string;
  completed: boolean;
  ctaLabel?: string;
  href?: string;
};

export type AttendeeProfile = {
  id: string;
  name: string;
  firstName: string;
  email: string;
  avatarUrl: string;
  timezone: string;
  preferences: {
    emailNotifications: boolean;
    sessionReminders: boolean;
    creatorUpdates: boolean;
  };
};

export type NextSession = {
  experienceId: string;
  experienceTitle: string;
  creatorName: string;
  creatorAvatarUrl: string;
  sessionDate: string;
  sessionTime: string;
  timezone: string;
  format: SessionFormat;
  countdownLabel: string;
  status: SessionStatus;
  joinAvailable: boolean;
  joinLinkHint: string;
  primaryCta: string;
};

export type PurchasedPackage = {
  experienceId: string;
  productImageUrl: string;
  packageName: string;
  pricePaid: number;
  purchaseDate: string;
  includes: string[];
  accessType: ProductAccessType;
};

export type AttendeeUpdate = {
  id: string;
  creatorName: string;
  creatorAvatarUrl: string;
  experienceName: string;
  title: string;
  message: string;
  publishedAt: string;
  read: boolean;
};

export type AttendeeContent = {
  id: string;
  thumbnailUrl: string;
  title: string;
  experienceName: string;
  contentType: ContentType;
  availability: ContentAvailability;
  expirationDate?: string;
  ctaLabel: string;
};

export type AttendeeExperience = {
  id: string;
  coverImageUrl: string;
  title: string;
  creatorName: string;
  creatorAvatarUrl: string;
  packageName: string;
  nextSessionDate: string;
  status: AttendeeExperienceStatus;
  pricePaid: number;
  accessType: ProductAccessType;
  primaryCta: string;
  schedule: string[];
  includes: string[];
  participationInstructions: string[];
  orderId: string;
  purchaseDate: string;
  format: SessionFormat;
  location?: string;
  checkInTime?: string;
  waiverSigned?: boolean;
};

export type AttendeeOrder = {
  id: string;
  experience: string;
  packageName: string;
  amount: number;
  purchaseDate: string;
  status: "confirmed" | "refunded" | "pending";
};

export type AttendeeAccountExtras = {
  shippingAddress?: string;
  emergencyContact?: string;
  waiverStatus?: string;
};
