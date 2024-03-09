import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Flipped, Flipper } from "react-flip-toolkit";
import clsx from "clsx";
import arrowIcon from "@assets/SwapPlatformsArrowDown.svg";

import classes from "./styles.module.css";
import GenericSettingsStore from "@stores/GenericSettingsStore.ts";
import Switch from "@components/Switch";

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
  isLocked: boolean;
};

const SwapPlatformItem: React.FC<SwapPlatformItemProps> = ({
  title,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  isLocked,
  ...flipperProps
}) => {
  return (
    <div
      className={clsx(classes.swapPlatformItem, isLocked && classes.locked)}
      {...flipperProps}
    >
      <div className={classes.title}>{title}</div>
      <div className={classes.arrows}>
        {!isLast && !isLocked && (
          <Arrow direction="down" onClick={onMoveDown} />
        )}
        {!isFirst && !isLocked && <Arrow direction="up" onClick={onMoveUp} />}
      </div>
    </div>
  );
};

type Props = {
  onChange: () => void;
  settings: GenericSettingsStore;
};

const SwapPlatforms: React.FC<Props> = ({ onChange, settings }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing((isEditing) => !isEditing);

  const {
    swapPlatforms,
    allowAutoPlatforms,
    changeSwapPlatformsOrder,
    setAllowAutoPlatforms,
  } = settings;

  const toggleAllowAutoPlatforms = () => {
    setAllowAutoPlatforms(!allowAutoPlatforms);
  };

  const isLocked = !isEditing || allowAutoPlatforms;

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
      <div className={classes.swapPlatformsHeader}>
        <div className={classes.left}>
          <h4 className={classes.title}>Swap Platforms</h4>

          <button
            className={classes.editButton}
            onClick={toggleEditing}
            disabled={allowAutoPlatforms}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <Switch
          id={"auto"}
          label={"Auto"}
          checked={allowAutoPlatforms}
          onChange={toggleAllowAutoPlatforms}
        />
      </div>

      <Flipper flipKey={swapPlatforms.map(({ id }) => id).join("")}>
        {swapPlatforms.map(({ id, title }, index) => (
          <Flipped key={id} flipId={id}>
            <SwapPlatformItem
              title={title}
              isFirst={index === 0}
              isLast={index === swapPlatforms.length - 1}
              onMoveUp={() => moveUp(index)}
              onMoveDown={() => moveDown(index)}
              isLocked={isLocked}
            />
          </Flipped>
        ))}
      </Flipper>

      <div className={classes.description}>Choosing a platform for swap</div>
    </div>
  );
};

export default observer(SwapPlatforms);
