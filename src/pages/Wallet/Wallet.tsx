import AccountBalance from "@components/AccountBalance";
import WalletTransactionList from "@/components/WalletTransactionList";

import classes from "./styles.module.css";

const Wallet = () => {
  return (
    <section className={classes.wallet}>
      <AccountBalance />

      <WalletTransactionList />
    </section>
  );
};

export default Wallet;
