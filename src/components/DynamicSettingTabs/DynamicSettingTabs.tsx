import { useSettingsStore } from "@stores/SettingsStore";

import DynamicSettingTabItem from "./components/DynamicSettingTabItem";
import classes from "./styles.module.css";

const DynamicSettingTabs = () => {
  const tabs = useSettingsStore((store) => store.tabs);

  return (
    <ul className={classes.settings}>
      {tabs.map((tabParams) => (
        <DynamicSettingTabItem key={tabParams.id} {...tabParams} />
      ))}
    </ul>
  );
};

export default DynamicSettingTabs;
