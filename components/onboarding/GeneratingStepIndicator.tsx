export function GeneratingStepIndicator() {
  return (
    <div className="shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 text-center sm:px-8">
      <p className="text-sm font-medium text-zinc-400">Creating Step 4 of 4</p>
      <div className="mx-auto mt-2 flex max-w-xs gap-2">
        <div className="h-1 flex-1 rounded-full meuse-gradient-bg" />
        <div className="h-1 flex-1 rounded-full meuse-gradient-bg" />
        <div className="h-1 flex-1 rounded-full meuse-gradient-bg" />
        <div className="meuse-step-pulse h-1 flex-1 rounded-full bg-pink-200" />
      </div>
    </div>
  );
}
