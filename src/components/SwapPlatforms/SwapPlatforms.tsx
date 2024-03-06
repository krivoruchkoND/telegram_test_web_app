import React from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import clsx from "clsx";

import { useAutobuySettingsStore } from "@stores/AutobuySettingsStore";
import arrowIcon from "@assets/SwapPlatformsArrowDown.svg";

import classes from "./styles.module.css";

const Arrow = (props: {
  direction: "up" | "down";
  onClick: (startIndex: number, endIndex: number) => void;
  index: number;
}) => {
  const { direction, onClick, index } = props;

  const handleClick = () => {
    if (direction === "up") {
      onClick(index, index - 1);
    } else {
      onClick(index, index + 1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(classes.swapArrow, classes[direction])}
    >
      <img src={arrowIcon} alt={`arrow-${direction}`} />
    </button>
  );
};

type Props = {
  onChange: () => void;
};

const SwapPlatforms: React.FC<Props> = ({ onChange }) => {
  const swapPlatforms = useAutobuySettingsStore((state) => state.swapPlatforms);
  const changeSwapPlatformsOrder = useAutobuySettingsStore(
    (state) => state.changeSwapPlatformsOrder,
  );

  if (swapPlatforms.length === 0) {
    return null;
  }

  const handleChangeOrder = (startIndex: number, endIndex: number) => {
    changeSwapPlatformsOrder(startIndex, endIndex);
    onChange();
  };

  return (
    <div className={classes.swapPlatformContainer}>
      <div className={classes.title}>Swap Platforms</div>
      <Flipper flipKey={swapPlatforms.map(({ id }) => id).join("")}>
        {swapPlatforms.map(({ id, title }, index) => (
          <Flipped key={id} flipId={id}>
            <div className={classes.swapPlatformItem}>
              <div className={classes.title}>{title}</div>
              <div className={classes.arrows}>
                {index !== swapPlatforms.length - 1 && (
                  <Arrow
                    direction="down"
                    onClick={handleChangeOrder}
                    index={index}
                  />
                )}
                {index !== 0 && (
                  <Arrow
                    direction="up"
                    onClick={handleChangeOrder}
                    index={index}
                  />
                )}
              </div>
            </div>
          </Flipped>
        ))}
      </Flipper>
      <div className={classes.description}>Choosing a platform for swap</div>
    </div>
  );
};

export default SwapPlatforms;
