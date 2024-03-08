import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import AccountBalance from "@components/AccountBalance";
import WalletTransactionList from "@components/WalletTransactionList";
import { useRootStore } from "@hooks/useRootStore";

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
      <AccountBalance />

      <WalletTransactionList />
    </section>
  );
};

export default observer(Wallet);
