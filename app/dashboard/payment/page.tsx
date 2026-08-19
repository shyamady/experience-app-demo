import { GlobalDashboardShell } from "@/components/dashboard/GlobalDashboardShell";

export default function PaymentPage() {
  return (
    <GlobalDashboardShell>
      <section className="rounded-2xl border border-zinc-200/80 bg-white px-6 py-12 text-center shadow-sm">
        <h1 className="text-xl font-bold text-zinc-900">Payment</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
          Connect Stripe to collect participation and sponsorship payments.
          Setup stays outside the launch tabs so it stays simple.
        </p>
      </section>
    </GlobalDashboardShell>
  );
}
