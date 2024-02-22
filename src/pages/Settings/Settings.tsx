import { useEffect } from "react";
import { Switch, Route } from "wouter";

import { useSettingsStore } from "@stores/SettingsStore";
import { useAuthStore } from "@stores/AuthStore";
import DynamicSettingTabs from "@components/DynamicSettingTabs";
import NotificationSwitch from "@components/NotificationSwitch";
import PrivateKey from "@pages/PrivateKey";
import Profile from "@pages/Profile";
import Autobuy from "@pages/Autobuy";
import Snipper from "@pages/Sniper";

import classes from "./styles.module.css";

const Settings = () => {
  const getSettings = useSettingsStore((state) => state.getSettings);
  const getPrivateKey = useSettingsStore((state) => state.getPrivateKey);
  const isAuthSucceed = useAuthStore((store) => store.isAuthSucceed);

  useEffect(() => {
    if (isAuthSucceed) {
      getSettings();
      getPrivateKey();
    }
  }, [isAuthSucceed]);

  return (
    <section className={classes.settings}>
      <Switch>
        <Route path="/">
          <DynamicSettingTabs />
          <NotificationSwitch />
        </Route>
        <Route path="/profile" component={Profile} />
        <Route path="/autobuy" component={Autobuy} />
        <Route path="/snipper" component={Snipper} />
        <Route path="/profile/private_key" component={PrivateKey} />
        <Route>Unknown Nested Route</Route>
      </Switch>
    </section>
  );
};

export default Settings;
