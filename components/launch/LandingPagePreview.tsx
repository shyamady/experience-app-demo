import { PublicLandingPage } from "@/components/launch/PublicLandingPage";
import type { LaunchData } from "@/lib/launch/types";

type LandingPagePreviewProps = {
  data: LaunchData;
};

export function LandingPagePreview({ data }: LandingPagePreviewProps) {
  return (
    <div className="mx-auto w-full max-w-[320px]">
      <div className="mb-3 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          Live preview
        </p>
      </div>
      <div className="rounded-[2.25rem] border-[6px] border-zinc-900 bg-zinc-900 p-2 shadow-meuse-card">
        <div className="overflow-hidden rounded-[1.75rem] bg-white">
          <div className="flex items-center justify-center py-2">
            <div className="h-1 w-16 rounded-full bg-zinc-200" />
          </div>
          <div className="max-h-[640px] overflow-y-auto">
            <PublicLandingPage data={data} compact />
          </div>
        </div>
      </div>
    </div>
  );
}
