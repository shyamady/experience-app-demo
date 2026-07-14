"use client";

import { CampaignProvider } from "@/lib/dashboard/campaign-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CampaignProvider>{children}</CampaignProvider>;
}
