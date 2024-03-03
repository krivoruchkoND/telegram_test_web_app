import React, { useEffect } from "react";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

import { useProfileSettingsStore } from "@stores/ProfileSettingsStore";
import { useAuthStore } from "@stores/AuthStore";
import useInitTelegramWebApp from "@hooks/useInitTelegramWebApp";
import useAuthHandler from "@hooks/useAuthHandler";
import Wallet from "@pages/Wallet";
import Settings from "@pages/Settings";
import Swaps from "@pages/Swaps";
import Trades from "@pages/Trades";
import Splash from "@pages/Splash";
import Exchange from "@pages/Exchange";

import Navigation from "./components/Navigation";
import classes from "./App.module.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const isAuthSucceed = useAuthStore((store) => store.isAuthSucceed);
  const getProfileSettings = useProfileSettingsStore(
    (store) => store.getProfileSettings,
  );

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
          <Route path="/wallet" component={Wallet} />
          <Route path="/exchange/:tokenId" component={Exchange} nest />
          <Route path="/settings" component={Settings} nest />
          <Route path="/swaps" component={Swaps} />
          <Route path="/trades" component={Trades} />
          <Route>Unknown Route</Route>
        </Switch>
      </div>
    </main>
  );
}

// hook useAuthHandler needs to be called inside a Router
const AppWithRouter = () => (
  <Router hook={useHashLocation}>
    <App />
  </Router>
);

const queryClient = new QueryClient();

const AppWithQueryProvider: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWithRouter />
    </QueryClientProvider>
  );
};

export default AppWithQueryProvider;
