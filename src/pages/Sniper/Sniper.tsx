import { useCallback } from "react";
import { useLocation, Link } from "wouter";
import debounce from "debounce";

import { useSettingsStore } from "@stores/SettingsStore";
import { useSniperSettingsStore } from "@stores/SniperSettingsStore";
import { useWalletStore } from "@stores/WalletStore";
import preventDefault from "@utils/preventDefault";
import useShowBackButton from "@hooks/useBackButton";
import PageTitle from "@components/PageTitle";
import FormItem from "@components/FormItem";
import SnipedChannels from "@components/SnipedChannels";

import classes from "./styles.module.css";

const Snipper = () => {
  const [, setLocation] = useLocation();
  const balance = useWalletStore((state) => state.balance);
  const updateSettings = useSettingsStore((state) => state.updateSettings);
  const isBackButtonSupported = useShowBackButton(() => setLocation("/"));

  const {
    slippage,
    setSlippage,
    amount,
    setAmount,
    mevProtection,
    setMevProtection,
    isMevProtectionEnabled,
    setIsMevProtectionEnabled,
    computeLimit,
    setComputeLimit,
    allowAutoComputeLimit,
    setAllowAutoComputeLimit,
    computePrice,
    setComputePrice,
    allowAutoComputePrice,
    setAllowAutoComputePrice,
    retryValue,
    setRetryValue,

    setComputeLimitToDefault,
    setComputePriceToDefault,
  } = useSniperSettingsStore();

  const debouncedUpdateSettings = useCallback(
    debounce(updateSettings, 1000),
    [],
  );

  const onChangeHandler = <T,>(value: T, action: (value: T) => void) => {
    action(value);
    debouncedUpdateSettings();
  };

  return (
    <div className={classes.sniperPage}>
      <PageTitle title="Sniper TG channel" />

      <SnipedChannels />

      <form onSubmit={preventDefault} className={classes.sniperForm}>
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
            label="Amount"
            description={`Balance: ${balance}`}
            inputMode="decimal"
            placeholder="Enter value"
            masks={["empty", "float"]}
            sliderProps={{
              max: balance,
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

        {retryValue !== null && (
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
        )}

        {!isBackButtonSupported && <Link href="/">Go back</Link>}
      </form>
    </div>
  );
};

export default Snipper;
