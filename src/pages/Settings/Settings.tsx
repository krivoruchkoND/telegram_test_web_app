import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Switch, Route } from "wouter";

import useRootStore from "@hooks/useRootStore";
import DynamicSettingTabs from "@components/DynamicSettingTabs";
import NotificationSwitch from "@components/NotificationSwitch";
import PrivateKey from "@pages/PrivateKey";
import Profile from "@pages/Profile";
import Autobuy from "@pages/Autobuy";
import Snipper from "@pages/Sniper";

import classes from "./styles.module.css";

const Settings = () => {
  const {
    walletStore: { getBalance },
    authStore: { isAuthSucceed },
    settingsStore: { getSettings, getPrivateKey },
    snipedChannelsStore: { getSnipedChannels },
    profileSettingsStore: { getProfileSettings },
  } = useRootStore();

  useEffect(() => {
    if (isAuthSucceed) {
      getSettings();
      getPrivateKey();
      getSnipedChannels();
      getBalance();
      getProfileSettings();
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

export default observer(Settings);
