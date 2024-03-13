import React from "react";

import classes from "./styles.module.css";

type Props = {
  height?: number | string;
  width?: number | string;
  borderWidth?: number;
};

const Spinner: React.FC<Props> = ({
  height = 64,
  width = 64,
  borderWidth = 11,
}) => {
  const containerStyles: React.CSSProperties = {
    height,
    width,
  };

  const spinnerStyles: React.CSSProperties = {
    borderWidth,
  };

  return (
    <div className={classes.container} style={containerStyles}>
      <div className={classes.spinner} style={spinnerStyles} />
    </div>
  );
};

export default Spinner;
