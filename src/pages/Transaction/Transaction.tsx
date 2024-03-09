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
import SwapPlatforms from "@components/SwapPlatforms";
import PageTitle from "@components/PageTitle";
import Divider from "@components/Divider";

const handleChangePlatforms = () => {
  /* do nothing */
};

const Transaction = () => {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();
  const isBackButtonSupported = useBackButton(() => setLocation("/"));

  const {
    walletStore: { currentTransaction, getToken, getBalance, balance },
    authStore: { isAuthSucceed },
    settingsStore: { lastSellSettings, lastBuySettings },
  } = useRootStore();

  const [action, setAction] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState(0);
  const [slippage, setSlippage] = useState(0);

  const currentSettings = action === "buy" ? lastBuySettings : lastSellSettings;

  const {
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
    retryValue,
    setRetryValue,
  } = currentSettings;

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

      <PageTitle title={"Swap settings"} />

      <SwapPlatforms
        onChange={handleChangePlatforms}
        settings={currentSettings}
      />

      <Divider />

      <FormItem
        id="mevProtection"
        value={mevProtection ?? 0}
        onChange={setMevProtection}
        label="SMART-MEV PROTECTION"
        description="Set an additional bribe amount on top of your priority fee for the Jito validators to place your transaction as soon as possible."
        inputMode="decimal"
        placeholder="Enter value"
        masks={["decimal", "sol"]}
        switchProps={{
          subLabel: "Auto",
          checked: isMevProtectionEnabled,
          onChange: setIsMevProtectionEnabled,
        }}
      />

      <FormItem
        id="computeLimit"
        value={computeLimit ?? 0}
        onChange={setComputeLimit}
        label="Compute Unit Limit"
        description="The compute budget roughly determines how much a computing machine can consume for your transaction. Will not affect the success rate of your transaction since it still executes the same code, but if there are not enough funds the transaction will fail."
        inputMode="decimal"
        placeholder="Enter value"
        masks={["decimal"]}
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
        masks={["float", "sol"]}
        switchProps={{
          subLabel: "Auto",
          checked: allowAutoComputePrice,
          onChange: setAllowAutoComputePrice,
        }}
      />

      <FormItem
        id="retryValue"
        value={retryValue ?? 0}
        onChange={setRetryValue}
        label="Retry value"
        description="Number of retry transaction in node if transaction fail."
        inputMode="decimal"
        placeholder="Enter value"
        masks={["float"]}
      />

      {!isBackButtonSupported && <Link href="/">Go back</Link>}
    </section>
  );
};

export default observer(Transaction);
