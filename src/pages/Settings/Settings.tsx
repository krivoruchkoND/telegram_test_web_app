import { Switch, Route } from "wouter";

import DynamicSettingTabs from "@components/DynamicSettingTabs";
import NotificationSwitch from "@components/NotificationSwitch";
import Profile from "@pages/Profile";
import Autobuy from "@pages/Autobuy";
import Snipper from "@pages/Snipper";

import classes from "./styles.module.css";

const Settings = () => {
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
        <Route path="/profile/private_key">Private key</Route>
        <Route>Unknown Nested Route</Route>
      </Switch>
    </section>
  );
};

export default Settings;
