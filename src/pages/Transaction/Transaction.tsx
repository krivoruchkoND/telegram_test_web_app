import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, useLocation, useParams } from "wouter";

import useBackButton from "@hooks/useBackButton";
import useRootStore from "@hooks/useRootStore";
import WalletTransactionItem from "@components/WalletTransactionItem";
import TransactionAction from "@components/TransactionAction";
import FormItem from "@components/FormItem";

import classes from "./styles.module.css";
import TransactionButton from "@components/TransactionButton";

const Transaction = () => {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();
  const isBackButtonSupported = useBackButton(() => setLocation("/"));

  const {
    walletStore: { currentTransaction, getToken, getBalance, balance },
    authStore: { isAuthSucceed },
  } = useRootStore();

  const [action, setAction] = useState<"buy" | "sell">("buy");
  const [slippage, setSlippage] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (isAuthSucceed) {
      getToken(id);
      getBalance();
    }
  }, [id, isAuthSucceed]);

  useEffect(() => {
    setSlippage(0);
    setAmount(0);
  }, [action]);

  return (
    <section className={classes.transaction}>
      {currentTransaction && (
        <WalletTransactionItem transaction={currentTransaction} isOutOfList />
      )}

      <TransactionAction action={action} onChange={setAction} />

      <FormItem
        id="amount"
        value={amount}
        onChange={setAmount}
        label="Amount"
        description={`Balance: ${balance}`}
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "float"]}
        sliderProps={{
          max: balance ?? 0,
        }}
      />

      <FormItem
        id="slippage"
        value={slippage}
        onChange={setSlippage}
        label="Slippage"
        description="Difference between expected and actual results amounts of token"
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "percent"]}
      />

      <TransactionButton>
        {
          {
            buy: "Buy ROCK",
            sell: "Sell ROCK",
          }[action]
        }
      </TransactionButton>

      {!isBackButtonSupported && <Link href="/">Go back</Link>}
    </section>
  );
};

export default observer(Transaction);
