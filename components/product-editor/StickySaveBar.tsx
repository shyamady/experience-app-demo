type StickySaveBarProps = {
  hasUnsavedChanges: boolean;
  onPreview?: () => void;
  onSaveDraft?: () => void;
  onPublish?: () => void;
};

export function StickySaveBar({
  hasUnsavedChanges,
  onPreview,
  onSaveDraft,
  onPublish,
}: StickySaveBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-pink-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <p
          className={`text-sm font-medium ${
            hasUnsavedChanges ? "text-amber-600" : "text-zinc-400"
          }`}
        >
          {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
        </p>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <button
            type="button"
            onClick={onPreview}
            className="rounded-full border border-pink-200 px-4 py-2.5 text-sm font-semibold text-pink-700 hover:bg-rose-50 lg:hidden"
          >
            Preview Experience
          </button>
          <button
            type="button"
            onClick={onSaveDraft}
            className="rounded-full border border-pink-200 px-4 py-2.5 text-sm font-semibold text-pink-700 hover:bg-rose-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={onPublish}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white meuse-gradient-bg shadow-md shadow-pink-200/50 transition-transform hover:scale-[1.02]"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
