import { observer } from "mobx-react-lite";
import useRootStore from "@hooks/useRootStore";
import DynamicSettingTabItem from "./components/DynamicSettingTabItem";
import classes from "./styles.module.css";

const DynamicSettingTabs = () => {
  const {
    settingsStore: { tabs },
  } = useRootStore();

  return (
    <ul className={classes.settings}>
      {tabs.map((tabParams) => (
        <DynamicSettingTabItem key={tabParams.id} {...tabParams} />
      ))}
    </ul>
  );
};

export default observer(DynamicSettingTabs);
