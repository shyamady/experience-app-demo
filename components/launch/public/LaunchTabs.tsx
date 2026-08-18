export type LaunchTabId = "participate" | "cocreate" | "updates";

const TABS: { id: LaunchTabId; label: string }[] = [
  { id: "participate", label: "Participate" },
  { id: "cocreate", label: "Co-Create" },
  { id: "updates", label: "Updates" },
];

type LaunchTabsProps = {
  active: LaunchTabId;
  onChange: (tab: LaunchTabId) => void;
  sticky?: boolean;
};

export function LaunchTabs({ active, onChange, sticky = true }: LaunchTabsProps) {
  return (
    <div
      className={`border-b border-zinc-100 bg-white/95 backdrop-blur-sm ${
        sticky ? "sticky top-12 z-20" : ""
      }`}
    >
      <div className="flex">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`relative flex-1 py-3 text-sm font-semibold transition-colors ${
                isActive ? "text-pink-600" : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-6 bottom-0 h-0.5 rounded-full meuse-gradient-bg" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
