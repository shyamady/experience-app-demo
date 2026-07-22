export type ExperienceHeroBadge =
  | "Live Experience"
  | "Creator Access"
  | "Limited Availability";

export type AccessBadge =
  | "Live Access"
  | "Interactive Access"
  | "VIP Access"
  | "Gift Access"
  | "Monthly Support"
  | "Sponsor Access";

export type PriceType = "one-time" | "monthly";

export type AvailabilityKind = "unlimited" | "limited" | "open";

export type PublicExperienceProduct = {
  id: string;
  title: string;
  accessBadge: AccessBadge;
  price: number;
  priceType: PriceType;
  availabilityKind: AvailabilityKind;
  availabilityLabel: string;
  remainingSpots?: number;
  description: string;
  includes: string[];
  imageUrl: string;
};

export type PublicExperienceData = {
  creator: {
    name: string;
    avatarUrl: string;
    bio: string;
    followerCount: string;
  };
  experience: {
    title: string;
    description: string;
    location: string;
    schedule: string;
    coverImageUrl: string;
    heroBadge: ExperienceHeroBadge;
    about: {
      what: string;
      why: string;
      how: string;
      afterPurchase: string;
    };
  };
  products: PublicExperienceProduct[];
};
