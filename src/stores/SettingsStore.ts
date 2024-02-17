import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const tabsMock = [
  {
    id: "profile",
    label: "Profile",
    description: "Main bot configurable parameters",
    iconColor: "gray",
  },
  {
    id: "autobuy",
    label: "Auto buy",
    description: "Immediately buy when pasting token address",
    iconColor: "green",
  },
  {
    id: "snipper",
    label: "Sniper TG channel",
    description: "Snipe TG channels calls",
    iconColor: "blue",
  },
];

export type Control = {
  id: string;
  type: "toggle" | "numericSlider" | "percentageSlider";
  label: string;
  description?: string | null;
  value: string;
};

export type Tab = {
  id: string;
  label: string;
  description?: string | null;
  iconColor: string;
  controls?: (Control | Control[])[];
};

export type SettingsStore = {
  tabs: Tab[];
  currentTab: string | null;
  setCurrentTab: (currentTab: string | null) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  immer((set) => ({
    currentTab: null,
    tabs: tabsMock,

    setCurrentTab: (currentTab) =>
      set((state) => {
        state.currentTab = currentTab;
      }),
  })),
);
