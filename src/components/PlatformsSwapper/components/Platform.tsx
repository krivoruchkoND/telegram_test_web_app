import React from "react";
import classes from "./styles.module.css";
import GreenArrowDown from "@assets/GreenArrowDown.svg";
import { clsx } from "clsx";

type Props = {
  name: string;
  isEditing: boolean;
  isFirst: boolean;
  isLast: boolean;
  onClickUp: () => void;
  onClickDown: () => void;
};

const Platform: React.FC<Props> = ({
  name,
  isFirst,
  isLast,
  onClickUp,
  onClickDown,
  isEditing,
}) => {
  return (
    <div className={classes.platform}>
      {name}

      {isEditing && (
        <div className={classes.buttons}>
          {!isLast && (
            <button className={classes.button} onClick={onClickDown}>
              <img src={GreenArrowDown} alt={"arrow down"} />
            </button>
          )}

          {!isFirst && (
            <button
              className={clsx(classes.button, classes.button_down)}
              onClick={onClickUp}
            >
              <img src={GreenArrowDown} alt={"arrow up"} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Platform;
