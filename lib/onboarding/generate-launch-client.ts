import type { GenerateLaunchRequest, LaunchResponse } from "@/types/launch";
import { isLaunchResponse } from "@/lib/launch/validate";

type GenerateLaunchErrorResponse = {
  error: string;
};

export async function requestLaunchGeneration(
  body: GenerateLaunchRequest,
): Promise<LaunchResponse> {
  const response = await fetch("/api/generate-launch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: LaunchResponse | GenerateLaunchErrorResponse =
    await response.json();

  if (!response.ok || "error" in data) {
    throw new Error(
      "error" in data ? data.error : "Failed to generate launch.",
    );
  }

  if (!isLaunchResponse(data)) {
    throw new Error("Failed to generate launch.");
  }

  return data;
}
