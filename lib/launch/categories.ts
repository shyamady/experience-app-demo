export const PARTICIPATION_CATEGORIES = [
  "SHAPE IT",
  "CONTRIBUTE",
  "CO-CREATE",
  "JOIN",
  "FOLLOW THE JOURNEY",
  "PARTNER",
] as const;

export const LEGACY_PRODUCT_CATEGORIES = [
  "ONLINE ACCESS",
  "LIVE ONLINE",
  "INTERACTIVE",
  "ONLINE + GIFT",
  "ONLINE Q&A",
  "IN PERSON",
  "MULTI-DAY",
  "SUPPORTER",
  "SPONSOR",
  "PRESENTING SPONSOR",
] as const;

export const PRODUCT_CATEGORIES = [
  ...PARTICIPATION_CATEGORIES,
  ...LEGACY_PRODUCT_CATEGORIES,
] as const;

export type ParticipationCategory = (typeof PARTICIPATION_CATEGORIES)[number];
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
