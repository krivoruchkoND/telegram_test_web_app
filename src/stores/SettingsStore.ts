import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

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
  allowCustomComputeLimit: boolean;
  setComputeLimit: (value: string) => void;
  setAllowCustomComputeLimit: (value: boolean) => void;

  computePrice: string;
  allowCustomComputePrice: boolean;
  setComputePrice: (value: string) => void;
  setAllowCustomComputePrice: (value: boolean) => void;

  retryValue: string;
  setRetryValue: (value: string) => void;
};

export type SettingKeys =
  | "slipage"
  | "amount"
  | "computeLimit"
  | "computePrice"
  | "retryValue";

export type SettingEnablerKeys =
  `allowCustom${Capitalize<"computeLimit" | "computePrice">}`;

export type SettingOnChangeKeys = `set${Capitalize<SettingKeys>}`;

export type SettingEnablerOnChangeKeys = `set${Capitalize<SettingEnablerKeys>}`;

export const useSettingsStore = create<SettingsStore>()(
  immer((set) => ({
    tabs,
    isNotificationsEnabled: true,
    slipage: "0.5",
    amount: "0.1",
    computeLimit: "140000",
    allowCustomComputeLimit: false,
    computePrice: "0.005",
    allowCustomComputePrice: false,
    retryValue: "0",

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
    setAllowCustomComputeLimit: (value) => {
      set((state) => {
        state.allowCustomComputeLimit = value;
      });
    },
    setComputePrice: (value) => {
      set((state) => {
        state.computePrice = value;
      });
    },
    setAllowCustomComputePrice: (value) => {
      set((state) => {
        state.allowCustomComputePrice = value;
      });
    },
    setRetryValue: (value) => {
      set((state) => {
        state.retryValue = value;
      });
    },
  })),
);
