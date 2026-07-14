export type LocationType = "in-person" | "online";

export type OnlinePlatform =
  | "zoom"
  | "youtube-live"
  | "instagram-live"
  | "private-room"
  | "other";

export type LocationTypeOption = {
  id: LocationType;
  title: string;
  description: string;
  icon: "pin" | "globe";
};

export const LOCATION_TYPE_OPTIONS: LocationTypeOption[] = [
  {
    id: "in-person",
    title: "In person",
    description: "A physical location fans can visit.",
    icon: "pin",
  },
  {
    id: "online",
    title: "Online",
    description: "A virtual experience fans can join remotely.",
    icon: "globe",
  },
];

export const ONLINE_PLATFORMS: {
  id: OnlinePlatform;
  label: string;
}[] = [
  { id: "zoom", label: "Zoom" },
  { id: "youtube-live", label: "YouTube Live" },
  { id: "instagram-live", label: "Instagram Live" },
  { id: "private-room", label: "Private Room" },
  { id: "other", label: "Other" },
];
