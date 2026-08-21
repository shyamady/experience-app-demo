import type { ProjectMilestone } from "@/types/launch";

export type JourneyStep = {
  emoji: string;
  title: string;
  description: string;
};

const STAGE_EMOJIS = ["💡", "🎬", "🤝", "✨", "🚀"] as const;

function emojiForMilestone(title: string, index: number, total: number): string {
  const value = title.toLowerCase();
  if (/confirm|lock|plan|dates|studio|team|venue/.test(value)) return "💡";
  if (/record|produce|create|build|shoot|rehears|make/.test(value)) return "🎬";
  if (/community|join|share|progress|update|participant/.test(value)) return "🤝";
  if (/finish|mix|master|final|wrap/.test(value)) return "✨";
  if (/launch|release|public|premiere|open/.test(value)) return "🚀";
  if (total <= 1) return STAGE_EMOJIS[0];
  const mapped = Math.round((index / Math.max(1, total - 1)) * (STAGE_EMOJIS.length - 1));
  return STAGE_EMOJIS[mapped];
}

export function buildProjectJourney(
  milestones: ProjectMilestone[],
): JourneyStep[] {
  if (milestones.length === 0) {
    return [
      {
        emoji: "💡",
        title: "Confirm",
        description: "Lock the plan, dates, and key people.",
      },
      {
        emoji: "🎬",
        title: "Create",
        description: "Build the project with your community close.",
      },
      {
        emoji: "🤝",
        title: "Community joins",
        description: "People take part through the offers they choose.",
      },
      {
        emoji: "✨",
        title: "Finish",
        description: "Bring the work together and share progress.",
      },
      {
        emoji: "🚀",
        title: "Launch",
        description: "Make it public and celebrate together.",
      },
    ];
  }

  return milestones.map((milestone, index) => ({
    emoji: emojiForMilestone(milestone.title, index, milestones.length),
    title: milestone.title,
    description: milestone.description,
  }));
}