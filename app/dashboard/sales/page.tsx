import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SalesScreen } from "@/components/dashboard/sales/SalesScreen";

export default function SalesPage() {
  return (
    <DashboardShell>
      <SalesScreen />
    </DashboardShell>
  );
}
