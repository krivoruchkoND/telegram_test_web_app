import clsx from "clsx";

import Skeleton from "@components/Skeleton";

import classes from "../styles.module.css";

const SwapItemSkeleton = () => {
  return (
    <div className={clsx(classes.info)}>
      <Skeleton width="20%" height="100%" />
      <Skeleton width="45%" height="100%" />
      <Skeleton width="30%" height="100%" />
    </div>
  );
};

export default SwapItemSkeleton;
