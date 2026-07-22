"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LaunchData } from "@/lib/launch/types";
import {
  createNewCampaign,
  getActiveCampaign,
  getCampaignsState,
  getDefaultCampaignsState,
  publishLaunch as publishLaunchToStorage,
  saveCampaign,
  switchCampaign as switchCampaignInStorage,
  type CampaignsState,
} from "@/lib/launch/storage";

type CampaignContextValue = {
  campaigns: LaunchData[];
  activeCampaign: LaunchData;
  switchCampaign: (id: string) => void;
  updateCampaign: (updates: Partial<LaunchData>) => LaunchData;
  createCampaign: () => LaunchData;
  publishCampaign: (data?: LaunchData) => LaunchData;
};

const CampaignContext = createContext<CampaignContextValue | null>(null);

function resolveActiveCampaign(state: CampaignsState): LaunchData {
  return (
    state.campaigns.find((campaign) => campaign.id === state.activeCampaignId) ??
    state.campaigns[0]
  );
}

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [campaignState, setCampaignState] = useState<CampaignsState>(
    getDefaultCampaignsState,
  );

  const refresh = useCallback(() => {
    setCampaignState(getCampaignsState());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const { campaigns, activeCampaign } = useMemo(() => {
    return {
      campaigns: campaignState.campaigns,
      activeCampaign: resolveActiveCampaign(campaignState),
    };
  }, [campaignState]);

  const switchCampaign = useCallback(
    (id: string) => {
      switchCampaignInStorage(id);
      refresh();
    },
    [refresh],
  );

  const updateCampaign = useCallback(
    (updates: Partial<LaunchData>) => {
      const next = saveCampaign({ ...getActiveCampaign(), ...updates });
      refresh();
      return next;
    },
    [refresh],
  );

  const createCampaign = useCallback(() => {
    const campaign = createNewCampaign();
    refresh();
    return campaign;
  }, [refresh]);

  const publishCampaign = useCallback(
    (data?: LaunchData) => {
      const published = publishLaunchToStorage(data ?? getActiveCampaign());
      refresh();
      return published;
    },
    [refresh],
  );

  const value = useMemo(
    () => ({
      campaigns,
      activeCampaign,
      switchCampaign,
      updateCampaign,
      createCampaign,
      publishCampaign,
    }),
    [
      campaigns,
      activeCampaign,
      switchCampaign,
      updateCampaign,
      createCampaign,
      publishCampaign,
    ],
  );

  return (
    <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }
  return context;
}
