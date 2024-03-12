import { observer } from "mobx-react-lite";

import useRootStore from "@hooks/useRootStore";

import SwapItemsList from "./components/SwapItemsList";
import SwapItemsListSkeleton from "./components/SwapItemsListSkeleton";
import classes from "./styles.module.css";

const SwapList = () => {
  const {
    swapsStore: { swaps, isLoading },
  } = useRootStore();

  return (
    <ul className={classes.swaps}>
      {isLoading.getSwaps
        ? new Array(5)
            .fill(null)
            .map((_, i) => <SwapItemsListSkeleton key={i} />)
        : Object.entries(swaps).map(([date, swaps]) => (
            <SwapItemsList
              key={date}
              title={Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
              }).format(new Date(date))}
              swaps={swaps}
            />
          ))}
    </ul>
  );
};

export default observer(SwapList);
