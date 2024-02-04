// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Router as WRouter, Route } from "wouter";

import useInitTelegramWebApp from "@hooks/useInitTelegramWebApp";
import Wallet from "@pages/Wallet";
import Settings from "@pages/Settings";

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
          <Route path="/swaps">Swaps</Route>
          <Route path="/trades">Trades</Route>
          <Route>404</Route>
        </div>
      </main>
    </WRouter>
  );
}

export default App;
