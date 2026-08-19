import { OverviewScreen } from "@/components/dashboard/event/OverviewScreen";
import { LaunchDashboardShell } from "@/components/dashboard/LaunchDashboardShell";

export default function OverviewPage() {
  return (
    <LaunchDashboardShell>
      <OverviewScreen />
    </LaunchDashboardShell>
  );
}
