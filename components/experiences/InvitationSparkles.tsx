import { SparkleIcon } from "@/components/icons/SparkleIcon";

const SPARKLES = [
  { top: "12%", left: "8%", delay: "0s", size: "h-4 w-4" },
  { top: "18%", right: "10%", delay: "1.2s", size: "h-5 w-5" },
  { top: "42%", left: "4%", delay: "0.6s", size: "h-3.5 w-3.5" },
  { top: "55%", right: "6%", delay: "1.8s", size: "h-4 w-4" },
  { top: "72%", left: "12%", delay: "2.1s", size: "h-3 w-3" },
  { top: "28%", right: "18%", delay: "0.9s", size: "h-3.5 w-3.5" },
] as const;

export function InvitationSparkles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {SPARKLES.map((sparkle, index) => (
        <span
          key={index}
          className={`meuse-invitation-sparkle absolute text-pink-300 ${sparkle.size}`}
          style={{
            top: sparkle.top,
            left: "left" in sparkle ? sparkle.left : undefined,
            right: "right" in sparkle ? sparkle.right : undefined,
            animationDelay: sparkle.delay,
          }}
        >
          <SparkleIcon className="h-full w-full" />
        </span>
      ))}
    </div>
  );
}
