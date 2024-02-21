import React, { useRef } from "react";
import { IMaskInput } from "react-imask";

import Switch from "@components/Switch";
import { SettingKeys } from "@utils/commonSettingsSectionStores";

import maskMap from "./masks";
import classes from "./styles.module.css";

type Props = {
  id: SettingKeys;
  value: string;
  onChange: (value: string) => void;
  label: string;
  description: string;
  inputMode: "decimal" | "numeric";
  masks: (keyof typeof maskMap)[];
  placeholder?: string;
  switchProps?: Omit<React.ComponentProps<typeof Switch>, "id" | "label">;
};

const FormItem: React.FC<Props> = ({
  id,
  label,
  value,
  onChange,
  inputMode,
  description,
  placeholder,
  masks,
  switchProps,
}) => {
  const ref = useRef(null);
  const inputRef = useRef(null);

  const switchKey = `allowAuto${id[0].toUpperCase() + id.slice(1)}`;

  const {
    onChange: onSwitchChange,
    checked,
    ...restSwitchProps
  } = switchProps ?? {};
  const handleSwitchChange = (checked: boolean) => {
    onSwitchChange?.(checked);
  };

  return (
    <div className={classes.formItem}>
      {switchProps && checked !== undefined ? (
        <Switch
          id={switchKey}
          label={label}
          checked={checked}
          onChange={handleSwitchChange}
          {...restSwitchProps}
        />
      ) : (
        <div className={classes.label}>{label}</div>
      )}
      <div className={classes.inputWrapper}>
        <IMaskInput
          mask={masks.map((mask) => maskMap[mask])}
          placeholder={placeholder}
          unmask={true}
          ref={ref}
          inputRef={inputRef}
          value={value}
          onAccept={(value, _mask) => onChange?.(value)}
          inputMode={inputMode}
          className={classes.input}
          disabled={checked === undefined ? false : checked}
        />
        <div className={classes.description}>{description}</div>
      </div>
    </div>
  );
};

export default FormItem;
