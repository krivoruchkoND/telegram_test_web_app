import React, { useRef } from "react";
import { IMaskInput } from "react-imask";

import Switch from "@components/Switch";
import {
  useSettingsStore,
  SettingKeys,
  SettingEnablerKeys,
  SettingOnChangeKeys,
  SettingEnablerOnChangeKeys,
} from "@stores/SettingsStore";

import maskMap from "./masks";
import classes from "./styles.module.css";

type Props = {
  id: SettingKeys;
  label: string;
  description: string;
  inputMode: "decimal" | "numeric";
  masks: (keyof typeof maskMap)[];
  placeholder?: string;
  switchProps?: Omit<
    React.ComponentProps<typeof Switch>,
    "id" | "label" | "checked" | "onChange"
  >;
};

const FormItem: React.FC<Props> = ({
  id,
  label,
  inputMode,
  description,
  placeholder,
  masks,
  switchProps,
}) => {
  const ref = useRef(null);
  const inputRef = useRef(null);

  const value = useSettingsStore((state) => state[id]);
  const valueChangeFnKey =
    `set${id[0].toUpperCase() + id.slice(1)}` as SettingOnChangeKeys;
  const onChange = useSettingsStore((state) => state[valueChangeFnKey]);

  const switchKey =
    `allowCustom${id[0].toUpperCase() + id.slice(1)}` as SettingEnablerKeys;
  const switchChangeFnKey =
    `set${switchKey[0].toUpperCase() + switchKey.slice(1)}` as SettingEnablerOnChangeKeys;
  const switchValue = useSettingsStore((state) => state[switchKey]);
  const switchOnChange = useSettingsStore((state) => state[switchChangeFnKey]);

  return (
    <div className={classes.formItem}>
      {switchProps ? (
        <Switch
          id={switchKey}
          label={label}
          checked={switchValue}
          onChange={switchOnChange}
          {...switchProps}
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
          onAccept={(value, _mask) => onChange(value)}
          inputMode={inputMode}
          className={classes.input}
          disabled={switchValue === undefined ? false : switchValue}
        />
        <div className={classes.description}>{description}</div>
      </div>
    </div>
  );
};

export default FormItem;
