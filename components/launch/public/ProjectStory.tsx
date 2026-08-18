import type { LaunchData } from "@/lib/launch/types";
import { getProjectOutline } from "@/lib/launch/public-view";

type ProjectStoryProps = {
  data: LaunchData;
};

export function ProjectStory({ data }: ProjectStoryProps) {
  const outline = getProjectOutline(data);

  return (
    <div className="space-y-8">
      {outline && (
        <section>
          <h2 className="text-lg font-bold tracking-tight text-zinc-900">
            What we’re making
          </h2>
          <p className="mt-3 text-sm font-semibold text-zinc-800">
            {outline.heading}
          </p>
          <ol className="mt-3 space-y-3">
            {outline.items.map((item) => (
              <li key={item.title} className="rounded-[1.25rem] border border-zinc-100 bg-white px-4 py-3">
                <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {(data.creatorNote || data.whyItMatters) && (
        <section>
          <h2 className="text-lg font-bold tracking-tight text-zinc-900">
            Why I’m making this
          </h2>
          <div className="mt-3 flex items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.avatarUrl}
              alt=""
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                {data.creatorName}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                {data.creatorNote || data.whyItMatters}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
