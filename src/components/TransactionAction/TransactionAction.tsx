import React, { useState, useRef } from "react";

import RSwitch from "@components/ReactSwitch";
import useResizeObserver from "@hooks/useResizeObserver";
import getCssVariableValue from "@utils/getCssVariableValue";

import classes from "./styles.module.css";
import clsx from "clsx";

type Props = {
  action: "buy" | "sell";
  onChange: (action: "buy" | "sell") => void;
};

const TransactionAction: React.FC<Props> = ({ action, onChange }) => {
  const ref = useRef<HTMLLabelElement>(null);
  const [checked, setChecked] = useState(action === "sell");

  const { width = 0 } = useResizeObserver({ ref, box: "border-box" });
  const handleChange = (checked: boolean) => {
    setChecked(checked);
    onChange(checked ? "sell" : "buy");
  };

  return (
    <label
      ref={ref}
      className={classes.actionSwitch}
      htmlFor="transactionAction"
    >
      <span className={classes.label}>Choose action</span>
      <div className={classes.wrapper}>
        <RSwitch
          id="transactionAction"
          key={width} // rerender RSwitch when width calculated
          width={width}
          height={60}
          handleDiameter={52}
          handleWidth={width / 2 - 1}
          borderRadius={20}
          onChange={handleChange}
          checked={checked}
          offColor={getCssVariableValue("--rb-background-color-5")}
          onColor={getCssVariableValue("--rb-background-color-5")}
          offHandleColor={getCssVariableValue("--rb-background-color-6")}
          onHandleColor={getCssVariableValue("--rb-background-color-6")}
          boxShadow={getCssVariableValue("--rb-box-shadow-1") || undefined}
          uncheckedIcon={<div className={clsx(classes.handle)}>Sell</div>}
          checkedIcon={<div className={clsx(classes.handle)}>Buy</div>}
          uncheckedHandleIcon={
            <div className={clsx(classes.handle, classes.checked)}>Buy</div>
          }
          checkedHandleIcon={
            <div className={clsx(classes.handle, classes.checked)}>Sell</div>
          }
        />
      </div>
    </label>
  );
};

export default TransactionAction;
