import OpenAI from "openai";
import { enrichLaunchWithImages } from "@/lib/launch/enrich-images";
import {
  LAUNCH_GENERATION_SYSTEM_PROMPT,
  LAUNCH_RESPONSE_JSON_SCHEMA,
} from "@/lib/launch/schema";
import { isLaunchResponse } from "@/lib/launch/validate";
import type { GenerateLaunchRequest, LaunchResponse } from "@/types/launch";

function buildUserPrompt(body: GenerateLaunchRequest): string {
  return [
    "Create monetizable launch products for this creator activity.",
    "",
    `Activity: ${body.activity}`,
    `Frequency: ${body.frequency}`,
    `Participation: ${body.participation.join(", ")}`,
  ].join("\n");
}

export async function generateLaunchWithOpenAI(
  body: GenerateLaunchRequest,
): Promise<LaunchResponse> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const client = new OpenAI({ apiKey });

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

  if (!isLaunchResponse(parsed)) {
    throw new Error("OpenAI returned an invalid launch response.");
  }

  return enrichLaunchWithImages(parsed);
}
