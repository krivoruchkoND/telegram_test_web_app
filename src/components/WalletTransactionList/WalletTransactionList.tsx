import { useWalletStore } from "@stores/WalletStore";

import WalletTransactionListItem from "./components/WalletTransactionItem";
import classes from "./styles.module.css";

const WalletTransactionList = () => {
  const transactions = useWalletStore((state) => state.transactions);

  return (
    <ul className={classes.transactions}>
      {transactions.map((transaction) => (
        <WalletTransactionListItem
          key={transaction.id}
          transaction={transaction}
        />
      ))}
    </ul>
  );
};

export default WalletTransactionList;
