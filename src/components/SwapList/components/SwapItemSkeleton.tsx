import clsx from "clsx";

import Skeleton from "@components/Skeleton";

import classes from "../styles.module.css";

const SwapItemSkeleton = () => {
  return (
    <div className={clsx(classes.info)}>
      <Skeleton height="100%" />
    </div>
  );
};

export default SwapItemSkeleton;
