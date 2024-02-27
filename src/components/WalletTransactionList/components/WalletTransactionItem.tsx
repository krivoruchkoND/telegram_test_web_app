import React from "react";
import { clsx } from "clsx";

import formatBugNumbers from "@utils/formatBigNumbers";
import { Transaction } from "@stores/WalletStore";

import classes from "../styles.module.css";

type PNLProps = { pnl: Transaction["pnl"] };

const PNL: React.FC<PNLProps> = ({ pnl }) => {
  if (pnl === null) {
    return (
      <div className={clsx(classes.column, classes.alignCenter)}>
        <div className={classes.title}>Trade PNL</div>
        <span>Unknown</span>
      </div>
    );
  }

  const isNegative = pnl.value < 0;
  const prefix = pnl.value > 0 ? "" : "+";

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
        {pnl.value.toFixed(3)} SOL ({prefix}
        {pnl.rate.toFixed(3)}%)
      </span>
    </div>
  );
};

type Props = {
  transaction: Transaction;
};

const WalletTransactionItem: React.FC<Props> = ({ transaction }) => {
  const { value, marketCap, pnl, amount, metadata } = transaction;
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
          <span className={classes.name}>{name}</span>
        </div>
        <span className={classes.cap}>${formatBugNumbers(marketCap)}</span>
      </div>
      <div className={classes.info}>
        <div className={classes.column}>
          <div className={classes.title}>Value</div>
          <span>{formatBugNumbers(value)} SOL</span>
        </div>
        <PNL pnl={pnl} />
        <div className={clsx(classes.column, classes.alignRight)}>
          <div className={classes.title}>Amount</div>
          <span>
            {amount ? `${formatBugNumbers(amount)} ${symbol}` : "Unknown"}
          </span>
        </div>
      </div>
    </li>
  );
};

export default WalletTransactionItem;
