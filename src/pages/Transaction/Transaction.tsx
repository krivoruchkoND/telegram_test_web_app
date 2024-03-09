import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useParams, Link } from "wouter";

import useBackButton from "@hooks/useBackButton";
import useRootStore from "@hooks/useRootStore";
import WalletTransactionItem from "@components/WalletTransactionItem";
import TransactionAction from "@components/TransactionAction";

import classes from "./styles.module.css";

const Transaction = () => {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();

  const [action, setAction] = useState<"buy" | "sell">("buy");

  const {
    walletStore: { currentTransaction, getToken },
  } = useRootStore();

  useEffect(() => {
    getToken(id);
  }, [id]);

  const isBackButtonSupported = useBackButton(() => setLocation("/"));

  return (
    <section className={classes.transaction}>
      {currentTransaction && (
        <WalletTransactionItem transaction={currentTransaction} />
      )}
      <TransactionAction action={action} onChange={setAction} />
      {!isBackButtonSupported && <Link href="/">Go back</Link>}
    </section>
  );
};

export default observer(Transaction);
