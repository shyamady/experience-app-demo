"use client";

import { useEffect, useState } from "react";
import { PublicLandingPage } from "@/components/launch/PublicLandingPage";
import {
  getCampaignBySlug,
} from "@/lib/launch/storage";
import type { LaunchData } from "@/lib/launch/types";

export default function PublicLaunchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const [data, setData] = useState<LaunchData | null>(null);

  useEffect(() => {
    void params.then(({ slug: resolvedSlug }) => {
      setSlug(resolvedSlug);
      const data = getCampaignBySlug(resolvedSlug);
      setData(data);
    });
  }, [params]);

  if (!slug || !data) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-white px-5">
        <p className="text-sm text-zinc-400">Launch not found</p>
      </div>
    );
  }

  return <PublicLandingPage data={data} />;
}
