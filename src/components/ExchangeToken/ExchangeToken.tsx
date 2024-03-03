import React from "react";
import { clsx } from "clsx";

import formatBugNumbers from "@utils/formatBigNumbers";
import classes from "./styles.module.css";
import { Token } from "@apis/wallet.ts";

type Props = {
  token: Token;
};

const PNL: React.FC<{ pnl: number | null; amount: number | null }> = ({
  pnl,
  amount,
}) => {
  if (pnl === null || amount === null) {
    return (
      <div className={clsx(classes.column, classes.alignCenter)}>
        <div className={classes.title}>Trade PNL</div>
        <span>Unknown</span>
      </div>
    );
  }

  const PNLPercent = (pnl / amount) * 100;
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
        {pnl.toFixed(2)} SOL ({prefix}
        {PNLPercent.toFixed(2)}%)
      </span>
    </div>
  );
};

const ExchangeToken: React.FC<Props> = ({ token }) => {
  const {
    value,
    marketCap,
    pnl,
    amount,
    metadata: { name, symbol, imageUrl },
  } = token;

  return (
    <li className={classes.token}>
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
        <PNL pnl={pnl.value} amount={amount} />
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

export default ExchangeToken;
