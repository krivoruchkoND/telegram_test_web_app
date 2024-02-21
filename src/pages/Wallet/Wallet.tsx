import AccountBalance from "@components/AccountBalance";
import WalletTransactionList from "@/components/WalletTransactionList";
import { useWalletStore } from "@stores/WalletStore";
import { useAuthStore } from "@stores/AuthStore";

import classes from "./styles.module.css";
import { useEffect } from "react";

const Wallet = () => {
  const getTokens = useWalletStore((state) => state.getTokens);
  const isAuthSucceed = useAuthStore((store) => store.isAuthSucceed);

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

export default Wallet;
