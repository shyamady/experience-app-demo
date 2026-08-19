import { buildFallbackLaunch } from "@/lib/launch/fallback";
import { normalizeLaunchResponse } from "@/lib/launch/validate";
import type { GenerateLaunchRequest, LaunchResponse } from "@/types/launch";

type GenerateLaunchErrorResponse = {
  error: string;
};

const GENERATE_LAUNCH_TIMEOUT_MS = 45_000;

export async function requestLaunchGeneration(
  body: GenerateLaunchRequest,
  signal?: AbortSignal,
): Promise<LaunchResponse> {
  try {
    const timeoutSignal = AbortSignal.timeout(GENERATE_LAUNCH_TIMEOUT_MS);
    const response = await fetch("/api/generate-launch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: signal
        ? AbortSignal.any([signal, timeoutSignal])
        : timeoutSignal,
    });

    const data: unknown = await response.json();

    if (!response.ok || (isRecord(data) && "error" in data)) {
      throw new Error(
        isGenerateLaunchError(data) ? data.error : "Failed to generate launch.",
      );
    }

    const launch = normalizeLaunchResponse(data, {
      type: body.goalType,
      value: body.goalUnsure ? 0 : body.goalValue,
    });
    if (!launch) {
      throw new Error("Failed to generate launch.");
    }

    return launch;
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }

    console.error("generate-launch: using local fallback", error);
    return buildFallbackLaunch(body);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isGenerateLaunchError(
  value: unknown,
): value is GenerateLaunchErrorResponse {
  return isRecord(value) && typeof value.error === "string";
}
