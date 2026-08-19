import { GlobalDashboardShell } from "@/components/dashboard/GlobalDashboardShell";

export default function InvitePage() {
  return (
    <GlobalDashboardShell>
      <section className="rounded-2xl border border-zinc-200/80 bg-white px-6 py-12 text-center shadow-sm">
        <h1 className="text-xl font-bold text-zinc-900">Invite</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
          Share your Launch Page with the people who can help make it real.
        </p>
      </section>
    </GlobalDashboardShell>
  );
}
