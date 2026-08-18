import Link from "next/link";

export function RecentRegistrations() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-zinc-900">
          Recent Registrations
        </h2>
        <Link
          href="/dashboard/attendees"
          className="text-sm font-semibold text-[#FF4F9A]"
        >
          All Guests →
        </Link>
      </div>
      <div className="rounded-2xl border border-zinc-200/80 bg-white px-5 py-10 text-center shadow-sm">
        <p className="text-sm text-zinc-500">
          No registrations yet. Share your page to get your first guest.
        </p>
      </div>
    </section>
  );
}
