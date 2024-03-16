import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "wouter";
import debounce from "debounce";

import useRootStore from "@hooks/useRootStore";
import preventDefault from "@utils/preventDefault";
import useShowBackButton from "@hooks/useBackButton";
import PageTitle from "@components/PageTitle";
import FormItem from "@components/FormItem";
import SwapPlatforms from "@components/SwapPlatforms";

import classes from "./styles.module.css";

const Autobuy = () => {
  const [, setLocation] = useLocation();
  const {
    walletStore: { balance },
    settingsStore: { updateSettings, autoBuySettings },
  } = useRootStore();
  const isBackButtonSupported = useShowBackButton(() => setLocation("/"));

  const {
    slippage,
    setSlippage,
    amount,
    mevProtection,
    setMevProtection,
    isMevProtectionEnabled,
    setIsMevProtectionEnabled,
    setAmount,
    computeLimit,
    setComputeLimit,
    allowAutoComputeLimit,
    setAllowAutoComputeLimit,
    computePrice,
    setComputePrice,
    allowAutoComputePrice,
    setAllowAutoComputePrice,
    // retryValue,
    // setRetryValue,

    setComputeLimitToDefault,
    setComputePriceToDefault,
  } = autoBuySettings;

  const debouncedUpdateSettings = useCallback(
    debounce(updateSettings, 1000),
    [],
  );

  const onChangeHandler = <T,>(value: T, action: (value: T) => void) => {
    action(value);
    debouncedUpdateSettings();
  };

  return (
    <form className={classes.autobuy} onSubmit={preventDefault}>
      <PageTitle title="Autobuy" />

      <SwapPlatforms
        onChange={debouncedUpdateSettings}
        settings={autoBuySettings}
      />

      {slippage !== null && (
        <FormItem
          id="slippage"
          value={slippage}
          onChange={(v) => onChangeHandler(v, setSlippage)}
          label="Slippage"
          description="Difference between expected and actual results amounts of token"
          inputMode="decimal"
          placeholder="Enter value"
          masks={["empty", "percent"]}
        />
      )}

      {amount !== null && (
        <FormItem
          id="amount"
          value={amount}
          onChange={(v) => onChangeHandler(v, setAmount)}
          label="Amount (SOL)"
          description={`Balance: ${balance}`}
          inputMode="decimal"
          placeholder="Enter value"
          masks={["empty", "float"]}
          sliderProps={{
            max: balance ?? 0,
          }}
        />
      )}

      {mevProtection !== null && (
        <FormItem
          id="mevProtection"
          value={mevProtection}
          onChange={(v) => onChangeHandler(v, setMevProtection)}
          label="SMART-MEV PROTECTION"
          description="Enable this for protection against sandwich attacks from MEV bots and save on gas fees in the event of a failed transaction."
          switchProps={{
            checked: isMevProtectionEnabled,
            onChange: (value) => {
              setIsMevProtectionEnabled(value);
              debouncedUpdateSettings();
            },
          }}
          disabled={!isMevProtectionEnabled}
          inputMode="decimal"
          placeholder={
            isMevProtectionEnabled ? "Enter value" : "Enable to edit"
          }
          masks={["empty", "sol"]}
        />
      )}

      {computeLimit !== null && (
        <FormItem
          id="computeLimit"
          value={computeLimit}
          onChange={(v) => onChangeHandler(v, setComputeLimit)}
          label="Compute Unit Limit"
          description="The compute budget roughly determines how much a computing machine can consume for your transaction. Will not affect the success rate of your transaction since it still executes the same code, but if there are not enough funds the transaction will fail."
          switchProps={{
            subLabel: "Auto",
            checked: allowAutoComputeLimit,
            onChange: (value) => {
              setAllowAutoComputeLimit(value);
              setComputeLimitToDefault(value);
              debouncedUpdateSettings();
            },
          }}
          inputMode="decimal"
          placeholder="Enter value"
          masks={["empty", "decimal"]}
        />
      )}

      {computePrice !== null && (
        <FormItem
          id="computePrice"
          value={computePrice}
          onChange={(v) => onChangeHandler(v, setComputePrice)}
          label="Compute Unit Price (priority)"
          description="Increasing the transaction fee increases its priority, but it only competes within the same slot, without guaranteeing inclusion in others."
          switchProps={{
            subLabel: "Auto",
            checked: allowAutoComputePrice,
            onChange: (value) => {
              setAllowAutoComputePrice(value);
              setComputePriceToDefault(value);
              debouncedUpdateSettings();
            },
          }}
          inputMode="decimal"
          placeholder="Enter value"
          masks={["empty", "sol"]}
        />
      )}

      {/* {retryValue !== null && (
        <FormItem
          id="retryValue"
          value={retryValue}
          onChange={(v) => onChangeHandler(v, setRetryValue)}
          label="Retry value"
          description="Number of retry transaction in node if transaction fail"
          inputMode="decimal"
          placeholder="Enter value"
          masks={["empty", "decimal"]}
        />
      )} */}

      {!isBackButtonSupported && <Link href="/">Go back</Link>}
    </form>
  );
};

export default observer(Autobuy);
