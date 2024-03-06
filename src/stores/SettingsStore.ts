import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { getSettings, updateSettings, getPrivateKey } from "@apis/settings";
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
    enableOptionLKey: "AutoBuy" as const,
  },
  {
    id: "snipper",
    label: "Sniper TG channel",
    description: "Snipe TG channels calls",
    iconColor: "blue",
    enableOptionLKey: "Sniper" as const,
  },
];

export type Tab = (typeof tabs)[number];

export type SettingsStore = {
  tabs: Tab[];

  isNotificationsEnabled: boolean;
  setIsNotificationsEnabled: (value: boolean) => void;

  isAutoBuyEnabled: boolean;
  setIsAutoBuyEnabled: (value: boolean) => void;

  isSniperEnabled: boolean;
  setIsSniperEnabled: (value: boolean) => void;

  getSettings: () => Promise<void>;
  updateSettings: () => Promise<void>;

  privateKey: string | null;
  getPrivateKey: () => Promise<void>;

  isFetched: boolean;
};

export const useSettingsStore = create<SettingsStore>()(
  immer((set, get) => ({
    tabs,
    isNotificationsEnabled: true,
    isAutoBuyEnabled: false,
    isSniperEnabled: false,
    privateKey: null,
    isFetched: false,

    getSettings: async () => {
      try {
        const {
          notification,
          autobuy,
          sniper,
          buyingInfoAuto,
          buyingInfoSniper,
        } = await getSettings();

        useAutobuySettingsStore.getState().setValues(buyingInfoAuto);
        useSniperSettingsStore.getState().setValues(buyingInfoSniper);

        set((state) => {
          state.isNotificationsEnabled = notification;
          state.isAutoBuyEnabled = autobuy;
          state.isSniperEnabled = sniper;
          state.isFetched = true;
        });
      } catch (error) {
        console.error(error);
      }
    },

    updateSettings: async () => {
      if (!get().isFetched) {
        return;
      }

      const notification = get().isNotificationsEnabled;
      const autobuy = get().isAutoBuyEnabled;
      const sniper = get().isSniperEnabled;
      const buyingInfoAuto = useAutobuySettingsStore.getState();
      const buyingInfoSniper = useSniperSettingsStore.getState();

      const settings = {
        notification,
        autobuy,
        sniper,
        buyingInfoAuto: {
          slippage: Number(buyingInfoAuto.slippage),
          amount: Number(buyingInfoAuto.amount),
          computeUnitLimit: Number(buyingInfoAuto.computeLimit),
          computeUnitPrice: Number(buyingInfoAuto.computePrice),
          repeatTransaction: Number(buyingInfoAuto.retryValue),
          fromToken: buyingInfoAuto.fromToken ?? "",
          swapPlatforms: buyingInfoAuto.swapPlatforms.map(({ title }) => title),
        },
        buyingInfoSniper: {
          slippage: Number(buyingInfoSniper.slippage),
          amount: Number(buyingInfoSniper.amount),
          computeUnitLimit: Number(buyingInfoSniper.computeLimit),
          computeUnitPrice: Number(buyingInfoSniper.computePrice),
          repeatTransaction: Number(buyingInfoSniper.retryValue),
          fromToken: buyingInfoSniper.fromToken ?? "",
          swapPlatforms: buyingInfoSniper.swapPlatforms.map(
            ({ title }) => title,
          ),
        },
      };

      try {
        await updateSettings(settings);
      } catch (error) {
        console.error(error);
      }
    },

    getPrivateKey: async () => {
      try {
        const privateKey = await getPrivateKey();
        set((state) => {
          state.privateKey = privateKey;
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

    setIsAutoBuyEnabled: (value) => {
      set((state) => {
        state.isAutoBuyEnabled = value;
      });
    },

    setIsSniperEnabled: (value) => {
      set((state) => {
        state.isSniperEnabled = value;
      });
    },
  })),
);
