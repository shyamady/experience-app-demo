const unsplash = (id: string, width: number, height: number) =>
  `https://images.unsplash.com/${id}?w=${width}&h=${height}&fit=crop`;

export const COMMUNITY_PHOTOS = {
  venue: unsplash("photo-1571266028243-d220c6a52dcf", 1200, 900),
  rehearsal: unsplash("photo-1458560871784-56d23406c091", 1200, 900),
  circle: unsplash("photo-1529156069898-49953e39b3ac", 1200, 900),
  poster: unsplash("photo-1618005182384-a83a8bd57fbe", 1200, 1500),
  lightingWarm: unsplash("photo-1470229722913-7c0e2dbbafd3", 1200, 900),
  lightingAmber: unsplash("photo-1516450360452-9312f5e86fc7", 1200, 900),
  planning: unsplash("photo-1522202176988-66273c2fd55f", 1200, 900),
  guitar: unsplash("photo-1510915361894-db8b60106cb1", 1200, 900),
  moodboard: unsplash("photo-1557672172-298e090bd0f1", 1200, 900),
} as const;

export const COMMUNITY_AVATARS = {
  Alex: unsplash("photo-1463453091185-61582044d556", 200, 200),
  Maya: unsplash("photo-1580489944761-15a19d654956", 200, 200),
  Jordan: unsplash("photo-1539571696357-5a69c17a67c6", 200, 200),
  Riley: unsplash("photo-1544005313-94ddf0286df2", 200, 200),
  Sam: unsplash("photo-1506794778202-cad84cf45f1d", 200, 200),
  You: unsplash("photo-1500648767791-00dcc994a43e", 200, 200),
} as const;

export type CommunityMemberName = keyof typeof COMMUNITY_AVATARS;

export function getCommunityAvatar(name: string): string {
  if (name in COMMUNITY_AVATARS) {
    return COMMUNITY_AVATARS[name as CommunityMemberName];
  }
  return COMMUNITY_AVATARS.You;
}
