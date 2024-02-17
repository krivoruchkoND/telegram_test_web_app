import { useState } from "react";

import Switch from "@components/Switch";

const NotificationSwitch = () => {
  const [isNotificationOn, setIsNotificationOn] = useState(true);

  return (
    <Switch
      id="notification"
      label="Notification"
      checked={isNotificationOn}
      onChange={setIsNotificationOn}
    />
  );
};

export default NotificationSwitch;
