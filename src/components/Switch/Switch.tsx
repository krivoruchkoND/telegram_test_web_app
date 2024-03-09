import React from "react";

import RSwitch from "@components/ReactSwitch";
import getCssVariableValue from "@utils/getCssVariableValue";

import classes from "./styles.module.css";

type Props = {
  id: string;
  label: string;
  subLabel?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Switch: React.FC<Props> = ({
  id,
  label,
  subLabel,
  onChange,
  checked,
}) => {
  return (
    <label className={classes.switch} htmlFor={id}>
      <span className={classes.label}>{label}</span>
      <div className={classes.wrapper}>
        {subLabel && <span className={classes.subLabel}>{subLabel}</span>}
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
          boxShadow={getCssVariableValue("--rb-box-shadow-1") || undefined}
        />
      </div>
    </label>
  );
};

export default Switch;
