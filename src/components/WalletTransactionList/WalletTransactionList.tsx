import walletTransactionsGenerator from "@utils/walletTransactionsGenerator";
import WalletTransactionListItem from "./components/WalletTransactionItem";

import classes from "./styles.module.css";

const transactions = walletTransactionsGenerator();

const WalletTransactionList = () => {
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
