import React from "react";
import { observer } from "mobx-react-lite";

import { type Swap } from "@stores/SwapsStore";

import SwapItem from "./SwapItem";
import classes from "../styles.module.css";

type Props = {
  title: string;
  swaps: (Swap & { id: string })[];
};

const SwapItemsList: React.FC<Props> = ({ title, swaps }) => {
  return (
    <li>
      <div className={classes.swapsGroup}>
        <h4 className={classes.date}>{title}</h4>
        {swaps.map((swap) => (
          <SwapItem key={swap.id} swap={swap} />
        ))}
      </div>
    </li>
  );
};

export default observer(SwapItemsList);
