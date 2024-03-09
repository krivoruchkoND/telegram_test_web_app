import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import debounce from "debounce";

import Switch from "@components/Switch";
import useRootStore from "@hooks/useRootStore";

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
    <Switch
      id="notification"
      label="Notification"
      checked={isNotificationsEnabled}
      onChange={(v) => {
        setIsNotificationsEnabled(v);
        debouncedUpdateSettings();
      }}
    />
  );
};

export default observer(NotificationSwitch);
