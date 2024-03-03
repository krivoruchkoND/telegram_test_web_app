import React from "react";
import { clsx } from "clsx";

import formatBugNumbers from "@utils/formatBigNumbers";
import { Transaction } from "@stores/WalletStore";

import classes from "../styles.module.css";
import { Link } from "wouter";

type Props = {
  transaction: Transaction;
};

const PNL: React.FC<{
  pnl: { rate: number; value: number };
  amount: number;
}> = ({ pnl, amount }) => {
  if (pnl === null || amount === null) {
    return (
      <div className={clsx(classes.column, classes.alignCenter)}>
        <div className={classes.title}>Trade PNL</div>
        <span>Unknown</span>
      </div>
    );
  }

  const PNLPercent = (pnl.value / amount) * 100;
  const isNegative = pnl.value < 0;
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
        {pnl.value.toFixed(3)} SOL ({prefix}
        {PNLPercent.toFixed(3)}%)
      </span>
    </div>
  );
};

const WalletTransactionItem: React.FC<Props> = ({ transaction }) => {
  const { value, marketCap, pnl, amount, metadata } = transaction;
  const { name, symbol, imageUrl } = metadata;

  return (
    <Link href={`/exchange/${transaction.id}`}>
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
          <PNL pnl={pnl} amount={amount} />
          <div className={clsx(classes.column, classes.alignRight)}>
            <div className={classes.title}>Initial</div>
            <span>
              {amount ? `${formatBugNumbers(amount)} ${symbol}` : "Unknown"}
            </span>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default WalletTransactionItem;
