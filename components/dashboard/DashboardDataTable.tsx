import type { ReactNode } from "react";

type DashboardDataTableProps = {
  children: ReactNode;
  className?: string;
};

export function DashboardDataTable({
  children,
  className = "",
}: DashboardDataTableProps) {
  return (
    <div
      className={`overflow-hidden rounded-meuse border border-pink-100 bg-white shadow-meuse-card ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-pink-50">{children}</table>
      </div>
    </div>
  );
}

export function DashboardTableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-zinc-50/80">
      <tr>{children}</tr>
    </thead>
  );
}

export function DashboardTableHeaderCell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500 sm:px-6 ${className}`}
    >
      {children}
    </th>
  );
}

export function DashboardTableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-pink-50">{children}</tbody>;
}

export function DashboardTableRow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr className={`transition-colors hover:bg-zinc-50/60 ${className}`}>
      {children}
    </tr>
  );
}

export function DashboardTableCell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={`whitespace-nowrap px-4 py-4 text-sm sm:px-6 ${className}`}>
      {children}
    </td>
  );
}
