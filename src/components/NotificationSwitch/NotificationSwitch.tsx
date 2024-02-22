import { useCallback } from "react";
import debounce from "debounce";

import Switch from "@components/Switch";
import { useSettingsStore } from "@stores/SettingsStore";

const NotificationSwitch = () => {
  const isNotificationsEnabled = useSettingsStore(
    (state) => state.isNotificationsEnabled,
  );
  const setIsNotificationsEnabled = useSettingsStore(
    (state) => state.setIsNotificationsEnabled,
  );
  const updateSettings = useSettingsStore((state) => state.updateSettings);

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

export default NotificationSwitch;
