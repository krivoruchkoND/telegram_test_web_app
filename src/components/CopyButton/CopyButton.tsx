import React from "react";

import useCopyToClipboard from "@hooks/useCopyToClipboard";
import middleTrim from "@utils/middleTrim";
import copyActiveIcon from "@assets/CopyActive.svg";

import classes from "./styles.module.css";

type Props = {
  value: string;
  trim?: boolean;
};

const CopyButton: React.FC<Props> = ({ value, trim }) => {
  const [, copy] = useCopyToClipboard();

  const handleCopy = () => {
    copy(value)
      .then(() => {
        console.log("Copied!", { value });
      })
      .catch((error) => {
        console.error("🚨 Failed to copy!", error);
      });
  };

  return (
    <button className={classes.copyButton} onClick={handleCopy}>
      <div className={classes.text}>
        {trim ? middleTrim(value, 4, 4) : value}
      </div>
      <div className={classes.icon}>
        <img src={copyActiveIcon} />
      </div>
    </button>
  );
};

export default CopyButton;
