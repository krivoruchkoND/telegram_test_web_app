import baseInstance from "@apis/baseInstance";
import camelcaseKeys from "camelcase-keys";

export type ExchangeTokenDto = {
  tokenId: string;
  amount: number;
  slippage: number;
  computeUnitLimit: number;
  computeUnitPrice: number;
  swapPlatforms: string[];
};

export type ExchangeTokenResponse = {
  signature: string;
  url_scanner: string;
  // Date
  create_at: string;
};

export const sellToken = async (exchangeTokenDto: ExchangeTokenDto) => {
  const { data } = await baseInstance.post<ExchangeTokenResponse>(
    "/swaps/sell/input",
    {
      token_address: exchangeTokenDto.tokenId,
      amount: exchangeTokenDto.amount,
      slippage: exchangeTokenDto.slippage,
      compute_unit_limit: exchangeTokenDto.computeUnitLimit,
      compute_unit_price: exchangeTokenDto.computeUnitPrice,
      swap_platforms: exchangeTokenDto.swapPlatforms,
    },
  );

  return camelcaseKeys(data, { deep: true });
};

export const buyToken = async (exchangeTokenDto: ExchangeTokenDto) => {
  const { data } = await baseInstance.post<ExchangeTokenResponse>(
    "/swaps/buy/input",
    {
      token_address: exchangeTokenDto.tokenId,
      amount: exchangeTokenDto.amount,
      slippage: exchangeTokenDto.slippage,
      compute_unit_limit: exchangeTokenDto.computeUnitLimit,
      compute_unit_price: exchangeTokenDto.computeUnitPrice,
      swap_platforms: exchangeTokenDto.swapPlatforms,
    },
  );

  return camelcaseKeys(data, { deep: true });
};
