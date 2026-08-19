import { LaunchDashboardShell } from "@/components/dashboard/LaunchDashboardShell";
import { SalesScreen } from "@/components/dashboard/sales/SalesScreen";

export default function SalesPage() {
  return (
    <LaunchDashboardShell>
      <SalesScreen />
    </LaunchDashboardShell>
  );
}
