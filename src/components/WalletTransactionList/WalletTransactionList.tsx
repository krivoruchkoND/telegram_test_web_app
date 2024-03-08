import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import { useRootStore } from "@hooks/useRootStore";

import WalletTransactionListItem from "./components/WalletTransactionItem";
import classes from "./styles.module.css";

const WalletTransactionList = () => {
  const {
    walletStore: { transactions },
  } = useRootStore();

  console.log("🚨", toJS(transactions));

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

export default observer(WalletTransactionList);
