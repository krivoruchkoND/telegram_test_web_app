import Skeleton from "@components/Skeleton";

import SwapItemSkeleton from "./SwapItemSkeleton";
import classes from "../styles.module.css";

const SwapItemsListSkeleton = () => {
  return (
    <li>
      <div className={classes.skeleton}>
        <div className={classes.date}>
          <Skeleton height={17} width={100} />
        </div>
        {new Array(3).fill(null).map((_, i) => (
          <SwapItemSkeleton key={i} />
        ))}
      </div>
    </li>
  );
};

export default SwapItemsListSkeleton;
