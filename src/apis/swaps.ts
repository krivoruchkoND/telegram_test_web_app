import baseInstance from "./baseInstance";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

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

export type CreateTransactionDto = {
  tokenAddress: string;
  amount: number;
  slippage: number;
  computeUnitLimit: number;
  computeUnitPrice: number;
  swapPlatforms: string[];
};

export const createSellTransaction = async (dto: CreateTransactionDto) => {
  await baseInstance.post("/swaps/sell/input", snakecaseKeys(dto));
};

export const createBuyTransaction = async (dto: CreateTransactionDto) => {
  await baseInstance.post("/swaps/buy/input", snakecaseKeys(dto));
};
