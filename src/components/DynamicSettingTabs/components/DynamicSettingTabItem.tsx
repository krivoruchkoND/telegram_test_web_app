import React from "react";

import { Tab, useSettingsStore } from "@stores/SettingsStore";
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

type Props = {};

const DynamicSettingTabItem: React.FC<Props & Tab> = ({
  id,
  label,
  iconColor,
  description,
}) => {
  const setCurrentTab = useSettingsStore((store) => store.setCurrentTab);

  return (
    <li className={classes.setting}>
      <button className={classes.button} onClick={() => setCurrentTab(id)}>
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
      </button>
    </li>
  );
};

export default DynamicSettingTabItem;
