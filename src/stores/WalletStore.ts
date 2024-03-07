import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { getTokens, getBalance } from "@apis/wallet";

export type Transaction = Awaited<
  ReturnType<typeof getTokens>
>["tokens"][number];

export type WalletStore = {
  page: number;
  size: number;

  totalValue: number;
  transactions: Transaction[];
  balance: number;

  getTokens: () => Promise<void>;
  getBalance: () => Promise<void>;
};

export const useWalletStore = create<WalletStore>()(
  immer((set) => ({
    page: 1,
    size: 10,
    totalValue: 0,
    balance: 0,
    transactions: [],

    getTokens: async () => {
      try {
        const { totalValue, tokens } = await getTokens({
          page: 1,
          size: 100, // TODO: implement pagination
        });

        set((state) => {
          state.totalValue = totalValue;
          state.transactions = tokens;
        });
      } catch (error) {
        console.error(error);
      }
    },

    getBalance: async () => {
      try {
        const balance = await getBalance();

        set((state) => {
          state.balance = balance;
        });
      } catch (error) {
        console.error(error);
      }
    },
  })),
);
