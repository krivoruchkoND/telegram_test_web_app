// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Router as WRouter, Route } from "wouter";

import useInitTelegramWebApp from "@hooks/useInitTelegramWebApp";
import Wallet from "@pages/Wallet";

import classes from "./App.module.css";
import Navigation from "./components/Navigation";

function App() {
  useInitTelegramWebApp();

  return (
    <WRouter base="/telegram_test_web_app">
      <main className={classes.container}>
        <Navigation />
        <Route path="/wallet" component={Wallet} />
        <Route path="/settings">Settings</Route>
        <Route path="/swaps">Swaps</Route>
        <Route path="/trades">Trades</Route>
        <Route>404</Route>
      </main>
    </WRouter>
  );
}

export default App;
