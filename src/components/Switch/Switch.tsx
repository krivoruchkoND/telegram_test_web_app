import React from "react";
import RSwitch from "react-switch";

import classes from "./styles.module.css";

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const getCssVariableValue = (variableName: string) => {
  return window
    ?.getComputedStyle(document.documentElement)
    ?.getPropertyValue(variableName)
    ?.trim();
};

const Switch: React.FC<Props> = ({ id, label, onChange, checked }) => {
  return (
    <label className={classes.switch} htmlFor={id}>
      <span className={classes.label}>{label}</span>
      <RSwitch
        id={id}
        uncheckedIcon={false}
        checkedIcon={false}
        width={51}
        height={31}
        handleDiameter={27}
        borderRadius={20}
        onChange={onChange}
        checked={checked}
        onColor={getCssVariableValue("--rb-background-color-4") || "#080"}
      />
    </label>
  );
};

export default Switch;
