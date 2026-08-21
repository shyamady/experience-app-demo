import OpenAI from "openai";
import { enrichLaunchWithImages } from "@/lib/launch/enrich-images";
import {
  LAUNCH_GENERATION_SYSTEM_PROMPT,
  LAUNCH_RESPONSE_JSON_SCHEMA,
} from "@/lib/launch/schema";
import { normalizeLaunchResponse } from "@/lib/launch/validate";
import type { GenerateLaunchRequest, LaunchResponse } from "@/types/launch";

const OPENAI_TIMEOUT_MS = 20_000;

function buildUserPrompt(body: GenerateLaunchRequest): string {
  const goalLabel = `$${body.goalValue.toLocaleString()}`;

  return [
    "Turn this creator idea into a funding campaign with unique offers people can buy, join, influence, or sponsor.",
    "",
    `Project idea: ${body.activity}`,
    `Project category: ${body.category || "Not specified"}`,
    `Funding target: ${goalLabel}${body.goalUnsure ? " (not sure — recommend a realistic target between $500 and $5,000)" : ""}`,
    `Offer kinds selected: ${body.participation.join(", ")}`,
    "",
    "Generate approximately 8 strong Ways to Join offers with a clear price ladder, plus a sponsor offer only if Sponsor was selected.",
  ].join("\n");
}

export async function generateLaunchWithOpenAI(
  body: GenerateLaunchRequest,
): Promise<LaunchResponse> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const client = new OpenAI({
    apiKey,
    timeout: OPENAI_TIMEOUT_MS,
    maxRetries: 0,
  });

  const response = await client.responses.create({
    model: "gpt-5",
    input: [
      {
        role: "system",
        content: LAUNCH_GENERATION_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: buildUserPrompt(body),
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "launch_response",
        strict: true,
        schema: LAUNCH_RESPONSE_JSON_SCHEMA,
      },
    },
  });

  const parsed: unknown = JSON.parse(response.output_text);
  const launch = normalizeLaunchResponse(parsed, {
    type: body.goalType,
    value: body.goalUnsure ? 0 : body.goalValue,
  });

  if (!launch) {
    throw new Error("OpenAI returned an invalid launch response.");
  }

  return enrichLaunchWithImages(launch);
}
