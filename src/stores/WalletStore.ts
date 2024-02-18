import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { getTokens } from "@apis/wallet";

export type Transaction = Awaited<
  ReturnType<typeof getTokens>
>["tokens"][number];

export type WalletStore = {
  page: number;
  size: number;

  totalValue: number;
  transactions: Transaction[];

  getTokens: () => Promise<void>;
};

export const useWalletStore = create<WalletStore>()(
  immer((set) => ({
    page: 1,
    size: 10,
    totalValue: 0,
    transactions: [],

    getTokens: async () => {
      try {
        const { totalValue, tokens } = await getTokens({
          page: 1,
          size: 10,
        });

        set((state) => {
          state.totalValue = totalValue;
          state.transactions = tokens;
        });
      } catch (error) {
        console.error(error);
      }
    },
  })),
);
