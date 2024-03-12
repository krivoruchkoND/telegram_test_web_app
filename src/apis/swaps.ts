import camelcaseKeys, { CamelCaseKeys } from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

// import { swapsMock } from "@mocks/swaps";
// import buildMockResponse from "@/utils/buildMockResponse";

import baseInstance from "./baseInstance";

type Address = {
  address: string;
  amount: number;
  name?: string;
  symbol?: string;
  image_url?: string;
};

export type Swap = {
  id: string;
  type: "swapped" | "send" | "received";
  datetime: string;
  from_address: Address;
  to_address: Address;
};

export const getSwaps = async (params: { page: number; size: number }) => {
  const response = await baseInstance.get<{
    swaps: Swap[];
  }>(`/swaps/all`, { params });
  return camelcaseKeys(response.data, { deep: true });

  // const responseMock = await buildMockResponse(swapsMock, "/swaps/all");
  // return camelcaseKeys(responseMock.data, { deep: true });
};

type CreateTransactionDto = {
  token_address: string;
  amount: number;
  slippage: number;
  compute_unit_limit: number;
  compute_unit_price: number;
  jito_settings: {
    turn_on: boolean;
    jito_tip: number;
  };
  swap_platforms: string[];
};

export const createSellTransaction = async (
  dto: CamelCaseKeys<CreateTransactionDto, true>,
) => {
  await baseInstance.post("/swaps/sell/input", snakecaseKeys(dto));
};

export const createBuyTransaction = async (
  dto: CamelCaseKeys<CreateTransactionDto, true>,
) => {
  await baseInstance.post("/swaps/buy/input", snakecaseKeys(dto));
};
