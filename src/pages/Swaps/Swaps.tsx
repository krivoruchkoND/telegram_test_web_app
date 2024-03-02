import { useEffect } from "react";

import SwapList from "@/components/SwapList";
import { useSwapsStore } from "@stores/SwapsStore";
import { useAuthStore } from "@stores/AuthStore";

import classes from "./styles.module.css";
const Swaps = () => {
  const getSwaps = useSwapsStore((state) => state.getSwaps);
  const isAuthSucceed = useAuthStore((store) => store.isAuthSucceed);

  useEffect(() => {
    if (isAuthSucceed) {
      getSwaps();
    }
  }, [isAuthSucceed]);

  return (
    <section className={classes.swaps}>
      <SwapList />
    </section>
  );
};

export default Swaps;
