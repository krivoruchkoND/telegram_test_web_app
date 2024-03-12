import React from "react";

import classes from "./styles.module.css";

type Props = {
  height?: number | string;
  width?: number | string;
  borderRadius?: number | string;
};

const Skeleton: React.FC<Props> = ({
  height = "16px",
  width = "100%",
  borderRadius = "4px",
}) => {
  const styles: React.CSSProperties = {
    height,
    width,
    borderRadius,
  };

  return <div className={classes.skeleton} style={styles} />;
};

export default Skeleton;
