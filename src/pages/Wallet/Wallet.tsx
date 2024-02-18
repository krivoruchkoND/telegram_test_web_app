import AccountBalance from "@components/AccountBalance";
import WalletTransactionList from "@/components/WalletTransactionList";
import { useWalletStore } from "@stores/WalletStore";

import classes from "./styles.module.css";
import { useEffect } from "react";

const Wallet = () => {
  const getTokens = useWalletStore((state) => state.getTokens);

  useEffect(() => {
    getTokens();
  }, []);

  return (
    <section className={classes.wallet}>
      <AccountBalance />

      <WalletTransactionList />
    </section>
  );
};

export default Wallet;
