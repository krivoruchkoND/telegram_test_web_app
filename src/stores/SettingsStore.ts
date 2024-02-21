import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { getSettings } from "@apis/settings";
import { useAutobuySettingsStore } from "@stores/AutobuySettingsStore";
import { useSniperSettingsStore } from "@stores/SniperSettingsStore";

const tabs = [
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

  isNotificationsEnabled: boolean;
  setIsNotificationsEnabled: (value: boolean) => void;

  getSettings: () => Promise<void>;
};

export const useSettingsStore = create<SettingsStore>()(
  immer((set) => ({
    tabs,
    isNotificationsEnabled: true,

    getSettings: async () => {
      try {
        const { notification, buyingInfoAuto, buyingInfoSniper } =
          await getSettings();

        set((state) => {
          state.isNotificationsEnabled = notification;

          useAutobuySettingsStore.getState().setValues(buyingInfoAuto);
          useSniperSettingsStore.getState().setValues(buyingInfoSniper);
        });
      } catch (error) {
        console.error(error);
      }
    },

    setIsNotificationsEnabled: (value) => {
      set((state) => {
        state.isNotificationsEnabled = value;
      });
    },
  })),
);
