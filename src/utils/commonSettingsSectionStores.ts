import { immer } from "zustand/middleware/immer";

import { getSettings } from "@apis/settings";

type SettingValues = Awaited<ReturnType<typeof getSettings>>["buyingInfoAuto"];

const computeLimitAutoValue = "1400000";
const computePriceAutoValue = "0.005";
export const computePriceMultiplier = 10e6;

export type CommonSettingsSectionStore = {
  slippage: string;
  setSlippage: (value: string) => void;

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

  fromToken: string;

  setValues: (values: SettingValues) => void;
};

export type SettingKeys =
  | "slippage"
  | "amount"
  | "computeLimit"
  | "computePrice"
  | "retryValue";

export type SettingEnablerKeys =
  `allowAuto${Capitalize<"computeLimit" | "computePrice">}`;

export type SettingOnChangeKeys = `set${Capitalize<SettingKeys>}`;

export type SettingEnablerOnChangeKeys = `set${Capitalize<SettingEnablerKeys>}`;

export const initializer = immer<CommonSettingsSectionStore>((set) => ({
  slippage: "0.5",
  amount: "0.1",
  computeLimit: computeLimitAutoValue,
  allowAutoComputeLimit: true,
  computePrice: computePriceAutoValue,
  allowAutoComputePrice: true,
  retryValue: "0",
  fromToken: "",

  setValues: (values) => {
    const {
      slippage,
      amount,
      computeUnitLimit,
      computeUnitPrice,
      repeatTransaction,
      fromToken,
    } = values;
    set((state) => {
      state.slippage = slippage.toString();
      state.amount = amount.toString();
      state.computeLimit = computeUnitLimit.toString();
      state.computePrice = (
        computeUnitPrice / computePriceMultiplier
      ).toString();
      state.retryValue = repeatTransaction.toString();
      state.fromToken = fromToken;

      state.allowAutoComputeLimit =
        computeUnitLimit === Number(computeLimitAutoValue);
      state.allowAutoComputePrice =
        computeUnitPrice === Number(computePriceAutoValue);
    });
  },

  setSlippage: (value) => {
    set((state) => {
      state.slippage = value;
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
        state.allowAutoComputeLimit = true;
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
        state.allowAutoComputePrice = true;
      });
    }
  },
  setRetryValue: (value) => {
    set((state) => {
      state.retryValue = value;
    });
  },
}));
