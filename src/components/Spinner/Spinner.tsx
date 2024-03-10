import React from "react";

import classes from "./styles.module.css";

type Props = {
  height?: number | string;
  width?: number | string;
};

const Spinner: React.FC<Props> = ({ height = 64, width = 64 }) => {
  const styles: React.CSSProperties = {
    height,
    width,
  };

  return (
    <div className={classes.container} style={styles}>
      <div className={classes.spinner} />
    </div>
  );
};

export default Spinner;
