import { useEffect } from "react";
import { Switch, Router as WRouter, Route, useLocation } from "wouter";

import useInitTelegramWebApp from "@hooks/useInitTelegramWebApp";
import { useTelegramWebAppStore } from "@stores/TelegramWebAppStore";
import { useAuthStore } from "@stores/AuthStore";
import Wallet from "@pages/Wallet";
import Settings from "@pages/Settings";
import Swaps from "@pages/Swaps";
import Trades from "@pages/Trades";
import Splash from "@pages/Splash";

import Navigation from "./components/Navigation";
import classes from "./App.module.css";

const useAuthHandler = () => {
  const [, setLocation] = useLocation();
  const webApp = useTelegramWebAppStore((store) => store.webApp);
  const auth = useAuthStore((store) => store.auth);
  const initialLoggedIn = useAuthStore((store) => store.initialLoggedIn);

  useEffect(() => {
    if (!initialLoggedIn) {
      setLocation("/");
    }
  }, [initialLoggedIn]);

  useEffect(() => {
    if (webApp) {
      auth(webApp.initData);
    }
  }, [webApp, auth]);
};

function App() {
  useInitTelegramWebApp();
  useAuthHandler();

  return (
    <main className={classes.container}>
      <div className={classes.header}>
        <Navigation />
      </div>
      <Switch>
        <Route path="/" component={Splash} />
        <div className={classes.content}>
          <Route path="/wallet" component={Wallet} />
          <Route path="/settings" component={Settings} />
          <Route path="/swaps" component={Swaps} />
          <Route path="/trades" component={Trades} />
          <Route>404</Route>
        </div>
      </Switch>
    </main>
  );
}

const AppInsideRouter = () => {
  return (
    <WRouter base="/telegram_test_web_app">
      <App />
    </WRouter>
  );
};

export default AppInsideRouter;
