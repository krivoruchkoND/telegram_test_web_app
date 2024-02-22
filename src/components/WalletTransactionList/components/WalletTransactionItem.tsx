import React from "react";
import { clsx } from "clsx";

import formatBugNumbers from "@utils/formatBigNumbers";
import { Transaction } from "@stores/WalletStore";

import classes from "../styles.module.css";

type Props = {
  transaction: Transaction;
};

const PNL: React.FC<{ pnl: number | null; initial: number | null }> = ({
  pnl,
  initial,
}) => {
  if (pnl === null || initial === null) {
    return (
      <div className={clsx(classes.column, classes.alignCenter)}>
        <div className={classes.title}>Trade PNL</div>
        <span>Unknown</span>
      </div>
    );
  }

  const PNLPercent = (pnl / initial) * 100;
  const isNegative = pnl < 0;
  const prefix = isNegative ? "-" : "+";

  return (
    <div className={clsx(classes.column, classes.alignCenter)}>
      <div className={classes.title}>Trade PNL</div>
      <span
        className={clsx(
          classes.preventWrap,
          isNegative ? classes.negative : classes.positive,
        )}
      >
        {prefix}
        {pnl.toFixed(3)} SOL ({prefix}
        {PNLPercent.toFixed(3)}%)
      </span>
    </div>
  );
};

const WalletTransactionItem: React.FC<Props> = ({ transaction }) => {
  const { value, marketCap, pnl, initial, metadata } = transaction;
  const { name, symbol, imageUrl } = metadata;

  return (
    <li className={classes.transaction}>
      <div className={classes.title}>
        <div className={classes.nameContainer}>
          <div className={classes.avatar}>
            {imageUrl ? (
              <img src={imageUrl} alt={symbol} />
            ) : (
              name[0].toUpperCase()
            )}
          </div>
          <span className={classes.name}>{symbol}</span>
        </div>
        <span className={classes.cap}>${formatBugNumbers(marketCap)}</span>
      </div>
      <div className={classes.info}>
        <div className={classes.column}>
          <div className={classes.title}>Value</div>
          <span>{value.toFixed(5)} SOL</span>
        </div>
        <PNL pnl={pnl} initial={initial} />
        <div className={clsx(classes.column, classes.alignRight)}>
          <div className={classes.title}>Initial</div>
          <span>{initial ? `${initial.toFixed(5)} SOL` : "Unknown"}</span>
        </div>
      </div>
    </li>
  );
};

export default WalletTransactionItem;
