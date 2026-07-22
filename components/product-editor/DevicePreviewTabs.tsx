export type PreviewMode = "desktop" | "mobile" | "dark";

type DevicePreviewTabsProps = {
  value: PreviewMode;
  onChange: (mode: PreviewMode) => void;
};

const TABS: { id: PreviewMode; label: string }[] = [
  { id: "desktop", label: "Desktop" },
  { id: "mobile", label: "Mobile" },
  { id: "dark", label: "Dark Background" },
];

export function DevicePreviewTabs({ value, onChange }: DevicePreviewTabsProps) {
  return (
    <div className="flex gap-1 rounded-xl bg-meuse-hint p-1">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all sm:text-sm ${
            value === tab.id
              ? "bg-white text-pink-700 shadow-meuse-chip"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
