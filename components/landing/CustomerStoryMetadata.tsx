import type { CustomerStoryMetadataItem } from "@/lib/landing/customer-stories";

type CustomerStoryMetadataProps = {
  items: CustomerStoryMetadataItem[];
};

export function CustomerStoryMetadata({ items }: CustomerStoryMetadataProps) {
  return (
    <p className="text-sm text-zinc-500">
      {items.map((item, index) => (
        <span key={item.label}>
          {index > 0 && <span className="mx-2 text-zinc-300">·</span>}
          {item.label}
        </span>
      ))}
    </p>
  );
}
