import { PRODUCT_CATEGORIES } from "@/lib/launch/categories";

export const LAUNCH_RESPONSE_JSON_SCHEMA = {
  type: "object",
  properties: {
    heroTitle: { type: "string" },
    heroDescription: { type: "string" },
    estimatedRevenue: { type: "string" },
    products: {
      type: "array",
      minItems: 5,
      maxItems: 8,
      items: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: [...PRODUCT_CATEGORIES],
          },
          title: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          capacity: { type: "string" },
          imageQuery: { type: "string" },
        },
        required: [
          "category",
          "title",
          "description",
          "price",
          "capacity",
          "imageQuery",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["heroTitle", "heroDescription", "estimatedRevenue", "products"],
  additionalProperties: false,
};

export const LAUNCH_GENERATION_SYSTEM_PROMPT = `You are an expert creator monetization strategist.

Your job is to turn a creator's upcoming activity into monetizable experiences.

Generate between 5 and 8 launch products.

The products should match the creator's activity and selected participation methods.

Products must use the correct category labels.

Supported categories include:

ONLINE ACCESS
LIVE ONLINE
INTERACTIVE
ONLINE + GIFT
ONLINE Q&A
IN PERSON
MULTI-DAY
SUPPORTER
SPONSOR
PRESENTING SPONSOR

If the user selected Support during onboarding:

Always generate at least two sponsor products.
Use the categories:
SPONSOR
PRESENTING SPONSOR

Do not classify sponsor products as ONLINE.

Sponsor products should include sponsor-related titles, descriptions, pricing, and benefits.

For every product generate:

- category
- title
- description
- price
- capacity
- imageQuery

Also generate:

- heroTitle
- heroDescription
- estimatedRevenue

Return the correct category value in the JSON so the UI displays the proper category badge.

The output must be valid JSON matching the provided schema.

Do not include explanations.

Do not include Markdown.`;
