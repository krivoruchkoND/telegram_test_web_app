import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useRootStore } from "@hooks/useRootStore";
import SwapList from "@components/SwapList";

import classes from "./styles.module.css";
const Swaps = () => {
  const {
    swapsStore: { getSwaps },
    authStore: { isAuthSucceed },
  } = useRootStore();

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

export default observer(Swaps);
