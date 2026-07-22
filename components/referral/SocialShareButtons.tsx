"use client";

type SocialPlatform =
  | "instagram"
  | "x"
  | "facebook"
  | "whatsapp"
  | "messenger"
  | "copy";

type SocialShareButtonsProps = {
  referralUrl: string;
  onCopy?: () => void;
};

const PLATFORMS: Array<{
  id: SocialPlatform;
  label: string;
  className: string;
}> = [
  {
    id: "instagram",
    label: "Instagram",
    className:
      "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white",
  },
  {
    id: "x",
    label: "X",
    className: "bg-zinc-900 text-white",
  },
  {
    id: "facebook",
    label: "Facebook",
    className: "bg-[#1877F2] text-white",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    className: "bg-[#25D366] text-white",
  },
  {
    id: "messenger",
    label: "Messenger",
    className: "bg-gradient-to-br from-[#00B2FF] to-[#006AFF] text-white",
  },
  {
    id: "copy",
    label: "Copy Link",
    className: "border border-pink-200 bg-white text-pink-700",
  },
];

export function SocialShareButtons({
  referralUrl,
  onCopy,
}: SocialShareButtonsProps) {
  const handleShare = (platform: SocialPlatform) => {
    if (platform === "copy") {
      void navigator.clipboard.writeText(referralUrl);
      onCopy?.();
      return;
    }

    const text = encodeURIComponent("Join me on Meuse!");
    const url = encodeURIComponent(referralUrl);

    const shareUrls: Partial<Record<SocialPlatform, string>> = {
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };

    const target = shareUrls[platform];
    if (target) {
      window.open(target, "_blank", "noopener,noreferrer,width=600,height=500");
    }
  };

  return (
    <section className="meuse-referral-fade-up">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {PLATFORMS.map((platform) => (
          <button
            key={platform.id}
            type="button"
            onClick={() => handleShare(platform.id)}
            className={`flex items-center justify-center rounded-2xl px-4 py-4 text-sm font-semibold shadow-meuse-chip transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] ${platform.className}`}
          >
            {platform.label}
          </button>
        ))}
      </div>
    </section>
  );
}
