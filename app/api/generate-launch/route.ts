import { generateLaunchWithOpenAI } from "@/lib/launch/generate";
import type { GenerateLaunchRequest } from "@/types/launch";
import { NextResponse } from "next/server";

function isGenerateLaunchRequest(value: unknown): value is GenerateLaunchRequest {
  if (typeof value !== "object" || value === null) return false;

  const body = value as Record<string, unknown>;

  return (
    typeof body.activity === "string" &&
    typeof body.frequency === "string" &&
    Array.isArray(body.participation) &&
    body.participation.every((item) => typeof item === "string")
  );
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

    const launch = await generateLaunchWithOpenAI(body);
    return NextResponse.json(launch);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate launch." },
      { status: 500 },
    );
  }
}
