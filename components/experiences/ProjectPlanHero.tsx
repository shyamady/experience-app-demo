"use client";

type ProjectPlanHeroProps = {
  title: string;
  description: string;
  imageUrl: string;
  onChange: (updates: {
    title?: string;
    description?: string;
    imageUrl?: string;
  }) => void;
};

export function ProjectPlanHero({
  title,
  description,
  imageUrl,
  onChange,
}: ProjectPlanHeroProps) {
  return (
    <section className="overflow-hidden rounded-meuse bg-white shadow-meuse-card">
      <div className="relative h-44 sm:h-56">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        <label className="absolute right-3 bottom-3 cursor-pointer rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-meuse-chip backdrop-blur-sm">
          Change photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              onChange({ imageUrl: URL.createObjectURL(file) });
            }}
          />
        </label>
      </div>
      <div className="px-5 py-5 sm:px-6">
        <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
          YOUR PROJECT PLAN
        </p>
        <input
          value={title}
          onChange={(event) => onChange({ title: event.target.value })}
          className="mt-1 w-full bg-transparent text-2xl font-bold tracking-tight text-zinc-900 outline-none sm:text-[1.75rem]"
        />
        <textarea
          value={description}
          onChange={(event) => onChange({ description: event.target.value })}
          rows={2}
          className="mt-3 w-full resize-none bg-transparent text-base leading-relaxed text-zinc-600 outline-none"
        />
      </div>
    </section>
  );
}
