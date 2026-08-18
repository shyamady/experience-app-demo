import {
  COMMUNITY_PHOTOS,
  getCommunityAvatar,
} from "@/lib/dashboard/community-media";

export type ContributionKind =
  | "idea"
  | "creation"
  | "question"
  | "vote"
  | "discussion"
  | "update"
  | "photo";

export type ContributionStatus = "pending" | "approved" | "featured";

export type AuthorRole = "host" | "member";

export type PublicVoteOption = {
  label: string;
  percent: number;
};

export type CommunityPost = {
  id: string;
  campaignId: string;
  authorName: string;
  authorRole: AuthorRole;
  authorAvatarUrl?: string;
  kind: ContributionKind;
  tag?: string;
  title?: string;
  body: string;
  likes: number;
  comments: number;
  status: ContributionStatus;
  createdAt: string;
  imageUrl?: string;
  imageUrls?: string[];
  hostNote?: string;
  ctaLabel?: string;
  voteOptions?: PublicVoteOption[];
  voterCount?: number;
  decidedOn?: string;
};

export type PublicCoCreateEntry =
  | {
      type: "vote";
      id: string;
      title: string;
      options: PublicVoteOption[];
      voterCount: number;
    }
  | {
      type: "idea";
      id: string;
      body: string;
      authorName: string;
      authorAvatarUrl?: string;
      likes: number;
      hostNote?: string;
      imageUrls: string[];
    }
  | {
      type: "decision";
      id: string;
      title: string;
      body: string;
      detail?: string;
      decidedOn: string;
    }
  | {
      type: "creation";
      id: string;
      title: string;
      body: string;
      authorName: string;
      authorAvatarUrl?: string;
      likes: number;
      imageUrls: string[];
    }
  | {
      type: "host-update";
      id: string;
      title: string;
      body: string;
      authorName: string;
      authorAvatarUrl?: string;
      createdAt: string;
      imageUrls: string[];
    };

export type PublicMomentum = {
  decisions: number;
  votes: number;
  ideas: number;
};

export type CoCreatePrompt = {
  id: string;
  type: "vote" | "question" | "ideas" | "feedback" | "decision";
  title: string;
  votes?: number;
  comments?: number;
  ideas?: number;
};

export const CONTRIBUTE_OPTIONS: {
  kind: ContributionKind;
  emoji: string;
  label: string;
}[] = [
  { kind: "idea", emoji: "💡", label: "Share an idea" },
  { kind: "creation", emoji: "📸", label: "Share something you made" },
  { kind: "question", emoji: "❓", label: "Ask the community" },
  { kind: "vote", emoji: "🗳", label: "Suggest a vote" },
  { kind: "discussion", emoji: "💬", label: "Start a discussion" },
];

export const CO_CREATE_ACTIONS: {
  type: CoCreatePrompt["type"];
  label: string;
  description: string;
}[] = [
  {
    type: "question",
    label: "Ask a question",
    description: "Start a conversation the community can reply to.",
  },
  {
    type: "vote",
    label: "Create a vote",
    description: "Let people help make a decision.",
  },
  {
    type: "ideas",
    label: "Ask for ideas",
    description: "Invite members to shape what happens next.",
  },
  {
    type: "feedback",
    label: "Get feedback",
    description: "Share a direction and hear what people think.",
  },
  {
    type: "decision",
    label: "Make a decision",
    description: "Close a conversation and share what you chose.",
  },
];

export const KIND_LABEL: Record<ContributionKind, string> = {
  idea: "IDEA",
  creation: "MADE BY THE COMMUNITY",
  question: "QUESTION",
  vote: "VOTE",
  discussion: "DISCUSSION",
  update: "UPDATE",
  photo: "PHOTO",
};

export const KIND_EMOJI: Record<ContributionKind, string> = {
  idea: "💡",
  creation: "🎨",
  question: "❓",
  vote: "🗳",
  discussion: "💬",
  update: "📸",
  photo: "📸",
};

export const ACTIVE_CO_CREATE: CoCreatePrompt = {
  id: "vote-closing-song",
  type: "vote",
  title: "Which song should close the night?",
  votes: 47,
  comments: 12,
};

export const NEW_IDEA_COUNT = 8;

const STORAGE_KEY = "meuse-community-v3";

