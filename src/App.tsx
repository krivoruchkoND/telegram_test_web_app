import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Switch, Router, Route } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

import { RootStoreProvider } from "@contexts/RootStoreContext";
import useRootStore from "@hooks/useRootStore";
import useInitTelegramWebApp from "@hooks/useInitTelegramWebApp";
import useAuthHandler from "@hooks/useAuthHandler";
import Wallet from "@pages/Wallet";
import Settings from "@pages/Settings";
import Swaps from "@pages/Swaps";
import Trades from "@pages/Trades";
import Splash from "@pages/Splash";

import Navigation from "./components/Navigation";
import classes from "./App.module.css";

const App = observer(() => {
  const {
    authStore: { isAuthSucceed },
    profileSettingsStore: { getProfileSettings },
  } = useRootStore();

  useInitTelegramWebApp();
  useAuthHandler();

  useEffect(() => {
    if (isAuthSucceed) {
      getProfileSettings();
    }
  }, [isAuthSucceed]);

  return (
    <main className={classes.container}>
      <div className={classes.header}>
        <Navigation />
      </div>
      <div className={classes.content}>
        <Switch>
          <Route path="/" component={Splash} />
          <Route path="/wallet" component={Wallet} nest />
          <Route path="/settings" component={Settings} nest />
          <Route path="/swaps" component={Swaps} />
          <Route path="/trades" component={Trades} />
          <Route>Unknown Route</Route>
        </Switch>
      </div>
    </main>
  );
});

// hook useAuthHandler needs to be called inside a Router
// wrapping AppWithRouter into observer causes weird behavior
const AppWithRouter = () => (
  <RootStoreProvider>
    <Router hook={useHashLocation}>
      <App />
    </Router>
  </RootStoreProvider>
);

export default AppWithRouter;
