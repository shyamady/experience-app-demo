"use client";

import { useCallback, useId, useRef } from "react";
import type { GoalType } from "@/lib/onboarding/goal";
import { formatStepLabel, snapGoalValue } from "@/lib/onboarding/goal";

type GoalValueSliderProps = {
  type: GoalType;
  min: number;
  max: number;
  step: number;
  value: number;
  milestones: readonly number[];
  onChange: (value: number) => void;
};

export function GoalValueSlider({
  type,
  min,
  max,
  step,
  value,
  milestones,
  onChange,
}: GoalValueSliderProps) {
  const sliderId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const clamped = Math.min(max, Math.max(min, value));
  const percent = max === min ? 0 : ((clamped - min) / (max - min)) * 100;

  const setFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const raw = min + ratio * (max - min);
      const snapped = Math.round(raw / step) * step;
      onChange(snapGoalValue(type, snapped));
    },
    [max, min, onChange, step, type],
  );

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    event.preventDefault();
    setFromClientX(event.clientX);
  }

  return (
    <div className="select-none">
      <div
        ref={trackRef}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clamped}
        aria-labelledby={sliderId}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowUp") {
            onChange(snapGoalValue(type, clamped + step));
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
            onChange(snapGoalValue(type, clamped - step));
          }
        }}
        className="relative h-14 cursor-pointer touch-none overscroll-x-contain"
      >
        <div className="pointer-events-none absolute inset-y-0 left-5 right-5">
          <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-full bg-pink-100" />
          <div
            className="absolute top-1/2 left-0 h-3 -translate-y-1/2 rounded-full meuse-gradient-bg"
            style={{ width: `${percent}%` }}
          />
          {milestones.map((mark) => {
            const markPercent = ((mark - min) / (max - min)) * 100;
            return (
              <span
                key={mark}
                className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-pink-200"
                style={{ left: `${markPercent}%` }}
              />
            );
          })}
        </div>
        <div
          className="pointer-events-none absolute top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-white meuse-gradient-bg shadow-lg shadow-pink-300/70"
          style={{ left: `calc(1.25rem + ${percent} * (100% - 2.5rem) / 100)` }}
        />
      </div>

      <div className="mt-2 flex justify-between px-1 text-xs font-semibold text-zinc-400">
        {milestones.map((mark) => (
          <span key={mark}>{formatStepLabel(type, mark)}</span>
        ))}
      </div>
    </div>
  );
}
