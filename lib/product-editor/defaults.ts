import type { EditableProduct } from "@/lib/product-editor/types";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop";

const CREATOR_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop";

export const DEFAULT_EDITABLE_PRODUCT: EditableProduct = {
  id: "live-nashville-studio",
  title: "Live From the Nashville Studio",
  description:
    "Join Sarah during her live recording session and participate in the Q&A.",
  imageUrl: DEFAULT_IMAGE,
  accessBadge: "Live Access",
  price: 35,
  priceType: "one-time",
  availabilityKind: "unlimited",
  spotCount: 150,
  includes: ["Live session", "Q&A", "Replay"],
  status: "draft",
  experienceTitle: "Inside Sarah Morgan's Nashville Recording Sessions",
  creatorName: "Sarah Morgan",
  creatorAvatarUrl: CREATOR_AVATAR,
};

export function getDefaultEditableProduct(id?: string): EditableProduct {
  return {
    ...DEFAULT_EDITABLE_PRODUCT,
    id: id ?? DEFAULT_EDITABLE_PRODUCT.id,
  };
}
