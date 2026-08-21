import type { LaunchData } from "@/lib/launch/types";
import { formatFirstDate, getLocationDisplay } from "@/lib/launch/formatting";
import { getExpectedDateCopy } from "@/lib/launch/public-view";

type ProjectStoryProps = {
  data: LaunchData;
};

export function ProjectStory({ data }: ProjectStoryProps) {
  const story = data.creatorNote || data.whyItMatters;

  if (!story) return null;

  const paragraphs = story.split(/\n+/).filter(Boolean).slice(0, 4);

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
        Project story
      </h2>
      <div className="mt-5 flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.avatarUrl}
          alt=""
          className="h-16 w-16 shrink-0 rounded-full object-cover shadow-meuse-chip"
        />
        <div>
          <p className="text-sm font-semibold text-pink-500">{data.creatorName}</p>
          <div className="mt-2 space-y-3">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[0.975rem] leading-relaxed text-zinc-600">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectDetails({ data }: { data: LaunchData }) {
  const location = getLocationDisplay(data) || data.city || data.venue;
  const setting =
    data.locationType === "online"
      ? "Online"
      : data.locationType === "hybrid"
        ? "In-person and online"
        : data.locationType === "in-person"
          ? "In-person"
          : "";
  const capacity =
    data.totalSpots === "unlimited"
      ? "Open"
      : `${data.totalSpots} people`;
  const deadline = data.cutOffDate ? formatFirstDate(data.cutOffDate) : "";

  const rows: { label: string; value: string }[] = [
    {
      label: "Location",
      value: location || "To be confirmed",
    },
  ];
  if (deadline) {
    rows.push({ label: "Campaign deadline", value: `Join by ${deadline}` });
  }
  if (setting) rows.push({ label: "Format", value: setting });
  rows.push({ label: "Capacity", value: capacity });
  if (data.demandValidationEnabled && deadline) {
    rows.push({
      label: "If the goal is not reached",
      value: `Participants are refunded according to the Launch terms.`,
    });
  }
  rows.push({
    label: "Important terms",
    value: "Joining is a commitment to this Launch and the selected participation.",
  });

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
        Project details
      </h2>
      <p className="mt-3 text-sm font-medium text-zinc-500">Expected to happen</p>
      <p className="text-lg font-bold text-zinc-900">{getExpectedDateCopy(data)}</p>
      <dl className="mt-5 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4">
            <dt className="text-sm text-zinc-500">{row.label}</dt>
            <dd className="max-w-[62%] text-right text-sm font-medium text-zinc-800">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
