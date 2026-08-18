import { getCreatorInitials } from "@/lib/dashboard/launch-readiness";

type HostCardProps = {
  name: string;
  email?: string;
  avatarUrl?: string;
};

export function HostCard({
  name,
  email = "hello@meuse.co",
  avatarUrl,
}: HostCardProps) {
  const initials = getCreatorInitials(name);

  return (
    <section className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt=""
          className="h-12 w-12 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF4F9A] text-sm font-bold text-white">
          {initials}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-zinc-900">{name}</p>
        <p className="truncate text-sm text-zinc-500">{email}</p>
      </div>
      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-700 uppercase">
        Creator
      </span>
    </section>
  );
}
