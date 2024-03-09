import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Switch, Route } from "wouter";

import AccountBalance from "@components/AccountBalance";
import WalletTransactionList from "@components/WalletTransactionList";
import useRootStore from "@hooks/useRootStore";
import Transaction from "@pages/Transaction";

import classes from "./styles.module.css";

const Wallet = () => {
  const { authStore, walletStore } = useRootStore();
  const { isAuthSucceed } = authStore;
  const { getTokens } = walletStore;

  useEffect(() => {
    if (isAuthSucceed) {
      getTokens();
    }
  }, [isAuthSucceed]);

  return (
    <section className={classes.wallet}>
      <Switch>
        <Route path="/">
          <AccountBalance />
          <WalletTransactionList />
        </Route>
        <Route path="/transaction/:id">
          <Transaction />
        </Route>
        <Route>Unknown Nested Route</Route>
      </Switch>
    </section>
  );
};

export default observer(Wallet);
