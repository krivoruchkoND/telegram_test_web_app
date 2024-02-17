import { useLocation, Link } from "wouter";

import useShowBackButton from "@hooks/useBackButton";
import PageTitle from "@components/PageTitle";
// import SwapPlatforms from "@components/SwapPlatforms";

import classes from "./styles.module.css";
import FormItem from "@/components/FormItem";

const Autobuy = () => {
  const [, setLocation] = useLocation();
  const isBackButtonSupported = useShowBackButton(() => setLocation("/"));

  return (
    <form className={classes.autobuy}>
      <PageTitle title="Autobuy" />

      {/* <SwapPlatforms /> */}

      <FormItem
        id="slipage"
        label="Slipage"
        description="Difference between expected and actual results amounts of token"
      />

      <FormItem
        id="amount"
        label="Amount"
        description="Number of tokens for purchase"
      />

      <FormItem
        id="computeLimit"
        label="Compute Unit Limit"
        description="The compute budget roughly determines how much a computing machine can consume for your transaction. Will not affect the success rate of your transaction since it still executes the same code, but if there are not enough funds the transaction will fail."
        switchProps={{
          subLabel: "Auto",
          checked: true,
          onChange: () => null,
        }}
      />

      <FormItem
        id="computePrice"
        label="Compute Unit Price (priority)"
        description="Increasing the transaction fee increases its priority, but it only competes within the same slot, without guaranteeing inclusion in others."
        switchProps={{
          subLabel: "Auto",
          checked: true,
          onChange: () => null,
        }}
      />

      <FormItem
        id="retryValue"
        label="Retry value"
        description="Number of retry transaction in node if transaction fail"
      />

      {!isBackButtonSupported && <Link href="/">Go back</Link>}
    </form>
  );
};

export default Autobuy;
