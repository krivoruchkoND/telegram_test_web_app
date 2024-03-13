import React from "react";
import { observer } from "mobx-react-lite";
import { useLocation } from "wouter";
import { clsx } from "clsx";

import formatNumber from "@utils/formatNumber";
import { Transaction } from "@stores/WalletStore";

import classes from "./styles.module.css";

const dash = "—";
const solanaId = "So11111111111111111111111111111111111111112";

type PNLProps = { pnl: Transaction["pnl"] };

const PNL: React.FC<PNLProps> = ({ pnl }) => {
  if (pnl === null) {
    return (
      <div className={clsx(classes.column, classes.alignCenter)}>
        <div className={classes.title}>Trade PNL</div>
        <span>{dash}</span>
      </div>
    );
  }

  const isNegative = pnl.value < 0;
  const prefix = isNegative ? "" : "+";

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
  const { id, value, marketCap, pnl, amount, metadata } = transaction;
  const { name, symbol, imageUrl } = metadata;

  const handleRedirect = () => {
    if (id !== solanaId && shouldRedirectOnClick) {
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
      <span className={classes.cap}>
        {marketCap !== null ? `$${formatNumber(marketCap, 3, 2)}` : dash}
      </span>
    </>
  );

  const itemContent = (
    <>
      <div className={classes.title}>{titleContent}</div>
      <div className={classes.info}>
        <div className={classes.column}>
          <div className={classes.title}>Value</div>
          <span>
            {value !== null ? `${formatNumber(value, 3, 2)} SOL` : dash}
          </span>
        </div>
        <PNL pnl={pnl} />
        <div className={clsx(classes.column, classes.alignRight)}>
          <div className={classes.title}>Amount</div>
          <span>
            {amount !== null ? `${formatNumber(amount, 3, 1)} ${symbol}` : dash}
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
