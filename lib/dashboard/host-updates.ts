export type HostUpdate = {
  id: string;
  campaignId: string;
  title: string;
  body: string;
  imageUrl?: string;
  createdAt: string;
};

const STORAGE_KEY = "meuse-host-updates-v1";

const SEED: HostUpdate[] = [
  {
    id: "upd-3",
    campaignId: "campaign-tokyo",
    title: "We found the venue 🎉",
    body: "We just confirmed the space we wanted. Thank you to everyone who joined early.",
    imageUrl:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1200&h=700&fit=crop",
    createdAt: "2026-08-18T10:00:00Z",
  },
  {
    id: "upd-2",
    campaignId: "campaign-tokyo",
    title: "First 30 people are in",
    body: "The circle is forming. If you want a seat in the room, now is a good time.",
    createdAt: "2026-08-12T16:00:00Z",
  },
];

function readUpdates(): HostUpdate[] {
  if (typeof window === "undefined") return SEED;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return SEED;
    return JSON.parse(stored) as HostUpdate[];
  } catch {
    return SEED;
  }
}

function writeUpdates(updates: HostUpdate[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updates));
}

export function getHostUpdates(campaignId: string): HostUpdate[] {
  return readUpdates()
    .filter((update) => update.campaignId === campaignId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function hostUpdatesAsPosts(
  campaignId: string,
  creatorName: string,
  avatarUrl?: string,
) {
  return getHostUpdates(campaignId).map((update) => ({
    id: update.id,
    campaignId,
    authorName: creatorName,
    authorRole: "host" as const,
    authorAvatarUrl: avatarUrl,
    kind: "update" as const,
    title: update.title,
    body: update.body,
    likes: 0,
    comments: 0,
    status: "approved" as const,
    createdAt: update.createdAt,
    imageUrl: update.imageUrl,
  }));
}

export function addHostUpdate(
  campaignId: string,
  input: { title: string; body: string; imageUrl?: string },
): HostUpdate {
  const created: HostUpdate = {
    id: `upd-${Date.now().toString(36)}`,
    campaignId,
    title: input.title.trim(),
    body: input.body.trim(),
    imageUrl: input.imageUrl,
    createdAt: new Date().toISOString(),
  };
  writeUpdates([created, ...readUpdates()]);
  return created;
}
