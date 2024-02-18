import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { getSettings } from "@apis/settings";

const computeLimitAutoValue = "1400000";
const computePriceAutoValue = "0.005";

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

  slipage: string;
  setSlipage: (value: string) => void;

  amount: string;
  setAmount: (value: string) => void;

  computeLimit: string;
  allowAutoComputeLimit: boolean;
  setComputeLimit: (value: string) => void;
  setAllowAutoComputeLimit: (value: boolean) => void;
  setComputeLimitToDefault: (value: boolean) => void;

  computePrice: string;
  allowAutoComputePrice: boolean;
  setComputePrice: (value: string) => void;
  setAllowAutoComputePrice: (value: boolean) => void;
  setComputePriceToDefault: (value: boolean) => void;

  retryValue: string;
  setRetryValue: (value: string) => void;

  getSettings: () => Promise<void>;
};

export type SettingKeys =
  | "slipage"
  | "amount"
  | "computeLimit"
  | "computePrice"
  | "retryValue";

export type SettingEnablerKeys =
  `allowAuto${Capitalize<"computeLimit" | "computePrice">}`;

export type SettingOnChangeKeys = `set${Capitalize<SettingKeys>}`;

export type SettingEnablerOnChangeKeys = `set${Capitalize<SettingEnablerKeys>}`;

export const useSettingsStore = create<SettingsStore>()(
  immer((set) => ({
    tabs,
    isNotificationsEnabled: true,
    slipage: "0.5",
    amount: "0.1",
    computeLimit: computeLimitAutoValue,
    allowAutoComputeLimit: false,
    computePrice: computePriceAutoValue,
    allowAutoComputePrice: false,
    retryValue: "0",

    getSettings: async () => {
      try {
        const { notification, buyingInfoAuto } = await getSettings();
        const {
          slippage,
          amount,
          computeUnitLimit,
          computeUnitPrice,
          repeatTransaction,
        } = buyingInfoAuto;

        set((state) => {
          state.isNotificationsEnabled = notification;
          state.slipage = slippage.toString();
          state.amount = amount.toString();
          state.computeLimit = computeUnitLimit.toString();
          state.computePrice = computeUnitPrice.toString();
          state.retryValue = repeatTransaction.toString();

          state.allowAutoComputeLimit =
            computeUnitLimit === Number(computeLimitAutoValue);
          state.allowAutoComputePrice =
            computeUnitPrice === Number(computePriceAutoValue);
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
    setSlipage: (value) => {
      set((state) => {
        state.slipage = value;
      });
    },
    setAmount: (value) => {
      set((state) => {
        state.amount = value;
      });
    },
    setComputeLimit: (value) => {
      set((state) => {
        state.computeLimit = value;
      });
    },
    setAllowAutoComputeLimit: (value) => {
      set((state) => {
        state.allowAutoComputeLimit = value;
      });
    },
    setComputeLimitToDefault: (value) => {
      if (value) {
        set((state) => {
          state.computeLimit = computeLimitAutoValue;
          state.allowAutoComputeLimit = false;
        });
      }
    },
    setComputePrice: (value) => {
      set((state) => {
        state.computePrice = value;
      });
    },
    setAllowAutoComputePrice: (value) => {
      set((state) => {
        state.allowAutoComputePrice = value;
      });
    },
    setComputePriceToDefault: (value) => {
      if (value) {
        set((state) => {
          state.computePrice = computePriceAutoValue;
          state.allowAutoComputePrice = false;
        });
      }
    },
    setRetryValue: (value) => {
      set((state) => {
        state.retryValue = value;
      });
    },
  })),
);
