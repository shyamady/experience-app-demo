import { LocationPinIcon } from "@/components/icons/LocationPinIcon";

type InPersonLocationFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function InPersonLocationField({
  value,
  onChange,
}: InPersonLocationFieldProps) {
  return (
    <div className="meuse-fade-in-up space-y-1.5">
      <label className="block text-xs font-medium text-zinc-500">
        City or location
      </label>
      <div className="relative">
        <LocationPinIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-300" />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search or enter a location"
          className="w-full rounded-xl border border-pink-100 bg-white py-2 pl-9 pr-3 text-sm text-zinc-900 shadow-meuse-chip placeholder:text-zinc-400 focus:border-pink-300 focus:outline-none"
        />
      </div>
    </div>
  );
}
