import React from "react";
import { clsx } from "clsx";

import walletTransactionsGenerator from "@utils/walletTransactionsGenerator";

import classes from "../styles.module.css";

type Props = {
  transaction: ReturnType<typeof walletTransactionsGenerator>[number];
};

const WalletTransactionItem: React.FC<Props> = ({ transaction }) => {
  const { name, value, coinCap, PNL, PNLPercent, initial } = transaction;

  const isNegative = PNL < 0;

  return (
    <li className={classes.transaction}>
      <div className={classes.title}>
        <div className={classes.nameContainer}>
          <div className={classes.avatar}>{name[0].toUpperCase()}</div>
          <span className={classes.name}>{name}</span>
        </div>
        <span className={classes.cap}>${coinCap}</span>
      </div>
      <div className={classes.info}>
        <div className={classes.column}>
          <div className={classes.title}>Value</div>
          <span>{value} SOL</span>
        </div>
        <div className={clsx(classes.column, classes.alignCenter)}>
          <div className={classes.title}>Trade PNL</div>
          <span
            className={clsx(
              classes.preventWrap,
              isNegative ? classes.negative : classes.positive,
            )}
          >
            {PNL} SOL ({PNLPercent}%)
          </span>
        </div>
        <div className={clsx(classes.column, classes.alignRight)}>
          <div className={classes.title}>Initial</div>
          <span>{initial} SOL</span>
        </div>
      </div>
    </li>
  );
};

export default WalletTransactionItem;
