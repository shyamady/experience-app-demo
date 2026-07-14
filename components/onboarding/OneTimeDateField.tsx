type OneTimeDateFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function OneTimeDateField({ value, onChange }: OneTimeDateFieldProps) {
  return (
    <div
      className="meuse-fade-in-up rounded-meuse-sm bg-meuse-hint px-3.5 py-3 sm:px-4"
      style={{ animationDelay: "0.05s" }}
    >
      <p className="mb-2 text-sm font-medium text-zinc-700">
        When is it happening?
      </p>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-pink-100 bg-white px-3 py-2 text-sm text-zinc-900 shadow-meuse-chip focus:border-pink-300 focus:outline-none"
        aria-label="Event date"
      />
    </div>
  );
}
