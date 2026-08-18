import Link from "next/link";

const MANAGE_ITEMS = [
  {
    title: "Guests",
    description: "Everyone who bought a ticket, with codes and answers.",
    href: "/dashboard/attendees",
  },
  {
    title: "Registration",
    description: "Tickets, payment plan, capacity, and the questions you ask.",
    href: "/dashboard/products",
  },
  {
    title: "Insights",
    description: "Revenue and sales by ticket type.",
    href: "/dashboard/orders",
  },
  {
    title: "Sponsors",
    description: "Brand deals and who has backed you.",
    href: "/dashboard/sponsors",
  },
  {
    title: "Coupons",
    description: "Coupon codes and extra settings.",
    href: "/dashboard/products",
  },
];

export function ManageGrid() {
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold text-zinc-900">Manage</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {MANAGE_ITEMS.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition hover:border-pink-200"
          >
            <p className="flex items-center gap-1 font-semibold text-zinc-900">
              {item.title}
              <span className="text-[#FF4F9A]">›</span>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-500">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
