import { Suspense } from "react";
import { ExperienceCheckoutScreen } from "@/components/experience/ExperienceCheckoutScreen";

export default function ExperienceCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-meuse-bubble text-sm text-zinc-500">
          Loading checkout...
        </div>
      }
    >
      <ExperienceCheckoutScreen />
    </Suspense>
  );
}
