import { useLocation, Link } from "wouter";

import { useSettingsStore } from "@stores/SettingsStore";
import useShowBackButton from "@hooks/useBackButton";
import PageTitle from "@components/PageTitle";
import FormItem from "@components/FormItem";
// import SwapPlatforms from "@components/SwapPlatforms";

import classes from "./styles.module.css";

const Autobuy = () => {
  const [, setLocation] = useLocation();
  const isBackButtonSupported = useShowBackButton(() => setLocation("/"));

  const setComputeLimitToDefault = useSettingsStore(
    (state) => state.setComputeLimitToDefault,
  );

  const setComputePriceToDefault = useSettingsStore(
    (state) => state.setComputePriceToDefault,
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={classes.autobuy} onSubmit={onSubmit}>
      <PageTitle title="Autobuy" />

      {/* <SwapPlatforms /> */}

      <FormItem
        id="slipage"
        label="Slipage"
        description="Difference between expected and actual results amounts of token"
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "percent"]}
      />

      <FormItem
        id="amount"
        label="Amount"
        description="Number of tokens for purchase"
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "float"]}
      />

      <FormItem
        id="computeLimit"
        label="Compute Unit Limit"
        description="The compute budget roughly determines how much a computing machine can consume for your transaction. Will not affect the success rate of your transaction since it still executes the same code, but if there are not enough funds the transaction will fail."
        switchProps={{
          subLabel: "Auto",
          onChange: setComputeLimitToDefault,
        }}
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "decimal"]}
      />

      <FormItem
        id="computePrice"
        label="Compute Unit Price (priority)"
        description="Increasing the transaction fee increases its priority, but it only competes within the same slot, without guaranteeing inclusion in others."
        switchProps={{
          subLabel: "Auto",
          onChange: setComputePriceToDefault,
        }}
        inputMode="decimal"
        placeholder="Enter value"
        masks={["empty", "sol"]}
      />

      <FormItem
        id="retryValue"
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

export default Autobuy;