function member(name: string) {
  return {
    authorName: name,
    authorAvatarUrl: getCommunityAvatar(name),
  };
}

function seedPosts(campaignId: string): CommunityPost[] {
  if (campaignId === "campaign-tokyo") {
    return [
      {
        id: "post-alex-lighting",
        campaignId,
        ...member("Alex"),
        authorRole: "host",
        kind: "update",
        tag: "💡 LIGHTING TEST",
        title: "Testing how warm we want the room to feel.",
        body: "Which direction feels better?",
        likes: 19,
        comments: 11,
        status: "featured",
        createdAt: "2026-08-18T16:40:00Z",
        imageUrls: [COMMUNITY_PHOTOS.lightingWarm, COMMUNITY_PHOTOS.lightingAmber],
        ctaLabel: "Help Decide",
      },
      {
        id: "post-maya-idea",
        campaignId,
        ...member("Maya"),
        authorRole: "member",
        kind: "idea",
        tag: "💡 IDEA",
        title: "What if everyone sat in a circle around the performers?",
        body: "It could make the whole night feel much more personal.",
        likes: 24,
        comments: 8,
        status: "featured",
        createdAt: "2026-08-18T12:20:00Z",
        hostNote: "Host is considering this",
      },
      {
        id: "post-alex-venue",
        campaignId,
        ...member("Alex"),
        authorRole: "host",
        kind: "update",
        tag: "📍 VENUE UPDATE",
        title: "We visited the venue today!",
        body: "The room feels perfect for the intimate setup we've been talking about. What do you think?",
        likes: 38,
        comments: 14,
        status: "featured",
        createdAt: "2026-08-18T09:05:00Z",
        imageUrls: [COMMUNITY_PHOTOS.venue],
      },
      {
        id: "post-alex-vote",
        campaignId,
        ...member("Alex"),
        authorRole: "host",
        kind: "vote",
        tag: "🗳 COMMUNITY VOTE",
        title: "Which song should close the night?",
        body: "Help choose the last song of the set.",
        likes: 22,
        comments: 7,
        status: "approved",
        createdAt: "2026-08-17T15:00:00Z",
        voteOptions: [
          { label: "Midnight Drive", percent: 54 },
          { label: "Slow Motion", percent: 31 },
          { label: "Stay Here", percent: 15 },
        ],
        voterCount: 47,
      },
      {
        id: "post-alex-rehearsal",
        campaignId,
        ...member("Alex"),
        authorRole: "host",
        kind: "update",
        tag: "🎸 BEHIND THE SCENES",
        title: "First rehearsal.",
        body: "Trying a few of the songs you voted for this week.",
        likes: 42,
        comments: 9,
        status: "featured",
        createdAt: "2026-08-16T19:10:00Z",
        imageUrls: [COMMUNITY_PHOTOS.rehearsal],
      },
      {
        id: "post-riley-vote",
        campaignId,
        ...member("Riley"),
        authorRole: "member",
        kind: "vote",
        tag: "✓ COMMUNITY DECISION",
        title: "We're keeping the venue intimate.",
        body: "62% of members chose the smaller room.",
        likes: 31,
        comments: 9,
        status: "featured",
        createdAt: "2026-08-14T16:00:00Z",
        decidedOn: "2026-08-14",
      },
      {
        id: "post-jordan-poster",
        campaignId,
        ...member("Jordan"),
        authorRole: "member",
        kind: "creation",
        tag: "🎨 MADE BY THE COMMUNITY",
        title: "Made a quick poster concept for the night.",
        body: "Tried to capture the warm, late-night feeling everyone has been talking about.",
        likes: 31,
        comments: 12,
        status: "featured",
        createdAt: "2026-08-13T09:12:00Z",
        imageUrls: [COMMUNITY_PHOTOS.poster],
      },
      {
        id: "post-sam-question",
        campaignId,
        ...member("Sam"),
        authorRole: "member",
        kind: "question",
        body: "Could we add a sliding-scale option so more people can join?",
        likes: 11,
        comments: 3,
        status: "pending",
        createdAt: "2026-08-18T10:40:00Z",
      },
    ];
  }

  return [
    {
      id: "post-maya-idea",
      campaignId,
      ...member("Maya"),
      authorRole: "member",
      kind: "idea",
      body: "What if we did a workshop before the show?",
      likes: 24,
      comments: 8,
      status: "approved",
      createdAt: "2026-08-16T18:20:00Z",
    },
    {
      id: "post-alex-update",
      campaignId,
      ...member("Alex"),
      authorRole: "host",
      kind: "update",
      title: "We visited the venue today!",
      body: "The space is starting to feel real.",
      likes: 38,
      comments: 14,
      status: "featured",
      createdAt: "2026-08-17T11:05:00Z",
      imageUrls: [COMMUNITY_PHOTOS.venue],
    },
    {
      id: "post-jordan-poster",
      campaignId,
      ...member("Jordan"),
      authorRole: "member",
      kind: "creation",
      title: "Poster Concept",
      body: "A first look at a poster we could use for the launch.",
      likes: 19,
      comments: 5,
      status: "pending",
      createdAt: "2026-08-18T09:12:00Z",
      imageUrls: [COMMUNITY_PHOTOS.poster],
    },
    {
      id: "post-sam-question",
      campaignId,
      ...member("Sam"),
      authorRole: "member",
      kind: "question",
      body: "Could we add a sliding-scale ticket so more people can join?",
      likes: 11,
      comments: 3,
      status: "pending",
      createdAt: "2026-08-18T10:40:00Z",
    },
    {
      id: "post-riley-vote",
      campaignId,
      ...member("Riley"),
      authorRole: "member",
      kind: "vote",
      title: "Community Decision",
      body: "62% chose the intimate venue.",
      likes: 31,
      comments: 9,
      status: "featured",
      createdAt: "2026-08-15T16:00:00Z",
      decidedOn: "2026-08-15",
    },
  ];
}

