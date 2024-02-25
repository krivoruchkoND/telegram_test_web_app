import React from "react";
import FormItem from "@components/FormItem";
import classes from "./styles.module.css";
import PageTitle from "@components/PageTitle";

const computePriceDefaultValue = "0.005";
const computeLimitDefaultValue = "1400000";

const BuyTokenBlock: React.FC = () => {
  const [slippage, setSlippage] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [computeLimit, setComputeLimit] = React.useState("");
  const [computePrice, setComputePrice] = React.useState("");
  const [retryValue, setRetryValue] = React.useState("");

  const [allowAutoComputePrice, setAllowAutoComputePrice] =
    React.useState(true);
  const [allowAutoComputeLimit, setAllowAutoComputeLimit] =
    React.useState(true);

  React.useEffect(() => {
    if (!allowAutoComputePrice) {
      setComputeLimit(computePriceDefaultValue);
    }
  }, [allowAutoComputePrice]);

  React.useEffect(() => {
    if (!allowAutoComputeLimit) {
      setComputeLimit(computeLimitDefaultValue);
    }
  }, [allowAutoComputeLimit]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className={classes.but_token_block} onSubmit={onSubmit}>
      <PageTitle title="Autobuy" />

      <FormItem
        id={"slippage"}
        value={slippage}
        onChange={setSlippage}
        label={"Slippage"}
        description={
          "Difference between expected and actual results amounts of token"
        }
        inputMode={"decimal"}
        placeholder={"Enter value"}
        masks={["empty", "percent"]}
      />

      <FormItem
        id={"amount"}
        value={amount}
        onChange={setAmount}
        label={"Amount"}
        description={"Number of tokens for purchase"}
        inputMode={"decimal"}
        placeholder={"Enter value"}
        masks={["empty", "float"]}
      />

      <FormItem
        id={"computeLimit"}
        value={computeLimit}
        onChange={setComputeLimit}
        label={"Compute Unit Limit"}
        description={
          "The compute budget roughly determines how much a computing machine can consume for your transaction. Will not affect the success rate of your transaction since it still executes the same code, but if there are not enough funds the transaction will fail."
        }
        switchProps={{
          subLabel: "Auto",
          checked: allowAutoComputeLimit,
          onChange: setAllowAutoComputeLimit,
        }}
        inputMode={"decimal"}
        placeholder={"Enter value"}
        masks={["empty", "decimal"]}
      />

      <FormItem
        id={"computePrice"}
        value={computePrice}
        onChange={setComputePrice}
        label={"Compute Unit Price (priority)"}
        description={
          "Increasing the transaction fee increases its priority, but it only competes within the same slot, without guaranteeing inclusion in others."
        }
        switchProps={{
          subLabel: "Auto",
          checked: allowAutoComputePrice,
          onChange: setAllowAutoComputePrice,
        }}
        inputMode={"decimal"}
        placeholder={"Enter value"}
        masks={["empty", "sol"]}
      />

      <FormItem
        id={"retryValue"}
        value={retryValue}
        onChange={setRetryValue}
        label={"Retry value"}
        description={"Number of retry transaction in node if transaction fail"}
        inputMode={"decimal"}
        placeholder={"Enter value"}
        masks={["empty", "decimal"]}
      />
    </form>
  );
};

export default BuyTokenBlock;
