import React from "react";

import Skeleton from "@components/Skeleton";

import classes from "./styles.module.css";
import clsx from "clsx";

type Props = {
  removeOffset?: boolean;
};

const WalletTransactionItemSkeleton: React.FC<Props> = ({ removeOffset }) => {
  return (
    <div
      className={clsx(
        classes.transaction,
        classes.skeleton,
        removeOffset && classes.removeOffset,
      )}
    >
      <div className={classes.title}>
        <Skeleton height="100%" />
        <Skeleton height="100%" />
      </div>
      <div className={classes.info}>
        <Skeleton height="100%" />
        <Skeleton height="100%" />
        <Skeleton height="100%" />
      </div>
    </div>
  );
};

export default WalletTransactionItemSkeleton;
