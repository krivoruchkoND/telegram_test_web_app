import { useLocation, Link } from "wouter";

import { useSniperSettingsStore } from "@stores/SniperSettingsStore";
import useShowBackButton from "@hooks/useBackButton";
import PageTitle from "@components/PageTitle";
import FormItem from "@components/FormItem";
// import SwapPlatforms from "@components/SwapPlatforms";

import classes from "./styles.module.css";

const Snipper = () => {
  const [, setLocation] = useLocation();
  const isBackButtonSupported = useShowBackButton(() => setLocation("/"));

  const {
    slippage,
    setSlippage,
    amount,
    setAmount,
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={classes.autobuy} onSubmit={onSubmit}>
      <PageTitle title="Autobuy" />

      {/* <SwapPlatforms /> */}

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

      <FormItem
        id="amount"
        value={amount}
        onChange={setAmount}
        label="Amount"
        description="Number of tokens for purchase"
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "float"]}
      />

      <FormItem
        id="computeLimit"
        value={computeLimit}
        onChange={setComputeLimit}
        label="Compute Unit Limit"
        description="The compute budget roughly determines how much a computing machine can consume for your transaction. Will not affect the success rate of your transaction since it still executes the same code, but if there are not enough funds the transaction will fail."
        switchProps={{
          subLabel: "Auto",
          checked: allowAutoComputeLimit,
          onChange: (value) => {
            setAllowAutoComputeLimit(value);
            setComputeLimitToDefault(value);
          },
        }}
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "decimal"]}
      />

      <FormItem
        id="computePrice"
        value={computePrice}
        onChange={setComputePrice}
        label="Compute Unit Price (priority)"
        description="Increasing the transaction fee increases its priority, but it only competes within the same slot, without guaranteeing inclusion in others."
        switchProps={{
          subLabel: "Auto",
          checked: allowAutoComputePrice,
          onChange: (value) => {
            setAllowAutoComputePrice(value);
            setComputePriceToDefault(value);
          },
        }}
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "sol"]}
      />

      <FormItem
        id="retryValue"
        value={retryValue}
        onChange={setRetryValue}
        label="Retry value"
        description="Number of retry transaction in node if transaction fail"
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "decimal"]}
      />

      {!isBackButtonSupported && <Link href="/">Go back</Link>}
    </form>
  );
};

export default Snipper;
