import camelcaseKeys from "camelcase-keys";

// import baseInstance from "./baseInstance";

import { mockResponse } from "@mocks/wallet";
import { buildMockResponse } from "@mocks/settings";

export type TokenResponse = {
  id: string;
  market_cap?: number;
  value?: number;
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

export type Token = Awaited<ReturnType<typeof getTokenById>>;

export const getTokens = async (_params: { page: number; size: number }) => {
  // const response = await baseInstance.get<{
  //   total_value: number;
  //   tokens: TokenResponse[];
  // }>(`/wallet/tokens`, {
  //   params,
  // });

  const mock = await mockResponse;

  return camelcaseKeys(mock.data, { deep: true });
};

const mock1 = {
  id: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
  market_cap: 0,
  value: null,
  amount: 0.031591,
  pnl: null,
  metadata: {
    name: "Raydium",
    symbol: "RAY",
    description: null,
    image_url: null,
  },
};

export const getTokenById = async (_id: string) => {
  // const { data } = await baseInstance.get<TokenResponse>(
  //   `/wallet/tokens/${id}`,
  // );

  const { data } = await buildMockResponse(mock1);

  return camelcaseKeys(data, { deep: true });
};

const mock2 = 1099;

export const getSOLBalance = async () => {
  // const { data } = await baseInstance.get<number>("/wallet/balance/SOL");

  const { data } = await buildMockResponse(mock2);

  return data;
};
