export const GENERATING_PROGRESS_COMPLETE_MS = 650;

const PROGRESS_MAX_BEFORE_COMPLETE = 99.5;

export function getDynamicProgressCap(elapsedMs: number): number {
  const elapsed = Math.max(0, elapsedMs);
  return PROGRESS_MAX_BEFORE_COMPLETE - 28 * Math.exp(-elapsed / 5500);
}

export function advanceContinuousProgress(
  currentProgress: number,
  deltaMs: number,
  targetCap: number,
): number {
  const clampedDelta = Math.max(0, deltaMs);
  const cap = Math.min(PROGRESS_MAX_BEFORE_COMPLETE, targetCap);
  const remaining = cap - currentProgress;

  if (remaining <= 0) {
    return Math.min(
      PROGRESS_MAX_BEFORE_COMPLETE,
      currentProgress + 0.0015 * clampedDelta,
    );
  }

  const easedVelocity = (remaining / PROGRESS_MAX_BEFORE_COMPLETE) * 0.045;
  const minimumVelocity = 0.0025;
  const increment = Math.max(minimumVelocity, easedVelocity) * clampedDelta;

  return Math.min(PROGRESS_MAX_BEFORE_COMPLETE, currentProgress + increment);
}

export function getReadyToCompleteAtMs(
  startedAt: number,
  apiCompletedAt: number,
  minDurationMs: number,
  finalMessageStartMs: number,
  finalMessageHoldMs: number,
): number {
  return Math.max(
    startedAt + minDurationMs,
    startedAt + finalMessageStartMs + finalMessageHoldMs,
    apiCompletedAt,
  );
}

export function animateProgressToTarget(
  from: number,
  to: number,
  durationMs: number,
  onUpdate: (progress: number) => void,
): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - ratio, 3);
      const next = from + (to - from) * eased;

      onUpdate(next);

      if (ratio < 1) {
        requestAnimationFrame(tick);
        return;
      }

      onUpdate(to);
      resolve();
    };

    requestAnimationFrame(tick);
  });
}
