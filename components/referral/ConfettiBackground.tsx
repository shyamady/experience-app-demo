const CONFETTI = [
  { left: "4%", delay: "0s", color: "#FF4F9A", w: 8, h: 11, duration: "5.8s" },
  { left: "11%", delay: "1.2s", color: "#fda4af", w: 6, h: 9, duration: "6.4s" },
  { left: "19%", delay: "0.4s", color: "#fde68a", w: 7, h: 10, duration: "5.5s" },
  { left: "27%", delay: "2s", color: "#f9a8d4", w: 5, h: 8, duration: "6.8s" },
  { left: "35%", delay: "0.9s", color: "#FF4F9A", w: 8, h: 12, duration: "5.2s" },
  { left: "43%", delay: "1.6s", color: "#fcd34d", w: 6, h: 9, duration: "6.1s" },
  { left: "51%", delay: "0.2s", color: "#fbcfe8", w: 7, h: 10, duration: "5.9s" },
  { left: "59%", delay: "1.8s", color: "#fda4af", w: 5, h: 7, duration: "6.5s" },
  { left: "67%", delay: "0.7s", color: "#FF4F9A", w: 8, h: 11, duration: "5.4s" },
  { left: "75%", delay: "1.4s", color: "#fef08a", w: 6, h: 9, duration: "6.3s" },
  { left: "83%", delay: "0.5s", color: "#f472b6", w: 7, h: 10, duration: "5.7s" },
  { left: "91%", delay: "1.1s", color: "#fcd34d", w: 5, h: 8, duration: "6.6s" },
  { left: "96%", delay: "2.2s", color: "#fda4af", w: 6, h: 9, duration: "5.6s" },
] as const;

const RIBBONS = [
  { left: "8%", delay: "0s", color: "#FF4F9A", duration: "7s", width: 6, height: 28 },
  { left: "24%", delay: "1.5s", color: "#fda4af", duration: "8s", width: 5, height: 32 },
  { left: "48%", delay: "0.8s", color: "#fcd34d", duration: "7.5s", width: 6, height: 30 },
  { left: "62%", delay: "2.2s", color: "#f9a8d4", duration: "8.2s", width: 5, height: 26 },
  { left: "78%", delay: "1s", color: "#FF4F9A", duration: "7.8s", width: 6, height: 34 },
  { left: "88%", delay: "0.3s", color: "#fde68a", duration: "7.2s", width: 5, height: 28 },
] as const;

const PARTICLES = [
  { left: "15%", top: "20%", delay: "0s", size: 4, color: "#FF4F9A" },
  { left: "72%", top: "35%", delay: "1s", size: 3, color: "#fcd34d" },
  { left: "45%", top: "15%", delay: "2s", size: 5, color: "#fda4af" },
  { left: "88%", top: "55%", delay: "0.5s", size: 4, color: "#f9a8d4" },
  { left: "30%", top: "60%", delay: "1.5s", size: 3, color: "#FF4F9A" },
  { left: "55%", top: "45%", delay: "2.5s", size: 4, color: "#fde68a" },
] as const;

export function ConfettiBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {CONFETTI.map((piece, index) => (
        <span
          key={`c-${index}`}
          className="meuse-confetti-piece absolute rounded-sm"
          style={{
            left: piece.left,
            width: piece.w,
            height: piece.h,
            backgroundColor: piece.color,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
          }}
        />
      ))}
      {RIBBONS.map((ribbon, index) => (
        <span
          key={`r-${index}`}
          className="meuse-referral-ribbon absolute rounded-full opacity-80"
          style={{
            left: ribbon.left,
            width: ribbon.width,
            height: ribbon.height,
            backgroundColor: ribbon.color,
            animationDelay: ribbon.delay,
            animationDuration: ribbon.duration,
          }}
        />
      ))}
      {PARTICLES.map((particle, index) => (
        <span
          key={`p-${index}`}
          className="meuse-referral-float absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
