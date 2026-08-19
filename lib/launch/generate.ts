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
  const goalLabel =
    body.goalType === "people"
      ? `${body.goalValue} people`
      : `$${body.goalValue.toLocaleString()}`;

  return [
    "Turn this creator ambition into a simple launch model: what must sell or fill for the project to happen.",
    "",
    `Project idea: ${body.activity}`,
    `Project category: ${body.category || "Not specified"}`,
    `Primary goal type: ${body.goalType}`,
    `Creator goal: ${goalLabel}${body.goalUnsure ? " (not sure — recommend a realistic goal)" : ""}`,
    `Ways to participate: ${body.participation.join(", ")}`,
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
