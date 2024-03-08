import React from "react";
import { observer } from "mobx-react-lite";
import { Flipper, Flipped } from "react-flip-toolkit";
import clsx from "clsx";

import { useRootStore } from "@hooks/useRootStore";
import arrowIcon from "@assets/SwapPlatformsArrowDown.svg";

import classes from "./styles.module.css";

type ArrowProps = {
  direction: "up" | "down";
  onClick: () => void;
  disabled?: boolean;
};

const Arrow: React.FC<ArrowProps> = ({ direction, onClick, disabled }) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={clsx(
        classes.swapArrow,
        classes[direction],
        disabled && classes.disabled,
      )}
    >
      <img src={arrowIcon} alt={`arrow-${direction}`} />
    </button>
  );
};

type SwapPlatformItemProps = {
  title: string;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

const SwapPlatformItem: React.FC<SwapPlatformItemProps> = ({
  title,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  ...flipperProps
}) => {
  return (
    <div className={classes.swapPlatformItem} {...flipperProps}>
      <div className={classes.title}>{title}</div>
      <div className={classes.arrows}>
        {!isLast && <Arrow direction="down" onClick={onMoveDown} />}
        {!isFirst && <Arrow direction="up" onClick={onMoveUp} />}
      </div>
    </div>
  );
};

type Props = {
  onChange: () => void;
};

const SwapPlatforms: React.FC<Props> = ({ onChange }) => {
  const {
    settingsStore: { autoBuySettings },
  } = useRootStore();
  const { swapPlatforms, changeSwapPlatformsOrder } = autoBuySettings;

  if (swapPlatforms.length === 0) {
    return null;
  }

  const handleChangeOrder = (startIndex: number, endIndex: number) => {
    changeSwapPlatformsOrder(startIndex, endIndex);
    onChange();
  };

  const moveUp = (index: number) => {
    handleChangeOrder(index, index - 1);
  };

  const moveDown = (index: number) => {
    handleChangeOrder(index, index + 1);
  };

  return (
    <div className={classes.swapPlatformContainer}>
      <div className={classes.title}>Swap Platforms</div>
      <Flipper flipKey={swapPlatforms.map(({ id }) => id).join("")}>
        {swapPlatforms.map(({ id, title }, index) => (
          <Flipped key={id} flipId={id}>
            <SwapPlatformItem
              title={title}
              isFirst={index === 0}
              isLast={index === swapPlatforms.length - 1}
              onMoveUp={() => moveUp(index)}
              onMoveDown={() => moveDown(index)}
            />
          </Flipped>
        ))}
      </Flipper>
      <div className={classes.description}>Choosing a platform for swap</div>
    </div>
  );
};

export default observer(SwapPlatforms);