type CommunityState = {
  postsByCampaign: Record<string, CommunityPost[]>;
};

function emptyState(): CommunityState {
  return { postsByCampaign: {} };
}

function readState(): CommunityState {
  if (typeof window === "undefined") return emptyState();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return emptyState();
    return JSON.parse(stored) as CommunityState;
  } catch {
    return emptyState();
  }
}

function writeState(state: CommunityState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getCommunityPosts(campaignId: string): CommunityPost[] {
  const state = readState();
  if (!state.postsByCampaign[campaignId]) {
    state.postsByCampaign[campaignId] = seedPosts(campaignId);
    writeState(state);
  }
  return state.postsByCampaign[campaignId];
}

function updatePosts(
  campaignId: string,
  updater: (posts: CommunityPost[]) => CommunityPost[],
): CommunityPost[] {
  const state = readState();
  const current = state.postsByCampaign[campaignId] ?? seedPosts(campaignId);
  const next = updater(current);
  state.postsByCampaign[campaignId] = next;
  writeState(state);
  return next;
}

export function addCommunityPost(
  campaignId: string,
  post: Omit<CommunityPost, "id" | "campaignId" | "createdAt" | "likes" | "comments">,
): CommunityPost {
  const created: CommunityPost = {
    ...post,
    id: `post-${Date.now().toString(36)}`,
    campaignId,
    authorAvatarUrl: post.authorAvatarUrl || getCommunityAvatar(post.authorName),
    likes: 0,
    comments: 0,
    createdAt: new Date().toISOString(),
  };

  updatePosts(campaignId, (posts) => [created, ...posts]);
  return created;
}

export function setPostStatus(
  campaignId: string,
  postId: string,
  status: ContributionStatus,
): CommunityPost[] {
  return updatePosts(campaignId, (posts) =>
    posts.map((post) => (post.id === postId ? { ...post, status } : post)),
  );
}

export function getVisibleFeed(posts: CommunityPost[]): CommunityPost[] {
  return posts
    .filter((post) => post.status !== "pending")
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function getPendingPosts(posts: CommunityPost[]): CommunityPost[] {
  return posts.filter((post) => post.status === "pending");
}

export function getFeaturedPosts(posts: CommunityPost[]): CommunityPost[] {
  return posts.filter((post) => post.status === "featured");
}

export function getTractionIdea(posts: CommunityPost[]): CommunityPost | null {
  return (
    posts.find(
      (post) =>
        post.kind === "idea" &&
        post.status !== "pending" &&
        post.likes >= 20,
    ) ?? null
  );
}

export function getPostImages(post: {
  imageUrls?: string[];
  imageUrl?: string;
}): string[] {
  if (post.imageUrls && post.imageUrls.length > 0) return post.imageUrls;
  if (post.imageUrl) return [post.imageUrl];
  return [];
}

export function getPostAvatar(post: Pick<CommunityPost, "authorName" | "authorAvatarUrl">): string {
  return post.authorAvatarUrl || getCommunityAvatar(post.authorName);
}

export function getPostTag(post: CommunityPost): string {
  if (post.tag) return post.tag;
  return `${KIND_EMOJI[post.kind]} ${KIND_LABEL[post.kind]}`;
}

export function getPublicUpdates(campaignId: string): CommunityPost[] {
  return getVisibleFeed(getCommunityPosts(campaignId));
}

function entryFromPost(post: CommunityPost): PublicCoCreateEntry | null {
  const imageUrls = getPostImages(post);

  if (post.voteOptions && post.voteOptions.length > 0 && !post.decidedOn) {
    return {
      type: "vote",
      id: post.id,
      title: post.title || post.body,
      options: post.voteOptions,
      voterCount: post.voterCount ?? 0,
    };
  }

  if (post.decidedOn) {
    return {
      type: "decision",
      id: post.id,
      title: post.title || "A decision was made",
      body: post.body,
      decidedOn: post.decidedOn,
    };
  }

  if (post.kind === "idea") {
    return {
      type: "idea",
      id: post.id,
      body: post.title || post.body,
      authorName: post.authorName,
      authorAvatarUrl: getPostAvatar(post),
      likes: post.likes,
      hostNote: post.hostNote,
      imageUrls,
    };
  }

  if (post.kind === "creation" && post.status === "featured") {
    return {
      type: "creation",
      id: post.id,
      title: post.title || "Made by the community",
      body: post.body,
      authorName: post.authorName,
      authorAvatarUrl: getPostAvatar(post),
      likes: post.likes,
      imageUrls,
    };
  }

  if (
    post.authorRole === "host" &&
    imageUrls.length > 0 &&
    post.status === "featured" &&
    (post.kind === "update" || post.kind === "photo")
  ) {
    return {
      type: "host-update",
      id: post.id,
      title: post.title || post.body,
      body: post.body,
      authorName: post.authorName,
      authorAvatarUrl: getPostAvatar(post),
      createdAt: post.createdAt,
      imageUrls,
    };
  }

  return null;
}

const CO_CREATE_ORDER: PublicCoCreateEntry["type"][] = [
  "vote",
  "idea",
  "host-update",
  "creation",
  "decision",
];

export function getPublicCoCreate(campaignId: string): PublicCoCreateEntry[] {
  const posts = getVisibleFeed(getCommunityPosts(campaignId));
  const entries = posts
    .map(entryFromPost)
    .filter((entry): entry is PublicCoCreateEntry => entry !== null);

  const hostUpdates = entries.filter(
    (entry): entry is Extract<PublicCoCreateEntry, { type: "host-update" }> =>
      entry.type === "host-update",
  );
  const preferredHost =
    hostUpdates.find((entry) => /venue/i.test(entry.title)) ?? hostUpdates[0];
  const unique: PublicCoCreateEntry[] = entries.filter(
    (entry) => entry.type !== "host-update",
  );
  if (preferredHost) unique.push(preferredHost);

  return unique.sort(
    (a, b) => CO_CREATE_ORDER.indexOf(a.type) - CO_CREATE_ORDER.indexOf(b.type),
  );
}

export function getPublicMomentum(campaignId: string): PublicMomentum {
  const entries = getPublicCoCreate(campaignId);
  const posts = getVisibleFeed(getCommunityPosts(campaignId));

  return {
    decisions: entries.filter((entry) => entry.type === "decision").length,
    votes: entries.reduce(
      (sum, entry) => (entry.type === "vote" ? sum + entry.voterCount : sum),
      0,
    ),
    ideas: posts.filter((post) => post.kind === "idea").length,
  };
}

export function formatRelativeTime(isoDate: string): string {
  const then = Date.parse(isoDate);
  if (Number.isNaN(then)) return "";

  const diffMs = Date.now() - then;
  const diffMinutes = Math.round(diffMs / 60_000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d`;

  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
