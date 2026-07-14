export const GENERATING_STATUS_MESSAGES = [
  "Understanding your activity",
  "Matching fan participation options",
  "Creating experience ideas",
  "Setting prices and capacity",
  "Preparing your launch",
] as const;

export const GENERATING_FINAL_MESSAGE_INDEX =
  GENERATING_STATUS_MESSAGES.length - 1;

export const GENERATING_MIN_DURATION_MS = 4000;
export const GENERATING_FINAL_MESSAGE_START_MS = 2800;
export const GENERATING_FINAL_MESSAGE_HOLD_MS = 1000;

export const GENERATING_STATUS_SCHEDULE = [
  { time: 500, index: 0 },
  { time: 1100, index: 1 },
  { time: 1700, index: 2 },
  { time: 2300, index: 3 },
  { time: GENERATING_FINAL_MESSAGE_START_MS, index: GENERATING_FINAL_MESSAGE_INDEX },
] as const;

export const GENERATING_DURATION_MS = GENERATING_MIN_DURATION_MS;

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
