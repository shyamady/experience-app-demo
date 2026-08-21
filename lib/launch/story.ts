const STORY_KEY_PREFIX = "project-story-";

export function getStoryStorageKey(projectId: string): string {
  return `${STORY_KEY_PREFIX}${projectId}`;
}

export function hasCompletedProjectStory(projectId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(getStoryStorageKey(projectId)) === "completed";
  } catch {
    return false;
  }
}

export function markProjectStoryCompleted(projectId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getStoryStorageKey(projectId), "completed");
  } catch {
    // ignore quota / private mode
  }
}

export function clearProjectStoryCompletion(projectId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(getStoryStorageKey(projectId));
  } catch {
    // ignore
  }
}
