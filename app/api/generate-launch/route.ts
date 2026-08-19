import { buildFallbackLaunch } from "@/lib/launch/fallback";
import { generateLaunchWithOpenAI } from "@/lib/launch/generate";
import type { GenerateLaunchRequest } from "@/types/launch";
import { NextResponse } from "next/server";

function toGenerateLaunchRequest(value: unknown): GenerateLaunchRequest | null {
  if (typeof value !== "object" || value === null) return null;
  const body = value as Record<string, unknown>;
  if (typeof body.activity !== "string") return null;
  if (!Array.isArray(body.participation)) return null;

  const goalType =
    body.goalType === "people" || body.goalType === "funding"
      ? body.goalType
      : Array.isArray(body.needs) &&
          body.needs.some((item) => String(item).toLowerCase().includes("fund"))
        ? "funding"
        : "people";

  const goalValue =
    typeof body.goalValue === "number" && Number.isFinite(body.goalValue)
      ? body.goalValue
      : goalType === "people"
        ? 50
        : 10000;

  return {
    activity: body.activity,
    category: typeof body.category === "string" ? body.category : undefined,
    goalType,
    goalValue,
    goalUnsure: Boolean(body.goalUnsure),
    participation: body.participation.filter(
      (item): item is string => typeof item === "string",
    ),
    knownDetails:
      typeof body.knownDetails === "string" ? body.knownDetails : undefined,
  };
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const launchRequest = toGenerateLaunchRequest(body);

    if (!launchRequest) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

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
