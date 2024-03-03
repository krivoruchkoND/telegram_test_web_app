import React from "react";
import classes from "./styles.module.css";
import { clsx } from "clsx";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const ExchangeSwitch: React.FC<Props> = ({ checked, onChange }) => {
  return (
    <>
      <label className={classes.exchange_switch}>
        <input
          type="checkbox"
          onChange={(event) => onChange(event.target.checked)}
        />

        <div className={classes.sections}>
          <p>Buy</p>
          <p>Sell</p>
        </div>

        <div
          className={clsx(classes.label, checked && classes.active_label)}
        ></div>
      </label>
    </>
  );
};

export default ExchangeSwitch;
