import { getHostUpdates, type HostUpdate } from "@/lib/dashboard/host-updates";

export function UpdatesPanel({ campaignId }: { campaignId: string }) {
  const updates = getHostUpdates(campaignId);

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Updates</h2>
      <div className="mt-5 space-y-5">
        {updates.length === 0 ? (
          <p className="text-sm text-zinc-400">No public updates yet.</p>
        ) : (
          updates.map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))
        )}
      </div>
    </section>
  );
}

function UpdateCard({ update }: { update: HostUpdate }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-meuse-card">
      {update.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={update.imageUrl}
          alt=""
          className="h-48 w-full object-cover"
        />
      )}
      <div className="px-5 py-5">
        <p className="text-sm text-zinc-400">
          {new Date(update.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
        <h3 className="mt-1 text-lg font-bold text-zinc-900">{update.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">{update.body}</p>
      </div>
    </article>
  );
}
