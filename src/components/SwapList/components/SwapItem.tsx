import React from "react";

import { Swapped, Sent, Received } from "@utils/swapsGenerator";
import middleTrim from "@utils/middleTrim";

import classes from "../styles.module.css";

type ExtraData = { id: string; date: string };

type Props = {
  swap: (Swapped | Sent | Received) & ExtraData;
};

const swapTypeGuard = (swap: Props["swap"]): swap is Swapped & ExtraData => {
  return swap.type === "swapped";
};

const sentTypeGuard = (swap: Props["swap"]): swap is Sent & ExtraData => {
  return swap.type === "sent";
};

const receivedTypeGuard = (
  swap: Props["swap"],
): swap is Received & ExtraData => {
  return swap.type === "received";
};

const withSign = (amount: number, currency: string) => {
  const amountMod = Math.abs(amount);
  const formattedAmount = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amountMod);
  return amount > 0
    ? `+${formattedAmount} ${currency}`
    : `-${formattedAmount} ${currency}`;
};

const SwapItem: React.FC<Props> = ({ swap }) => {
  if (swapTypeGuard(swap)) {
    return (
      <div className={classes.swap}>
        <div className={classes.titleCol}>
          <div className={classes.title}>Swapped</div>
          <div className={classes.description}>
            {swap.from.currency} {"->"} {swap.to.currency}
          </div>
        </div>
        <div className={classes.resultCol}>
          <div className={classes.raw}>
            {withSign(swap.from.amount, swap.from.currency)}
          </div>
          <div>{withSign(swap.to.amount, swap.to.currency)}</div>
        </div>
      </div>
    );
  }

  if (sentTypeGuard(swap)) {
    return (
      <div className={classes.swap}>
        <div className={classes.titleCol}>
          <div className={classes.title}>Sent</div>
          <div className={classes.description}>
            To: {middleTrim(swap.to, 3, 3)}
          </div>
        </div>
        <div className={classes.resultCol}>
          {withSign(swap.amount, swap.currency)}
        </div>
      </div>
    );
  }

  if (receivedTypeGuard(swap)) {
    return (
      <div className={classes.swap}>
        <div className={classes.titleCol}>
          <div className={classes.title}>Received</div>
          <div className={classes.description}>
            From: {middleTrim(swap.from, 3, 3)}
          </div>
        </div>
        <div className={classes.resultCol}>
          {withSign(swap.amount, swap.currency)}
        </div>
      </div>
    );
  }

  return null;
};

export default SwapItem;
