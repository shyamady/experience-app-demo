import {
  EXPERIENCE_IMAGES,
  EXPERIENCE_TEMPLATES,
} from "@/lib/onboarding/experiences";
import type { GenerateLaunchRequest, LaunchResponse } from "@/types/launch";

function titleFromIdea(activity: string, category?: string): string {
  const cleaned = activity
    .replace(/^I want to\s+/i, "")
    .replace(/\.$/, "")
    .trim();

  if (cleaned.length > 8 && cleaned.length < 72) {
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  return category || "Your Community Project";
}

export function buildFallbackLaunch(
  body: GenerateLaunchRequest,
): LaunchResponse {
  const idea = body.activity.trim() || "a project with my community";
  const title = titleFromIdea(idea, body.category);
  const products = EXPERIENCE_TEMPLATES.slice(0, 6).map((template) => ({
    category: template.category,
    title: template.title,
    description: template.description,
    howItHelps: template.howItHelps,
    access: template.access,
    price: template.price,
    capacity:
      template.spots === "unlimited" ? "unlimited" : `${template.spots} people`,
    phase: template.phase,
    imageQuery: template.title,
    imageUrl: EXPERIENCE_IMAGES[template.imageKey],
  }));

  return {
    heroTitle: title,
    heroDescription: `A one-time project to ${idea.replace(/^I want to\s+/i, "").replace(/\.$/, "")}. Your community can help shape it, fund it, and be part of making it real.`,
    whyItMatters:
      "This is a chance to turn a real ambition into something people can join, rather than watching from the sidelines.",
    communityMakesPossible:
      "People can help decide the direction, contribute work, show up, and bring the resources needed to produce it.",
    heroImageQuery: idea,
    heroImageUrl: EXPERIENCE_IMAGES.group,
    estimatedBudget: "$8,000–$12,000",
    estimatedTimeToLaunch: "60–90 days",
    suggestedMinimumGoal: "40 participants",
    recommendedCampaignLength: "30 days",
    estimateAssumptions:
      "These are starting estimates based on similar one-time community projects. They are not guaranteed and can be edited.",
    milestones: [
      {
        title: "Validate the idea",
        description: `Share “${title}” with your community and confirm enough people want to help make it happen.`,
      },
      {
        title: "Reach the minimum goal",
        description:
          "Gather the participants, funding, or partners needed before production begins.",
      },
      {
        title: "Produce and deliver the project",
        description:
          "Create the work together and bring people into the final experience.",
      },
    ],
    products,
  };
}
