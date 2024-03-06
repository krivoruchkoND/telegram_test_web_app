import React, { useCallback } from "react";
import { Link } from "wouter";
import debounce from "debounce";

import { useSettingsStore, type Tab } from "@stores/SettingsStore";
import Switch from "@components/Switch";
import rockGrayIcon from "@assets/RockGray.svg";
import rockBlueIcon from "@assets/RockBlue.svg";
import rockGreenIcon from "@assets/RockGreen.svg";
import rockVioletIcon from "@assets/RockViolet.svg";
import arrowIcon from "@assets/ArrowRight.svg";

import classes from "../styles.module.css";

const icons: { [key: string]: string } = {
  gray: rockGrayIcon,
  blue: rockBlueIcon,
  green: rockGreenIcon,
  violet: rockVioletIcon,
};

const DynamicSettingTabItem: React.FC<Tab> = ({
  id,
  label,
  iconColor,
  description,
  enableOptionLKey,
}) => {
  const updateSettings = useSettingsStore((state) => state.updateSettings);

  const switchValueKey =
    enableOptionLKey && (`is${enableOptionLKey}Enabled` as const);
  const switchHandlerKey =
    enableOptionLKey && (`setIs${enableOptionLKey}Enabled` as const);
  const isEnabled = useSettingsStore((state) =>
    switchValueKey ? state[switchValueKey] : null,
  );
  const onEnable = useSettingsStore((state) =>
    switchHandlerKey ? state[switchHandlerKey] : null,
  );

  const debouncedUpdateSettings = useCallback(
    debounce(updateSettings, 1000),
    [],
  );

  return (
    <li className={classes.setting}>
      <Link href={`/${id}`} className={classes.wrapper}>
        <div className={classes.title}>
          <div className={classes.titleContainer}>
            <img src={icons[iconColor] || rockGrayIcon} />
            <div className={classes.text}>{label}</div>
          </div>
          <div className={classes.arrow}>
            <img src={arrowIcon} />
          </div>
        </div>
        <div className={classes.description}>{description}</div>
      </Link>
      {isEnabled !== null && onEnable !== null && (
        <div className={classes.switchContainer}>
          <Switch
            id={label}
            label={label}
            checked={isEnabled}
            onChange={(v) => {
              onEnable(v);
              debouncedUpdateSettings();
            }}
          />
        </div>
      )}
    </li>
  );
};

export default DynamicSettingTabItem;
