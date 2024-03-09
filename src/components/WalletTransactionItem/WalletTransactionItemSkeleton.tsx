import Skeleton from "@components/Skeleton";

import classes from "./styles.module.css";
import clsx from "clsx";

const WalletTransactionItemSkeleton = () => {
  return (
    <div className={clsx(classes.transaction, classes.skeleton)}>
      <div className={classes.title}>
        <Skeleton width="50%" height="100%" />
        <Skeleton width="35%" height="100%" />
      </div>
      <div className={classes.info}>
        <Skeleton width="30%" height="100%" />
        <Skeleton width="40%" height="100%" />
        <Skeleton width="25%" height="100%" />
      </div>
    </div>
  );
};

export default WalletTransactionItemSkeleton;
