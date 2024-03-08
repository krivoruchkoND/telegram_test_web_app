import { makeAutoObservable, runInAction } from "mobx";

import { getSwaps } from "@apis/swaps";
import combineSwapsByDay from "@utils/combineSwapsByDay";

import RootStore from "./RootStore";

export type Swap = Awaited<ReturnType<typeof getSwaps>>["swaps"][number];

class SwapsStore {
  rootStore: RootStore;
  page: number = 1;
  size: number = 100;
  swaps: { [key: string]: Swap[] } = {};

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  getSwaps = async () => {
    try {
      const { swaps } = await getSwaps({
        page: this.page,
        size: this.size,
      });

      runInAction(() => {
        this.swaps = combineSwapsByDay(swaps);
      });
    } catch (error) {
      console.error("SwapsStore getSwaps", error);
    }
  };
}

export default SwapsStore;
