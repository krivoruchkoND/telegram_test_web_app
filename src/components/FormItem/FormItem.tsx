import React, { useRef } from "react";
import { IMaskInput } from "react-imask";

import Switch from "@components/Switch";
import Slider from "@components/Slider";
import { type SettingKeys } from "@stores/GenericSettingsStore";

import maskMap from "./masks";
import classes from "./styles.module.css";

type Props = {
  id: SettingKeys;
  value: number | string;
  onChange: (value: number) => void;
  label: string;
  description: string;
  inputMode: "decimal" | "numeric";
  masks: (keyof typeof maskMap)[];
  placeholder?: string;
  switchProps?: Omit<React.ComponentProps<typeof Switch>, "id" | "label">;
  sliderProps?: Omit<React.ComponentProps<typeof Slider>, "value" | "onChange">;
  disabled?: boolean;
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
  sliderProps,
  disabled,
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

  let isDisabled = false;
  switch (true) {
    case disabled !== undefined:
      isDisabled = disabled;
      break;
    case checked !== undefined:
      isDisabled = checked;
      break;
    default:
      isDisabled = false;
      break;
  }

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
          value={String(value)}
          onAccept={(value, _mask) => onChange?.(Number(value))}
          inputMode={inputMode}
          className={classes.input}
          disabled={isDisabled}
        />
        {sliderProps && (
          <Slider
            value={Number(value)}
            onChange={(v) => onChange(v)}
            {...sliderProps}
          />
        )}
        <div className={classes.description}>{description}</div>
      </div>
    </div>
  );
};

export default FormItem;
