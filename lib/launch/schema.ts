import { PARTICIPATION_CATEGORIES } from "@/lib/launch/categories";

export const LAUNCH_RESPONSE_JSON_SCHEMA = {
  type: "object",
  properties: {
    heroTitle: { type: "string" },
    heroDescription: { type: "string" },
    heroImageQuery: { type: "string" },
    goalType: { type: "string", enum: ["people", "funding"] },
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
      minItems: 5,
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
  },
  required: [
    "heroTitle",
    "heroDescription",
    "heroImageQuery",
    "goalType",
    "goalValue",
    "suggestedGoalRange",
    "estimateAssumptions",
    "budgetLines",
    "products",
  ],
  additionalProperties: false,
};

export const LAUNCH_GENERATION_SYSTEM_PROMPT = `You are Meuse Launch Architect. Turn a one-time project idea into something the creator can launch and sell.

Do not generate project milestones, weeks, production timelines, or task lists.
Do not generate courses, memberships, weekly sessions, Bronze/Silver/Gold, merchandise, or generic VIP/Inner Circle/General/Premium names unless they truly fit this project.

heroTitle: a short specific project title
heroDescription: ONE sentence describing the idea and the goal
heroImageQuery: a short Unsplash-style photo search
suggestedGoalRange: a short estimate range
estimateAssumptions: one short sentence that this is an AI starting estimate, not a guarantee
budgetLines: 4–8 resource/cost categories that this kind of project actually needs. Sum should be close to the funding need (use goalValue if funding, or a realistic cost if people). Categories must match the project type (trip vs show vs album vs pop-up vs fitness). Each description is one short sentence.
products: 5–7 participation offers PLUS 1–3 PARTNER offers only if Partner was selected

Use only these categories:
SHAPE IT
CONTRIBUTE
CO-CREATE
JOIN
FOLLOW THE JOURNEY
PARTNER

Participation offer rules:
- Titles must feel specific to THIS project (Soundcheck Seat, Setlist Session, Japan Crew, Kitchen Table Seat — not Inner Circle, VIP, General, Gold)
- Include a price ladder with clearly different prices (example shape: $25, $60, $125, $250, $500 — adapt to the project)
- More exclusive offers have fewer spots
- Follow the Journey can be low-cost with higher capacity
- PARTNER offers are sponsorship packages, not tickets
- imageQuery should describe a relevant photo (stage, rehearsal, destination, group, studio, etc.)
- If funding goal, price × spots across participation + partners should come close to goalValue
- If people goal, participation spots should come close to goalValue

Output valid JSON only. No Markdown.`;
