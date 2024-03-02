import React from "react";

import { type Swap } from "@stores/SwapsStore";
import middleTrim from "@utils/middleTrim";

import classes from "../styles.module.css";
import clsx from "clsx";

type Props = {
  swap: Swap;
};

const withSign = (amount: number, currency?: string, highlight = false) => {
  const amountMod = Math.abs(amount);
  const formattedAmount = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amountMod);

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
  url?: string; // or uri?
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
          firstImageInfo.url && classes.clearBackground,
          secondImageInfo ? classes.topLeft : classes.singleImage,
        )}
      >
        {firstImageInfo.url ? (
          <img src={firstImageInfo.url} alt={firstImageInfo.name} />
        ) : (
          firstImageInfo.name[0].toUpperCase()
        )}
      </div>

      {secondImageInfo && (
        <div
          className={clsx(
            classes.avatar,
            secondImageInfo.url && classes.clearBackground,
            classes.bottomRight,
          )}
        >
          {secondImageInfo.url ? (
            <img src={secondImageInfo.url} alt={secondImageInfo.name} />
          ) : (
            secondImageInfo.name[0].toUpperCase()
          )}
        </div>
      )}
    </div>
  );
};

const SwapItem: React.FC<Props> = ({ swap }) => {
  if (swap.type === "swapped") {
    return (
      <div className={classes.swap}>
        <div className={classes.flex}>
          <Avatars
            firstImageInfo={{
              name: swap.fromAddress.name || "Unknown",
              url: swap.fromAddress.uri,
            }}
            secondImageInfo={{
              name: swap.toAddress.name || "Unknown",
              url: swap.toAddress.uri,
            }}
          />
          <div className={classes.titleCol}>
            <div className={classes.title}>Swapped</div>
            <div className={classes.description}>
              {swap.fromAddress.name} {"->"} {swap.toAddress.name}
            </div>
          </div>
        </div>
        <div className={classes.resultCol}>
          <div className={classes.raw}>
            {withSign(swap.fromAddress.amount, swap.fromAddress.name)}
          </div>
          <div className={classes.raw}>
            {withSign(swap.toAddress.amount, swap.toAddress.name, true)}
          </div>
        </div>
      </div>
    );
  }

  if (swap.type === "send") {
    return (
      <div className={classes.swap}>
        <div className={classes.flex}>
          <Avatars
            firstImageInfo={{
              name: swap.toAddress.name || "Unknown",
              url: swap.toAddress.uri,
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
          {withSign(swap.toAddress.amount, "SOL", true)}
        </div>
      </div>
    );
  }

  if (swap.type === "received") {
    return (
      <div className={classes.swap}>
        <div className={classes.flex}>
          <Avatars
            firstImageInfo={{
              name: swap.fromAddress.name || "Unknown",
              url: swap.fromAddress.uri,
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
          {withSign(swap.fromAddress.amount, "SOL", true)}
        </div>
      </div>
    );
  }

  return null;
};

export default SwapItem;
