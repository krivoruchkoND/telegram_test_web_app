import camelcaseKeys from "camelcase-keys";

// import { mockResponse } from "@mocks/wallet";
import baseInstance from "./baseInstance";

export type Token = {
  id: string;
  market_cap: number;
  value: number;
  amount: number | null;
  pnl: {
    value: number;
    rate: number;
  } | null;
  metadata: {
    name: string;
    symbol: string;
    description: string | null;
    image_url: string | null;
  };
};

export const getTokens = async (params: { page: number; size: number }) => {
  const response = await baseInstance.get<{
    total_value: number;
    tokens: Token[];
  }>(`/wallet/tokens`, {
    params,
  });

  // const responseMock = await mockResponse;

  return camelcaseKeys(response.data, { deep: true });
};

export const getBalance = async () => {
  const response = await baseInstance.get<number>(`/wallet/balance/SOL`);

  return response.data;
};
