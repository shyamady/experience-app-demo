type GenerationErrorCardProps = {
  onRetry: () => void;
};

export function GenerationErrorCard({ onRetry }: GenerationErrorCardProps) {
  return (
    <div className="rounded-meuse border border-pink-100 bg-white px-5 py-6 text-center shadow-meuse-card sm:px-6">
      <h2 className="text-lg font-semibold text-zinc-900">Something went wrong</h2>
      <p className="mt-2 text-sm text-zinc-500">
        We couldn&apos;t generate your experiences right now. Please try again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white meuse-gradient-bg shadow-lg shadow-pink-200/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        Try Again
      </button>
    </div>
  );
}
