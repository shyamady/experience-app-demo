export type PreviewCreator = {
  name: string;
  avatarUrl: string;
};

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop";

export const DEFAULT_PREVIEW_CREATOR: PreviewCreator = {
  name: "Sarah Morgan",
  avatarUrl: DEFAULT_AVATAR,
};

export function getPreviewCreator(): PreviewCreator {
  return DEFAULT_PREVIEW_CREATOR;
}
