/* eslint-disable sonarjs/cognitive-complexity */
import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useParams } from "wouter";

import { createBuyTransaction, createSellTransaction } from "@apis/swaps";
import useBackButton from "@hooks/useBackButton";
import useRootStore from "@hooks/useRootStore";
import useScrollIntoView from "@hooks/useScrollIntoView";
import WalletTransactionItem, {
  Skeleton,
} from "@components/WalletTransactionItem";
import TransactionAction from "@components/TransactionAction";
import FormItem from "@components/FormItem";
import TransactionButton from "@components/TransactionButton";
import SwapPlatforms from "@components/SwapPlatforms";
import PageTitle from "@components/PageTitle";
import Divider from "@components/Divider";

import classes from "./styles.module.css";

type TotalProps = {
  tokenValue: number | null;
  tokenAmount: number | null;
  currentAmount: number | null;
  symbol: string;
  action: "buy" | "sell";
};

const Total: React.FC<TotalProps> = ({
  tokenValue,
  tokenAmount,
  currentAmount,
  symbol,
  action,
}) => {
  if (tokenValue === null || tokenAmount === null || currentAmount === null) {
    return null;
  }

  const pricePerToken = tokenValue / tokenAmount;
  let total = 0;
  try {
    total =
      action === "buy"
        ? currentAmount / pricePerToken
        : currentAmount * pricePerToken;
  } catch (error) {
    console.log("Error in total calculation", error, {
      pricePerToken,
      tokenValue,
      tokenAmount,
      currentAmount,
    });
    return null;
  }

  return (
    <>
      <Divider />
      <div className={classes.total}>
        <div>Total ({symbol})</div>
        <div>{total}</div>
      </div>
    </>
  );
};

const Transaction = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  useBackButton(() => setLocation("/"));
  useScrollIntoView(ref);

  const {
    walletStore: {
      currentTransaction,
      resetCurrentTransaction,
      getToken,
      getBalance,
      balance,
      isLoading,
    },
    authStore: { isAuthSucceed },
    settingsStore: { lastSellSettings, lastBuySettings },
  } = useRootStore();

  const [action, setAction] = useState<"buy" | "sell">("buy");
  const actionPascal = `${action[0].toUpperCase()}${action.slice(1, action.length)}`;
  const isBuying = action === "buy";

  const currentBalance = (isBuying ? balance : currentTransaction?.amount) ?? 0;
  const currentSettings = isBuying ? lastBuySettings : lastSellSettings;
  const currentSymbol = isBuying
    ? "SOL"
    : currentTransaction?.metadata.symbol || "";
  const actionFunction = isBuying
    ? createBuyTransaction
    : createSellTransaction;

  const {
    amount,
    setAmount,
    slippage,
    setSlippage,
    mevProtection,
    setMevProtection,
    isMevProtectionEnabled,
    setIsMevProtectionEnabled,
    computeLimit,
    setComputeLimit,
    setAllowAutoComputeLimit,
    allowAutoComputeLimit,
    computePrice,
    setComputePrice,
    allowAutoComputePrice,
    setAllowAutoComputePrice,
    swapPlatforms,
  } = currentSettings;

  const handleClick = () =>
    actionFunction({
      tokenAddress: currentTransaction?.id ?? "",
      amount: amount ?? 0,
      slippage: slippage ?? 0,
      computeUnitLimit: computeLimit ?? 0,
      computeUnitPrice: computePrice ?? 0,
      swapPlatforms: swapPlatforms.map((platform) => platform.title),
      jitoSettings: {
        turnOn: isMevProtectionEnabled,
        jitoTip: mevProtection ?? 0,
      },
    });

  useEffect(() => {
    if (isAuthSucceed) {
      getToken(id);
      getBalance();
    }

    return () => {
      resetCurrentTransaction();
    };
  }, [id, isAuthSucceed]);

  return (
    <section className={classes.transaction}>
      <div ref={ref} />
      {isLoading.getToken && <Skeleton removeOffset />}
      {currentTransaction && (
        <WalletTransactionItem transaction={currentTransaction} isOutOfList />
      )}

      <TransactionAction action={action} onChange={setAction} />

      <FormItem
        id="amount"
        value={amount ?? 0}
        onChange={setAmount}
        label={`Amount (${currentSymbol})`}
        description={`Balance: ${currentBalance} ${currentSymbol}`}
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "float"]}
        sliderProps={{
          max: currentBalance,
        }}
      />

      <FormItem
        id="slippage"
        value={slippage ?? 0}
        onChange={setSlippage}
        label="Slippage"
        description="Difference between expected and actual results amounts of token"
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "percent"]}
      />

      <Total
        tokenValue={currentTransaction?.value || null}
        tokenAmount={currentTransaction?.amount || null}
        currentAmount={amount}
        symbol={isBuying ? currentTransaction?.metadata.symbol || "" : "SOL"}
        action={action}
      />

      <TransactionButton type={"button"} onClick={handleClick}>
        {`${actionPascal} ${currentTransaction?.metadata.symbol || ""}`}
      </TransactionButton>

      <PageTitle title={"Swap settings"} />

      <SwapPlatforms settings={currentSettings} />

      <Divider />

      {mevProtection !== null && (
        <FormItem
          id="mevProtection"
          value={mevProtection ?? 0}
          onChange={setMevProtection}
          label="SMART-MEV PROTECTION"
          description="Set an additional bribe amount on top of your priority fee for the Jito validators to place your transaction as soon as possible."
          inputMode="decimal"
          placeholder="Enter value"
          masks={["empty", "decimal", "sol"]}
          switchProps={{
            checked: isMevProtectionEnabled,
            onChange: setIsMevProtectionEnabled,
          }}
        />
      )}

      <FormItem
        id="computeLimit"
        value={computeLimit ?? 0}
        onChange={setComputeLimit}
        label="Compute Unit Limit"
        description="The compute budget roughly determines how much a computing machine can consume for your transaction. Will not affect the success rate of your transaction since it still executes the same code, but if there are not enough funds the transaction will fail."
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "decimal"]}
        switchProps={{
          subLabel: "Auto",
          checked: allowAutoComputeLimit,
          onChange: setAllowAutoComputeLimit,
        }}
      />

      <FormItem
        id="computePrice"
        value={computePrice ?? 0}
        onChange={setComputePrice}
        label="Compute Unit Price (priority)"
        description="Increasing the transaction fee increases its priority, but it only competes within the same slot, without guaranteeing inclusion in others."
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "float", "sol"]}
        switchProps={{
          subLabel: "Auto",
          checked: allowAutoComputePrice,
          onChange: setAllowAutoComputePrice,
        }}
      />
    </section>
  );
};

export default observer(Transaction);
