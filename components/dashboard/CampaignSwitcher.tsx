"use client";

import { useEffect, useRef, useState } from "react";
import { useCampaign } from "@/lib/dashboard/campaign-context";

type CampaignSwitcherProps = {
  className?: string;
};

export function CampaignSwitcher({ className = "" }: CampaignSwitcherProps) {
  const { campaigns, activeCampaign, switchCampaign, createCampaign } =
    useCampaign();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex max-w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-zinc-50"
      >
        <span className="truncate text-sm font-semibold text-zinc-900">
          {activeCampaign.name}
        </span>
        <ChevronIcon
          className={`h-3.5 w-3.5 shrink-0 text-zinc-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Campaigns"
          className="absolute top-[calc(100%+0.25rem)] left-0 z-50 w-64 overflow-hidden rounded-xl border border-pink-100 bg-white py-1 shadow-lg shadow-pink-100/60"
        >
          <div className="max-h-64 overflow-y-auto py-1">
            {campaigns.map((campaign) => {
              const isActive = campaign.id === activeCampaign.id;

              return (
                <button
                  key={campaign.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    switchCampaign(campaign.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-rose-50 text-pink-700"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <CampaignDot
                    className={isActive ? "bg-pink-500" : "bg-zinc-300"}
                  />
                  <span className="min-w-0 flex-1 truncate font-medium">
                    {campaign.name}
                  </span>
                  {isActive && (
                    <CheckIcon className="h-3.5 w-3.5 shrink-0 text-pink-600" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-pink-50 px-1 py-1">
            <button
              type="button"
              onClick={() => {
                createCampaign();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
            >
              <PlusIcon className="h-4 w-4 text-zinc-400" />
              New Campaign
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CampaignDot({ className }: { className?: string }) {
  return (
    <span
      className={`h-2 w-2 shrink-0 rounded-full ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
