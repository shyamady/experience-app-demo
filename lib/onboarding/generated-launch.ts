import type { LaunchResponse } from "@/types/launch";

const STORAGE_KEY = "meuse-generated-launch";

export type GeneratedLaunchState =
  | {
      status: "success";
      data: LaunchResponse;
    }
  | {
      status: "error";
      data: null;
    };

export function saveGeneratedLaunch(state: GeneratedLaunchState) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getGeneratedLaunch(): GeneratedLaunchState | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed: unknown = JSON.parse(stored);
    if (typeof parsed !== "object" || parsed === null) return null;

    const state = parsed as GeneratedLaunchState;
    if (state.status === "success" && state.data) return state;
    if (state.status === "error") return state;

    return null;
  } catch {
    return null;
  }
}

export function clearGeneratedLaunch() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
