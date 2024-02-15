import React from "react";

import { swapsGenerator } from "@utils/swapsGenerator";

import SwapItem from "./SwapItem";
import classes from "../styles.module.css";

type Props = {
  title: string;
  swaps: ReturnType<typeof swapsGenerator>;
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

export default SwapItemsList;
