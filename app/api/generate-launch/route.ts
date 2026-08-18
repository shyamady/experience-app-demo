import { buildFallbackLaunch } from "@/lib/launch/fallback";
import { generateLaunchWithOpenAI } from "@/lib/launch/generate";
import type { GenerateLaunchRequest } from "@/types/launch";
import { NextResponse } from "next/server";

function isGenerateLaunchRequest(
  value: unknown,
): value is GenerateLaunchRequest {
  if (typeof value !== "object" || value === null) return false;

  const body = value as Record<string, unknown>;
  const needs = Array.isArray(body.needs)
    ? body.needs
    : body.frequency
      ? ["Funding", "Participants"]
      : null;

  return (
    typeof body.activity === "string" &&
    Array.isArray(needs) &&
    needs.every((item) => typeof item === "string") &&
    Array.isArray(body.participation) &&
    body.participation.every((item) => typeof item === "string") &&
    (body.category === undefined || typeof body.category === "string") &&
    (body.knownDetails === undefined || typeof body.knownDetails === "string")
  );
}

function toGenerateLaunchRequest(value: unknown): GenerateLaunchRequest {
  const body = value as Record<string, unknown>;
  const needs = Array.isArray(body.needs)
    ? body.needs.filter((item): item is string => typeof item === "string")
    : ["Funding", "Participants"];

  return {
    activity: String(body.activity),
    category: typeof body.category === "string" ? body.category : undefined,
    needs,
    knownDetails:
      typeof body.knownDetails === "string" ? body.knownDetails : undefined,
    participation: Array.isArray(body.participation)
      ? body.participation.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
  };
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isGenerateLaunchRequest(body)) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    const launchRequest = toGenerateLaunchRequest(body);

    try {
      const launch = await generateLaunchWithOpenAI(launchRequest);
      return NextResponse.json(launch);
    } catch (error) {
      console.error("generate-launch: OpenAI failed, using fallback", error);
      return NextResponse.json(buildFallbackLaunch(launchRequest));
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to generate launch." },
      { status: 500 },
    );
  }
}
