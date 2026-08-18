import { LaunchHomeScreen } from "@/components/dashboard/home/LaunchHomeScreen";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <LaunchHomeScreen />
    </DashboardShell>
  );
}
