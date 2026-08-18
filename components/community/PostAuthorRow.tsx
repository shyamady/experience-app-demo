"use client";

import { DemoImage } from "@/components/community/DemoImage";
import { getPostAvatar } from "@/lib/dashboard/community";
import type { AuthorRole } from "@/lib/dashboard/community";

type PostAuthorRowProps = {
  authorName: string;
  authorRole: AuthorRole;
  authorAvatarUrl?: string;
  meta?: string;
};

export function PostAuthorRow({
  authorName,
  authorRole,
  authorAvatarUrl,
  meta,
}: PostAuthorRowProps) {
  const avatar = getPostAvatar({ authorName, authorAvatarUrl });

  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <DemoImage
        src={avatar}
        alt=""
        className="h-8 w-8 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-zinc-900">
          <span className="truncate">{authorName}</span>
          {authorRole === "host" ? (
            <span className="rounded-full bg-rose-50 px-1.5 py-0.5 text-[0.625rem] font-bold tracking-wide text-pink-600">
              Host
            </span>
          ) : (
            <span className="font-medium text-zinc-400">· Member</span>
          )}
        </p>
        {meta && <p className="text-xs text-zinc-400">{meta}</p>}
      </div>
    </div>
  );
}
