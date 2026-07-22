const TRUST_ITEMS = [
  {
    title: "Secure payment",
    description: "Encrypted checkout powered by industry-standard processors.",
    icon: "shield",
  },
  {
    title: "Creator-approved experience",
    description: "Every tier is reviewed and approved by Sarah before launch.",
    icon: "check",
  },
  {
    title: "Refund policy",
    description: "Full refunds available up to 48 hours before your session.",
    icon: "refresh",
  },
  {
    title: "Event updates by email",
    description: "Calendar invites, reminders, and access links sent automatically.",
    icon: "mail",
  },
] as const;

export function TrustSection() {
  return (
    <section className="rounded-meuse border border-pink-100 bg-meuse-hint/60 p-5 sm:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Good to know
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="flex gap-3">
            <TrustIcon name={item.icon} className="mt-0.5 h-5 w-5 shrink-0 text-pink-500" />
            <div>
              <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustIcon({
  name,
  className,
}: {
  name: (typeof TRUST_ITEMS)[number]["icon"];
  className?: string;
}) {
  const props = { className, "aria-hidden": true as const };

  switch (name) {
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "refresh":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
  }
}
