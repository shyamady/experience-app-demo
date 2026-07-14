export const PRODUCT_CATEGORIES = [
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

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
