import type { LaunchData } from "@/lib/launch/types";
import { getLaunchPublicUrl } from "@/lib/launch/storage";

type PublishSuccessPanelProps = {
  data: LaunchData;
};

export function PublishSuccessPanel({ data }: PublishSuccessPanelProps) {
  const publicUrl = getLaunchPublicUrl(data.slug);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(publicUrl);
    } catch {
      // Demo fallback — clipboard may be unavailable
    }
  }

  return (
    <div className="rounded-meuse bg-meuse-bubble p-5 shadow-meuse-card">
      <p className="text-sm font-semibold text-pink-600">Launch published!</p>
      <p className="mt-1 text-sm text-zinc-600">
        Your landing page is live and ready to share.
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-pink-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-rose-50"
        >
          Copy link
        </button>
        <a
          href={publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-4 py-2.5 text-center text-sm font-semibold text-white meuse-gradient-bg"
        >
          Open landing page
        </a>
        <button
          type="button"
          onClick={() => {
            if (navigator.share) {
              void navigator.share({
                title: data.title,
                url: publicUrl,
              });
            }
          }}
          className="rounded-full border border-pink-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-rose-50"
        >
          Share
        </button>
      </div>
    </div>
  );
}
