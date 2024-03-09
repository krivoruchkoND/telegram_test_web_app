import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import debounce from "debounce";

import Switch from "@components/Switch";
import useRootStore from "@hooks/useRootStore";

import classes from "./styles.module.css";

const NotificationSwitch = () => {
  const {
    settingsStore: {
      isNotificationsEnabled,
      setIsNotificationsEnabled,
      updateSettings,
    },
  } = useRootStore();

  const debouncedUpdateSettings = useCallback(
    debounce(updateSettings, 1000),
    [],
  );

  return (
    <div className={classes.container}>
      <Switch
        id="notification"
        label="Notification"
        checked={isNotificationsEnabled}
        onChange={(v) => {
          setIsNotificationsEnabled(v);
          debouncedUpdateSettings();
        }}
      />
    </div>
  );
};

export default observer(NotificationSwitch);
