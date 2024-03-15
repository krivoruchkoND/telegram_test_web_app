import { makeAutoObservable, runInAction } from "mobx";

import { getSwaps, createTransaction } from "@apis/swaps";
import combineSwapsByDay from "@utils/combineSwapsByDay";
import { showNotification } from "@utils/notificationManager";
import isDetailedError from "@utils/isDetailedError";

import RootStore from "./RootStore";

export type Transaction = Parameters<typeof createTransaction>[1];
export type Swap = Awaited<ReturnType<typeof getSwaps>>["swaps"][number];

class SwapsStore {
  rootStore: RootStore;
  page: number = 1;
  size: number = 100;
  swaps: { [key: string]: Swap[] } = {};

  isLoading = {
    getSwaps: false,
  };

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  getSwaps = async () => {
    try {
      this.isLoading.getSwaps = true;
      const { swaps } = await getSwaps({
        page: this.page,
        size: this.size,
      });

      runInAction(() => {
        this.swaps = combineSwapsByDay(swaps);
      });
    } catch (error) {
      console.error("🚨 SwapsStore getSwaps", error);
    } finally {
      this.isLoading.getSwaps = false;
    }
  };

  createTransaction = async (
    type: "buy" | "sell",
    transaction: Transaction,
  ) => {
    try {
      const { signature } = await createTransaction(type, transaction);

      showNotification({
        type: "success",
        title: "Transaction send",
        message: `Click to see transaction.\n 
          Your transaction sent in blockchain, also you can check status in transactions page.`,
        link: `https://solscan.io/tx/${signature}`,
      });
    } catch (error) {
      console.error("🚨 SwapsStore createTransaction", error);

      if (isDetailedError(error) && error.response?.data.detail) {
        const { name, message } = error.response.data.detail;
        showNotification({
          type: "error",
          title: name,
          message,
        });

        return;
      }

      showNotification({
        type: "error",
        title: "Oops!",
        message: "Error while creating transaction",
      });
    }
  };
}

export default SwapsStore;
