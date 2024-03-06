import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";

import { getSettings } from "@apis/settings";

type SettingValues = Awaited<ReturnType<typeof getSettings>>["buyingInfoAuto"];

const computeLimitAutoValue = "1400000";
const computePriceAutoValue = "0.000005";

export type CommonSettingsSectionStore = {
  slippage: string | null;
  setSlippage: (value: string) => void;

  amount: string | null;
  setAmount: (value: string) => void;

  computeLimit: string | null;
  allowAutoComputeLimit: boolean;
  setComputeLimit: (value: string) => void;
  setAllowAutoComputeLimit: (value: boolean) => void;
  setComputeLimitToDefault: (value: boolean) => void;

  computePrice: string | null;
  allowAutoComputePrice: boolean;
  setComputePrice: (value: string) => void;
  setAllowAutoComputePrice: (value: boolean) => void;
  setComputePriceToDefault: (value: boolean) => void;

  mevProtection: string | null;
  isMevProtectionEnabled: boolean;
  setMevProtection: (value: string) => void;
  setIsMevProtectionEnabled: (value: boolean) => void;

  retryValue: string | null;
  setRetryValue: (value: string) => void;

  swapPlatforms: { title: string; id: string }[];
  changeSwapPlatformsOrder: (startIndex: number, endIndex: number) => void;
  fromToken: string | null;

  setValues: (values: SettingValues) => void;
};

export type SettingKeys =
  | "slippage"
  | "amount"
  | "computeLimit"
  | "computePrice"
  | "retryValue"
  | "mevProtection";

export const initializer = immer<CommonSettingsSectionStore>((set) => ({
  slippage: null,
  amount: null,
  computeLimit: null,
  allowAutoComputeLimit: true,
  computePrice: null,
  allowAutoComputePrice: true,
  mevProtection: null,
  isMevProtectionEnabled: true,
  retryValue: null,
  fromToken: null,
  swapPlatforms: [],

  setValues: (values) => {
    const {
      slippage,
      amount,
      computeUnitLimit,
      computeUnitPrice,
      repeatTransaction,
      fromToken,
      swapPlatforms,
      mevProtection,
    } = values;
    set((state) => {
      state.slippage = slippage.toString();
      state.amount = amount.toString();
      state.mevProtection = mevProtection.toString();
      state.computeLimit = computeUnitLimit.toString();
      state.computePrice = computeUnitPrice.toString();
      state.retryValue = repeatTransaction.toString();
      state.fromToken = fromToken;

      state.allowAutoComputeLimit =
        computeUnitLimit === Number(computeLimitAutoValue);
      state.allowAutoComputePrice =
        computeUnitPrice === Number(computePriceAutoValue);
      state.isMevProtectionEnabled = mevProtection !== 0;

      state.swapPlatforms = swapPlatforms.map((title) => ({
        title,
        id: nanoid(8),
      }));
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

  setMevProtection: (value) => {
    set((state) => {
      state.mevProtection = value;
    });
  },

  setIsMevProtectionEnabled: (value) => {
    set((state) => {
      state.isMevProtectionEnabled = value;

      if (!value) {
        state.mevProtection = "";
      }
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
  changeSwapPlatformsOrder: (startIndex, endIndex) => {
    set((state) => {
      const dragItem = state.swapPlatforms[startIndex];
      state.swapPlatforms.splice(startIndex, 1);
      state.swapPlatforms.splice(endIndex, 0, dragItem);
    });
  },
}));
