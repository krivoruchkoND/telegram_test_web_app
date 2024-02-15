import { Router as WRouter, Route } from "wouter";

import useInitTelegramWebApp from "@hooks/useInitTelegramWebApp";
import Wallet from "@pages/Wallet";
import Settings from "@pages/Settings";
import Swaps from "@pages/Swaps";
import Trades from "@pages/Trades";

import Navigation from "./components/Navigation";
import classes from "./App.module.css";

function App() {
  useInitTelegramWebApp();

  return (
    <WRouter base="/telegram_test_web_app">
      <main className={classes.container}>
        <div className={classes.header}>
          <Navigation />
        </div>
        <div className={classes.content}>
          <Route path="/wallet" component={Wallet} />
          <Route path="/settings" component={Settings} />
          <Route path="/swaps" component={Swaps} />
          <Route path="/trades" component={Trades} />
          <Route>404</Route>
        </div>
      </main>
    </WRouter>
  );
}

export default App;
