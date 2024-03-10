import { makeAutoObservable, runInAction } from "mobx";

import { getTokens, getToken, getBalance } from "@apis/wallet";

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
  currentTransaction: Transaction | null = null;
  balance: number | null = null;

  isLoading = {
    getTokens: false,
    getToken: false,
    getBalance: false,
  };

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  getTokens = async () => {
    try {
      this.isLoading.getTokens = true;
      const { totalValue, tokens } = await getTokens({
        page: this.page,
        size: this.size,
      });

      runInAction(() => {
        this.totalValue = totalValue;
        this.transactions = tokens;
      });
    } catch (error) {
      console.error("🚨 WalletStore getTokens", error);
    } finally {
      this.isLoading.getTokens = false;
    }
  };

  getToken = async (id: string) => {
    try {
      this.isLoading.getToken = true;
      const token = await getToken(id);

      runInAction(() => {
        this.currentTransaction = token;
      });
    } catch (error) {
      console.error("🚨 WalletStore getToken", error);
    } finally {
      this.isLoading.getToken = false;
    }
  };

  getBalance = async () => {
    try {
      this.isLoading.getBalance = true;
      const balance = await getBalance();

      runInAction(() => {
        this.balance = balance;
      });
    } catch (error) {
      console.error("🚨 WalletStore getBalance", error);
    } finally {
      this.isLoading.getBalance = false;
    }
  };

  resetCurrentTransaction = () => {
    this.currentTransaction = null;
  };
}

export default WalletStore;
