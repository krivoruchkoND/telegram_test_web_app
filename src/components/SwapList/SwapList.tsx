import { observer } from "mobx-react-lite";

import useRootStore from "@hooks/useRootStore";
import RockWithMessage from "@components/RockWithMessage";

import SwapItemsList from "./components/SwapItemsList";
import SwapItemsListSkeleton from "./components/SwapItemsListSkeleton";
import classes from "./styles.module.css";

const SwapList = () => {
  const {
    swapsStore: { swaps, isLoading },
  } = useRootStore();

  const swapsByData = Object.entries(swaps);

  if (!isLoading.getSwaps && swapsByData.length === 0) {
    return <RockWithMessage message="No transactions" />;
  }

  return (
    <ul className={classes.swaps}>
      {isLoading.getSwaps
        ? new Array(5)
            .fill(null)
            .map((_, i) => <SwapItemsListSkeleton key={i} />)
        : swapsByData.map(([date, swaps]) => (
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
