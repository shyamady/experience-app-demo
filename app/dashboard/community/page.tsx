import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CommunityFeedScreen } from "@/components/dashboard/community/CommunityFeedScreen";

export default function CommunityPage() {
  return (
    <DashboardShell>
      <CommunityFeedScreen />
    </DashboardShell>
  );
}
