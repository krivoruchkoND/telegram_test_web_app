import { useSwapsStore } from "@stores/SwapsStore";

import SwapItemsList from "./components/SwapItemsList";
import classes from "./styles.module.css";

const SwapList = () => {
  const swaps = useSwapsStore((state) => state.swaps);

  return (
    <ul className={classes.swaps}>
      {Object.entries(swaps).map(([date, swaps]) => (
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

export default SwapList;
