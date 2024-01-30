import AccountBalance from "@components/AccountBalance";
import WalletTransactionList from "@/components/WalletTransactionList";

import classes from "./styles.module.css";

const Wallet = () => {
  return (
    <div className={classes.container}>
      <AccountBalance />

      <WalletTransactionList />
    </div>
  );
};

export default Wallet;
