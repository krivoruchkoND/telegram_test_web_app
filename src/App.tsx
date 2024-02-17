import { Switch, Router, Route } from "wouter";

import useInitTelegramWebApp from "@hooks/useInitTelegramWebApp";
import useAuthHandler from "./hooks/useAuthHandler";
import Wallet from "@pages/Wallet";
import Settings from "@pages/Settings";
import Swaps from "@pages/Swaps";
import Trades from "@pages/Trades";
import Splash from "@pages/Splash";

import Navigation from "./components/Navigation";
import classes from "./App.module.css";

function App() {
  useInitTelegramWebApp();
  useAuthHandler();

  return (
    <main className={classes.container}>
      <div className={classes.header}>
        <Navigation />
      </div>
      <div className={classes.content}>
        <Switch>
          <Route path="/" component={Splash} />
          <Route path="/wallet" component={Wallet} />
          <Route path="/settings/:any*" component={Settings} />
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
  <Router base="/telegram_test_web_app">
    <App />
  </Router>
);

export default AppWithRouter;
