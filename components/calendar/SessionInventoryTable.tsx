"use client";

import type { SessionProductInventory } from "@/lib/dashboard/calendar-types";
import {
  formatCurrency,
  getInventoryStatusLabel,
} from "@/lib/dashboard/calendar-mock-data";
import {
  DashboardDataTable,
  DashboardTableBody,
  DashboardTableCell,
  DashboardTableHead,
  DashboardTableHeaderCell,
  DashboardTableRow,
} from "@/components/dashboard/DashboardDataTable";

type SessionInventoryTableProps = {
  inventory: SessionProductInventory[];
  editable?: boolean;
  onChange?: (inventory: SessionProductInventory[]) => void;
};

export function SessionInventoryTable({
  inventory,
  editable = false,
  onChange,
}: SessionInventoryTableProps) {
  function updateItem(
    productId: string,
    patch: Partial<SessionProductInventory>,
  ) {
    if (!onChange) return;
    onChange(
      inventory.map((item) =>
        item.productId === productId ? { ...item, ...patch } : item,
      ),
    );
  }

  return (
    <DashboardDataTable>
      <DashboardTableHead>
        <DashboardTableHeaderCell>Product</DashboardTableHeaderCell>
        <DashboardTableHeaderCell>Price</DashboardTableHeaderCell>
        <DashboardTableHeaderCell>Sold</DashboardTableHeaderCell>
        <DashboardTableHeaderCell>Capacity</DashboardTableHeaderCell>
        <DashboardTableHeaderCell>Status</DashboardTableHeaderCell>
        {editable && (
          <DashboardTableHeaderCell>Actions</DashboardTableHeaderCell>
        )}
      </DashboardTableHead>
      <DashboardTableBody>
        {inventory.map((item) => {
          const status = getInventoryStatusLabel(item);
          return (
            <DashboardTableRow key={item.productId}>
              <DashboardTableCell className="font-medium text-zinc-900">
                {item.productName}
              </DashboardTableCell>
              <DashboardTableCell className="text-zinc-700">
                {editable ? (
                  <input
                    type="number"
                    min={0}
                    value={item.price}
                    onChange={(e) =>
                      updateItem(item.productId, {
                        price: Number(e.target.value) || 0,
                      })
                    }
                    className="h-8 w-20 rounded-lg border border-zinc-200 px-2 text-sm outline-none focus:border-pink-300"
                  />
                ) : (
                  formatCurrency(item.price)
                )}
              </DashboardTableCell>
              <DashboardTableCell className="text-zinc-700">
                {item.sold}
              </DashboardTableCell>
              <DashboardTableCell className="text-zinc-700">
                {editable ? (
                  <input
                    type="number"
                    min={0}
                    value={item.capacity ?? ""}
                    placeholder="∞"
                    onChange={(e) =>
                      updateItem(item.productId, {
                        capacity:
                          e.target.value === ""
                            ? null
                            : Number(e.target.value),
                      })
                    }
                    className="h-8 w-20 rounded-lg border border-zinc-200 px-2 text-sm outline-none focus:border-pink-300"
                  />
                ) : item.capacity === null ? (
                  "∞"
                ) : (
                  item.capacity
                )}
              </DashboardTableCell>
              <DashboardTableCell>
                <span
                  className={`text-sm font-medium ${
                    status === "Sold Out"
                      ? "text-rose-600"
                      : status === "Paused"
                        ? "text-zinc-400"
                        : status.startsWith("Only")
                          ? "text-amber-600"
                          : "text-emerald-600"
                  }`}
                >
                  {status}
                </span>
              </DashboardTableCell>
              {editable && (
                <DashboardTableCell>
                  <div className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        updateItem(item.productId, {
                          paused: !item.paused,
                          soldOut: item.paused ? item.soldOut : false,
                        })
                      }
                      className="rounded-lg px-2 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100"
                    >
                      {item.paused ? "Reopen" : "Pause"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateItem(item.productId, {
                          soldOut: !item.soldOut,
                          paused: false,
                        })
                      }
                      className="rounded-lg px-2 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100"
                    >
                      {item.soldOut ? "Unmark sold out" : "Sold out"}
                    </button>
                  </div>
                </DashboardTableCell>
              )}
            </DashboardTableRow>
          );
        })}
      </DashboardTableBody>
    </DashboardDataTable>
  );
}
