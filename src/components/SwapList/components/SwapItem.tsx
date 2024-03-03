import React from "react";

import { type Swap } from "@stores/SwapsStore";
import middleTrim from "@utils/middleTrim";
import formatBugNumbers from "@utils/formatBigNumbers";

import classes from "../styles.module.css";
import clsx from "clsx";

type Props = {
  swap: Swap;
};

const withSign = (amount: number, currency?: string, highlight = false) => {
  const amountMod = Math.abs(amount);
  const formattedAmount = formatBugNumbers(amountMod);

  const resultString =
    amount > 0
      ? `+${formattedAmount} ${currency}`
      : `${formattedAmount} ${currency}`;

  return (
    <span
      className={clsx(
        highlight && amount > 0 ? classes.positive : classes.negative,
      )}
    >
      {resultString}
    </span>
  );
};

type ImageInfo = {
  name: string;
  imgUrl?: string;
};

const Avatars: React.FC<{
  firstImageInfo: ImageInfo;
  secondImageInfo?: ImageInfo;
}> = ({ firstImageInfo, secondImageInfo }) => {
  return (
    <div className={classes.avatars}>
      <div
        className={clsx(
          classes.avatar,
          firstImageInfo.imgUrl && classes.clearBackground,
          secondImageInfo ? classes.topLeft : classes.singleImage,
        )}
      >
        {firstImageInfo.imgUrl ? (
          <img src={firstImageInfo.imgUrl} alt={firstImageInfo.name} />
        ) : (
          firstImageInfo.name[0].toUpperCase()
        )}
      </div>

      {secondImageInfo && (
        <div
          className={clsx(
            classes.avatar,
            secondImageInfo.imgUrl && classes.clearBackground,
            classes.bottomRight,
          )}
        >
          {secondImageInfo.imgUrl ? (
            <img src={secondImageInfo.imgUrl} alt={secondImageInfo.name} />
          ) : (
            secondImageInfo.name[0].toUpperCase()
          )}
        </div>
      )}
    </div>
  );
};

const SwapItem: React.FC<Props> = ({ swap }) => {
  const handleRedirect = () => {
    if (swap.id) {
      window?.open(`https://solscan.io/tx/${swap.id}`, "_blank");
    }
  };

  if (swap.type === "swapped") {
    return (
      <div className={classes.swap} onClick={handleRedirect}>
        <div className={classes.flex}>
          <Avatars
            firstImageInfo={{
              name: swap.fromAddress.name || "Unknown",
              imgUrl: swap.fromAddress.imageUrl,
            }}
            secondImageInfo={{
              name: swap.toAddress.name || "Unknown",
              imgUrl: swap.toAddress.imageUrl,
            }}
          />
          <div className={classes.titleCol}>
            <div className={classes.title}>Swapped</div>
            <div className={classes.description}>
              {swap.fromAddress.symbol} {"->"} {swap.toAddress.symbol}
            </div>
          </div>
        </div>
        <div className={classes.resultCol}>
          <div className={classes.raw}>
            {withSign(swap.fromAddress.amount, swap.fromAddress.symbol)}
          </div>
          <div className={classes.raw}>
            {withSign(swap.toAddress.amount, swap.toAddress.symbol, true)}
          </div>
        </div>
      </div>
    );
  }

  if (swap.type === "send") {
    return (
      <div className={classes.swap} onClick={handleRedirect}>
        <div className={classes.flex}>
          <Avatars
            firstImageInfo={{
              name: swap.toAddress.symbol || "Unknown",
              imgUrl: swap.toAddress.imageUrl,
            }}
          />
          <div className={classes.titleCol}>
            <div className={classes.title}>Sent</div>
            <div className={classes.description}>
              To: {middleTrim(swap.toAddress.address, 3, 3)}
            </div>
          </div>
        </div>
        <div className={classes.resultCol}>
          {withSign(swap.toAddress.amount, swap.toAddress.symbol, true)}
        </div>
      </div>
    );
  }

  if (swap.type === "received") {
    return (
      <div className={classes.swap} onClick={handleRedirect}>
        <div className={classes.flex}>
          <Avatars
            firstImageInfo={{
              name: swap.fromAddress.name || "Unknown",
              imgUrl: swap.fromAddress.imageUrl,
            }}
          />
          <div className={classes.titleCol}>
            <div className={classes.title}>Received</div>
            <div className={classes.description}>
              From: {middleTrim(swap.fromAddress.address, 3, 3)}
            </div>
          </div>
        </div>
        <div className={classes.resultCol}>
          {withSign(swap.fromAddress.amount, swap.fromAddress.symbol, true)}
        </div>
      </div>
    );
  }

  return null;
};

export default SwapItem;
