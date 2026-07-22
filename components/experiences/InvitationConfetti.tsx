const CONFETTI_PIECES = [
  { left: "6%", delay: "0s", color: "#fda4af", size: 8, duration: "5.5s" },
  { left: "14%", delay: "0.8s", color: "#f9a8d4", size: 6, duration: "6.2s" },
  { left: "22%", delay: "1.4s", color: "#c4b5fd", size: 7, duration: "5.8s" },
  { left: "31%", delay: "0.3s", color: "#fde68a", size: 5, duration: "6.5s" },
  { left: "42%", delay: "1.1s", color: "#fbcfe8", size: 8, duration: "5.2s" },
  { left: "53%", delay: "0.6s", color: "#a5f3fc", size: 6, duration: "6.8s" },
  { left: "64%", delay: "1.7s", color: "#f472b6", size: 7, duration: "5.9s" },
  { left: "73%", delay: "0.2s", color: "#ddd6fe", size: 5, duration: "6.1s" },
  { left: "82%", delay: "1.3s", color: "#fecdd3", size: 8, duration: "5.4s" },
  { left: "91%", delay: "0.9s", color: "#fef08a", size: 6, duration: "6.4s" },
] as const;

export function InvitationConfetti() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {CONFETTI_PIECES.map((piece, index) => (
        <span
          key={index}
          className="meuse-confetti-piece absolute rounded-sm opacity-80"
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.size * 1.4,
            backgroundColor: piece.color,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
          }}
        />
      ))}
    </div>
  );
}
