import React from "react";
import { observer } from "mobx-react-lite";
import clsx from "clsx";

import { type Swap } from "@stores/SwapsStore";
import middleTrim from "@utils/middleTrim";
import formatNumber from "@utils/formatNumber";

import classes from "../styles.module.css";

type Props = {
  swap: Swap;
};

const withSign = (
  amount: number,
  currency: string = "UNKNOWN",
  type: "negative" | "positive",
) => {
  const amountMod = Math.abs(amount);
  const formattedAmount = formatNumber(amountMod, 9, 3);

  const resultString =
    type === "negative"
      ? `-${formattedAmount} ${currency}`
      : `+${formattedAmount} ${currency}`;

  return (
    <span
      className={clsx(
        type === "negative" ? classes.negative : classes.positive,
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
  const { id, type, fromAddress, toAddress } = swap;

  const handleRedirect = () => {
    if (id) {
      window?.open(`https://solscan.io/tx/${id}`, "_blank");
    }
  };

  if (type === "swapped") {
    return (
      <div className={classes.swap} onClick={handleRedirect}>
        <div className={classes.flex}>
          <Avatars
            firstImageInfo={{
              name: fromAddress.name || "Unknown",
              imgUrl: fromAddress.imageUrl,
            }}
            secondImageInfo={{
              name: toAddress.name || "Unknown",
              imgUrl: toAddress.imageUrl,
            }}
          />
          <div className={classes.titleCol}>
            <div className={classes.title}>Swapped</div>
            <div className={classes.description}>
              {fromAddress.symbol || "Unknown"} {"->"}{" "}
              {toAddress.symbol || "Unknown"}
            </div>
          </div>
        </div>
        <div className={classes.resultCol}>
          <div className={classes.raw}>
            {withSign(fromAddress.amount, fromAddress.symbol, "negative")}
          </div>
          <div className={classes.raw}>
            {withSign(toAddress.amount, toAddress.symbol, "positive")}
          </div>
        </div>
      </div>
    );
  }

  if (type === "send") {
    return (
      <div className={classes.swap} onClick={handleRedirect}>
        <div className={classes.flex}>
          <Avatars
            firstImageInfo={{
              name: toAddress.name || "Unknown",
              imgUrl: toAddress.imageUrl,
            }}
          />
          <div className={classes.titleCol}>
            <div className={classes.title}>Sent</div>
            <div className={classes.description}>
              To: {middleTrim(toAddress.address, 3, 3)}
            </div>
          </div>
        </div>
        <div className={classes.resultCol}>
          {withSign(toAddress.amount, toAddress.symbol, "negative")}
        </div>
      </div>
    );
  }

  if (type === "received") {
    return (
      <div className={classes.swap} onClick={handleRedirect}>
        <div className={classes.flex}>
          <Avatars
            firstImageInfo={{
              name: fromAddress.name || "Unknown",
              imgUrl: fromAddress.imageUrl,
            }}
          />
          <div className={classes.titleCol}>
            <div className={classes.title}>Received</div>
            <div className={classes.description}>
              From: {middleTrim(fromAddress.address, 3, 3)}
            </div>
          </div>
        </div>
        <div className={classes.resultCol}>
          {withSign(fromAddress.amount, fromAddress.symbol, "positive")}
        </div>
      </div>
    );
  }

  return null;
};

export default observer(SwapItem);
