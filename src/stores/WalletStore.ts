import { makeAutoObservable, runInAction } from "mobx";

import { getTokens, getBalance } from "@apis/wallet";

import RootStore from "./RootStore";

export type Transaction = Awaited<
  ReturnType<typeof getTokens>
>["tokens"][number];

class WalletStore {
  rootStore: RootStore;
  page: number = 1;
  size: number = 100;

  totalValue: number | null = null;
  transactions: Transaction[] = [];
  balance: number | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  getTokens = async () => {
    try {
      const { totalValue, tokens } = await getTokens({
        page: this.page,
        size: this.size,
      });

      runInAction(() => {
        this.totalValue = totalValue;
        this.transactions = tokens;
      });
    } catch (error) {
      console.error("WalletStore getTokens", error);
    }
  };

  getBalance = async () => {
    try {
      const balance = await getBalance();

      runInAction(() => {
        this.balance = balance;
      });
    } catch (error) {
      console.error("WalletStore getBalance", error);
    }
  };
}

export default WalletStore;
