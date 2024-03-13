import React from "react";

import rockIcon from "@assets/RockGray.svg";
import classes from "./styles.module.css";

type Props = {
  message: string;
};

const RockWithMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className={classes.container}>
      <div className={classes.icon}>
        <img src={rockIcon} height="100%" width="100%" />
      </div>
      <div className={classes.message}>{message}</div>
    </div>
  );
};

export default RockWithMessage;
