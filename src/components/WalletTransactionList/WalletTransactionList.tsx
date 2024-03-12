import { observer } from "mobx-react-lite";

import useRootStore from "@hooks/useRootStore";
import WalletTransactionListItem, {
  Skeleton,
} from "@components/WalletTransactionItem";

import classes from "./styles.module.css";

const WalletTransactionList = () => {
  const {
    walletStore: { transactions, isLoading },
  } = useRootStore();

  return (
    <ul className={classes.transactions}>
      {isLoading.getTokens
        ? new Array(5).fill(null).map((_, i) => <Skeleton key={i} />)
        : transactions.map((transaction) => (
            <WalletTransactionListItem
              key={transaction.id}
              transaction={transaction}
              shouldRedirectOnClick
            />
          ))}
    </ul>
  );
};

export default observer(WalletTransactionList);
