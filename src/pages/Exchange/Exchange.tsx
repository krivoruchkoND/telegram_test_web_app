import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import FormItem from "@/components/FormItem";
import classes from "./styles.module.css";
import ExchangeToken from "@components/ExchangeToken";
import AmountInput from "@components/AmountInput";
import ExchangeSwitch from "@components/ExchangeSwitch";
import PrimaryButton from "@components/PrimaryButton";
import PageTitle from "@components/PageTitle";
import PlatformsSwapper from "@components/PlatformsSwapper";
import { buyToken, sellToken } from "@apis/swaps.ts";
import { getBuySettings, getSellSettings } from "@apis/settings.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSOLBalance, getTokenById } from "@apis/wallet.ts";
import { Redirect, useParams } from "wouter";

const Exchange: FC = () => {
  const { tokenId } = useParams();
  const [isSelling, setIsSelling] = useState(false);
  const [isAutoPlatforms, setIsAutoPlatforms] = useState(true);
  const [swapPlatforms, setSwapPlatforms] = useState<string[]>([]);
  const { data: token, isLoading: isTokenLoading } = useQuery({
    queryKey: ["token", "wallet"],
    queryFn: () => getTokenById(tokenId!),
  });
  const { data: solBalance, isLoading: isSolLoading } = useQuery({
    queryKey: ["sol", "balance", "exchange"],
    queryFn: getSOLBalance,
  });
  const { data: buySettings, isLoading: areBuySettingsLoading } = useQuery({
    queryKey: ["settings", "exchange", "buy"],
    queryFn: getBuySettings,
  });
  const { data: sellSettings, isLoading: areSellSettingsLoading } = useQuery({
    queryKey: ["settings", "exchange", "sell"],
    queryFn: getSellSettings,
  });
  const settings = isSelling ? sellSettings : buySettings;
  const { mutateAsync: mutateBuyToken, isPending: isBuyingPending } =
    useMutation({
      mutationKey: ["exchange", "balance"],
      mutationFn: buyToken,
    });
  const { mutateAsync: mutateSellToken, isPending: isSellingPending } =
    useMutation({
      mutationKey: ["exchange", "balance"],
      mutationFn: sellToken,
    });
  const mutateExchange = isSelling ? mutateSellToken : mutateBuyToken;
  const isExchangePending = isSelling ? isSellingPending : isBuyingPending;

  if (
    isTokenLoading ||
    isSolLoading ||
    areBuySettingsLoading ||
    areSellSettingsLoading
  ) {
    return null;
  }

  const [slippage, setSlippage] = useState(settings?.slippage ?? 0);
  const [amount, setAmount] = useState(0);

  const [computeLimit, setComputeLimit] = useState(
    settings?.computeUnitLimit ?? 0,
  );
  const [allowAutoComputeLimit, setAllowAutoComputeLimit] = useState(true);

  useEffect(() => {
    if (allowAutoComputeLimit) {
      setComputeLimit(settings?.computeUnitLimit ?? 0);
    }
  }, [allowAutoComputeLimit]);

  const [computePrice, setComputePrice] = useState(
    settings?.computeUnitPrice ?? 0,
  );
  const [allowAutoComputePrice, setAllowAutoComputePrice] = useState(true);

  useEffect(() => {
    if (allowAutoComputePrice) {
      setComputePrice(settings?.computeUnitPrice ?? 0);
    }
  }, [allowAutoComputePrice]);

  const [retryValue, setRetryValue] = useState(
    settings?.repeatTransaction ?? 0,
  );

  if (!tokenId) {
    Redirect({
      href: "/wallet",
    });
  }

  useEffect(() => {
    setSlippage(settings?.slippage ?? 0);
    setRetryValue(settings?.repeatTransaction ?? 0);

    setAllowAutoComputeLimit(true);
    setComputeLimit(settings?.computeUnitLimit ?? 0);

    setAllowAutoComputePrice(true);
    setComputePrice(settings?.computeUnitPrice ?? 0);

    setSwapPlatforms(settings?.swapPlatforms ?? []);
  }, [isSelling]);

  useEffect(() => {
    if (isAutoPlatforms) {
      setSwapPlatforms(settings?.swapPlatforms ?? []);
    }
  }, [isAutoPlatforms]);

  const handleSetNumber =
    (setter: Dispatch<SetStateAction<number>>) => (value: string) =>
      setter(Number(value));

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await mutateExchange({
        tokenId: token!.id,
        amount,
        slippage: slippage,
        computeUnitLimit: computeLimit,
        computeUnitPrice: computePrice,
        swapPlatforms,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.exchange}>
      {token && <ExchangeToken token={token} />}
      <form className={classes.exchange_form} onSubmit={onSubmit}>
        <ExchangeSwitch checked={isSelling} onChange={setIsSelling} />

        <AmountInput
          value={amount}
          onChange={setAmount}
          balance={!isSelling ? solBalance ?? 0 : token?.amount ?? 0}
          type={!isSelling ? "SOL" : "ROCK"}
          masks={["decimal"]}
        />

        <FormItem
          id={"slippage"}
          value={String(slippage)}
          onChange={handleSetNumber(setSlippage)}
          label={"Slippage"}
          description={
            "Difference between expected and actual results amounts of token"
          }
          inputMode={"decimal"}
          placeholder={"Enter value"}
          masks={["empty", "percent"]}
        />

        <PrimaryButton type={"submit"} disabled={isExchangePending}>
          {isSelling ? "Sell" : "Buy"} ROCK
        </PrimaryButton>

        <PageTitle title={"Swap settings"} />

        <PlatformsSwapper
          isAutoPlatforms={isAutoPlatforms}
          setIsAutoPlatforms={setIsAutoPlatforms}
          platforms={swapPlatforms}
          setPlatforms={setSwapPlatforms}
        />

        <FormItem
          id={"computeLimit"}
          value={String(computeLimit)}
          onChange={handleSetNumber(setComputeLimit)}
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
          value={String(computePrice)}
          onChange={handleSetNumber(setComputePrice)}
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
          value={String(retryValue)}
          onChange={handleSetNumber(setRetryValue)}
          label={"Retry value"}
          description={
            "Number of retry transaction in node if transaction fail"
          }
          inputMode={"decimal"}
          placeholder={"Enter value"}
          masks={["empty", "decimal"]}
        />
      </form>
    </div>
  );
};

export default Exchange;
