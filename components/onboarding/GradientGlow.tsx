export function GradientGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[min(100%,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-3xl"
      style={{
        background:
          "radial-gradient(ellipse at center, var(--meuse-glow) 0%, transparent 70%)",
      }}
    />
  );
}
