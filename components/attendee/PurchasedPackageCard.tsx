import type { PurchasedPackage } from "@/lib/attendee/types";
import { formatAttendeeCurrency } from "@/lib/attendee/formatting";

type PurchasedPackageCardProps = {
  package: PurchasedPackage;
};

export function PurchasedPackageCard({ package: pkg }: PurchasedPackageCardProps) {
  return (
    <section className="rounded-meuse border border-pink-100 bg-white p-5 shadow-meuse-card sm:p-6">
      <h2 className="text-lg font-bold text-zinc-900">Your package</h2>

      <div className="mt-4 flex gap-4">
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-meuse-hint">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pkg.productImageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-zinc-900">{pkg.packageName}</p>
          <p className="mt-1 text-sm text-pink-600">
            {formatAttendeeCurrency(pkg.pricePaid)} paid
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Purchased {pkg.purchaseDate}
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-pink-50 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          What&apos;s included
        </p>
        <ul className="mt-2 space-y-1.5">
          {pkg.includes.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-zinc-600"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
