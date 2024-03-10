import React from "react";
import { observer } from "mobx-react-lite";
import { useLocation } from "wouter";
import { clsx } from "clsx";

import formatNumber from "@utils/formatNumber";
import { Transaction } from "@stores/WalletStore";

import classes from "./styles.module.css";

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
        {formatNumber(pnl.value, 2)} SOL ({prefix}
        {formatNumber(pnl.rate, 2)}%)
      </span>
    </div>
  );
};

type Props = {
  transaction: Transaction;
  shouldRedirectOnClick?: boolean;
  isOutOfList?: boolean;
};

const WalletTransactionItem: React.FC<Props> = ({
  transaction,
  shouldRedirectOnClick,
  isOutOfList,
}) => {
  const [, setLocation] = useLocation();
  const { value, marketCap, pnl, amount, metadata, id } = transaction;
  const { name, symbol, imageUrl } = metadata;

  const handleRedirect = () => {
    if (shouldRedirectOnClick) {
      setLocation(`/transaction/${id}`);
    }
  };

  const titleContent = (
    <>
      <div className={classes.nameContainer}>
        <div
          className={clsx(classes.avatar, imageUrl && classes.clearBackground)}
        >
          {imageUrl ? (
            <img src={imageUrl} alt={symbol} />
          ) : (
            name[0].toUpperCase()
          )}
        </div>
        <span className={classes.name}>{name}</span>
      </div>
      <span className={classes.cap}>${formatNumber(marketCap, 3, 2)}</span>
    </>
  );

  const itemContent = (
    <>
      <div className={classes.title}>{titleContent}</div>
      <div className={classes.info}>
        <div className={classes.column}>
          <div className={classes.title}>Value</div>
          <span>{formatNumber(value ?? 0, 3, 2)} SOL</span>
        </div>
        <PNL pnl={pnl} />
        <div className={clsx(classes.column, classes.alignRight)}>
          <div className={classes.title}>Amount</div>
          <span>
            {amount ? `${formatNumber(amount, 3, 1)} ${symbol}` : "Unknown"}
          </span>
        </div>
      </div>
    </>
  );

  return isOutOfList ? (
    <div className={clsx(classes.transaction, classes.removeOffset)}>
      {itemContent}
    </div>
  ) : (
    <li className={classes.transaction} onClick={handleRedirect}>
      {itemContent}
    </li>
  );
};

export default observer(WalletTransactionItem);
