export const PARTICIPATION_CATEGORIES = [
  "SUPPORT",
  "BEHIND THE SCENES",
  "HELP SHAPE IT",
  "TAKE PART",
  "JOIN IN PERSON",
  "WORK WITH ME",
  "SPONSOR",
] as const;

export const LEGACY_PRODUCT_CATEGORIES = [
  "SHAPE IT",
  "CONTRIBUTE",
  "CO-CREATE",
  "JOIN",
  "FOLLOW THE JOURNEY",
  "PARTNER",
  "ONLINE ACCESS",
  "LIVE ONLINE",
  "INTERACTIVE",
  "ONLINE + GIFT",
  "ONLINE Q&A",
  "IN PERSON",
  "MULTI-DAY",
  "SUPPORTER",
  "PRESENTING SPONSOR",
] as const;

export const PRODUCT_CATEGORIES = [
  ...PARTICIPATION_CATEGORIES,
  ...LEGACY_PRODUCT_CATEGORIES,
] as const;

export type ParticipationCategory = (typeof PARTICIPATION_CATEGORIES)[number];
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
