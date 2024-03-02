import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { getSwaps } from "@apis/swaps";
import combineSwapsByDay from "@utils/combineSwapsByDay";

export type Swap = Awaited<ReturnType<typeof getSwaps>>["swaps"][number];

export type SwapsStore = {
  page: number;
  size: number;

  swaps: { [key: string]: (Swap & { id: string })[] };

  getSwaps: () => Promise<void>;
};

export const useSwapsStore = create<SwapsStore>()(
  immer((set) => ({
    page: 1,
    size: 10,
    swaps: {},

    getSwaps: async () => {
      try {
        const { swaps } = await getSwaps({
          page: 1,
          size: 100, // TODO: implement pagination
        });

        set((state) => {
          state.swaps = combineSwapsByDay(swaps);
        });
      } catch (error) {
        console.error(error);
      }
    },
  })),
);
