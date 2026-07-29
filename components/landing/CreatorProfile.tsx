type CreatorProfileProps = {
  name: string;
  role: string;
  handle?: string;
  avatarUrl: string;
};

export function CreatorProfile({
  name,
  role,
  handle,
  avatarUrl,
}: CreatorProfileProps) {
  return (
    <div className="flex items-center gap-3.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatarUrl}
        alt=""
        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white shadow-meuse-chip sm:h-14 sm:w-14"
      />
      <div className="min-w-0">
        <p className="font-semibold text-zinc-900">{name}</p>
        <p className="mt-0.5 text-sm text-zinc-500">{role}</p>
        {handle && (
          <p className="mt-0.5 text-sm text-pink-600">{handle}</p>
        )}
      </div>
    </div>
  );
}
