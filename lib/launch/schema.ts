import { PARTICIPATION_CATEGORIES } from "@/lib/launch/categories";

export const LAUNCH_RESPONSE_JSON_SCHEMA = {
  type: "object",
  properties: {
    heroTitle: { type: "string" },
    heroSubtitle: { type: "string" },
    heroDescription: { type: "string" },
    heroImageQuery: { type: "string" },
    goalType: { type: "string", enum: ["funding"] },
    goalValue: { type: "number" },
    suggestedGoalRange: { type: "string" },
    estimateAssumptions: { type: "string" },
    budgetLines: {
      type: "array",
      minItems: 4,
      maxItems: 8,
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          amount: { type: "number" },
          description: { type: "string" },
        },
        required: ["label", "amount", "description"],
        additionalProperties: false,
      },
    },
    products: {
      type: "array",
      minItems: 7,
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: [...PARTICIPATION_CATEGORIES],
          },
          title: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          spots: { type: "integer" },
          imageQuery: { type: "string" },
        },
        required: [
          "category",
          "title",
          "description",
          "price",
          "spots",
          "imageQuery",
        ],
        additionalProperties: false,
      },
    },
    milestones: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
        },
        required: ["title", "description"],
        additionalProperties: false,
      },
    },
  },
  required: [
    "heroTitle",
    "heroSubtitle",
    "heroDescription",
    "heroImageQuery",
    "goalType",
    "goalValue",
    "suggestedGoalRange",
    "estimateAssumptions",
    "budgetLines",
    "products",
    "milestones",
  ],
  additionalProperties: false,
};

export const LAUNCH_GENERATION_SYSTEM_PROMPT = `You are Meuse Campaign Architect. Turn a one-time project idea into a funding campaign with unique offers people can buy, join, influence, or sponsor.

Central principle: would someone genuinely want to pay for this?

Do not use Reward, Perk, Backer, Pledge, Donation, VIP, Inner Circle, General, Premium, Gold, or Silver language.
Do not generate courses, memberships, merchandise, thank-you-only offers, or generic Zoom calls.

heroTitle: a strong specific project title (e.g. Record My First EP in Nashville)
heroSubtitle: a short compelling line under the title
heroDescription: 2–3 sentences that make the project feel real and exciting
heroImageQuery: a short Unsplash-style photo search
goalType: always "funding"
goalValue: use the creator funding target
suggestedGoalRange: a short estimate range
estimateAssumptions: one short sentence that this is an AI starting estimate
budgetLines: 4–6 project-specific cost lines that sum to goalValue (studio, travel, production, etc. — never generic filler)
products: approximately 8 strong Ways to Join offers with a clear price ladder from low-cost support to high-involvement experiences. Add 1 SPONSOR offer only if Sponsor was selected.
milestones: 3–4 short project timeline beats after funding (e.g. Confirm studio, Record sessions, Share progress, Release)

Use only these categories:
SUPPORT
BEHIND THE SCENES
HELP SHAPE IT
TAKE PART
JOIN IN PERSON
WORK WITH ME
SPONSOR

Offer rules:
- Titles specific to THIS project
- One short sentence with a concrete participation right
- Price ladder roughly like: $25, $50, $75, $125, $200, $350, $750, $1500 (adapt to project)
- More exclusive offers have fewer spots
- Higher prices combine proximity, influence, participation, expertise, scarcity, or recognition
- SPONSOR offers include integration, mention, or naming — not logo-only

Output valid JSON only. No Markdown.`;
