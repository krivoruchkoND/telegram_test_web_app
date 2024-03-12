import camelcaseKeys from "camelcase-keys";

// import { tokensMock, balanceMock } from "@mocks/wallet";
// import buildMockResponse from "@utils/buildMockResponse";

import baseInstance from "./baseInstance";

export type Token = {
  id: string;
  market_cap: number;
  value: number | null;
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
  const { data } = await baseInstance.get<{
    total_value: number;
    tokens: Token[];
  }>(`/wallet/tokens`, {
    params,
  });
  return camelcaseKeys(data, { deep: true });

  // const responseMock = await buildMockResponse(tokensMock, "/wallet/tokens");
  // return camelcaseKeys(responseMock.data, { deep: true });
};

export const getToken = async (id: string) => {
  const { data } = await baseInstance.get<Token>(`/wallet/token/${id}`);
  return camelcaseKeys(data, { deep: true });

  // const responseMock = await buildMockResponse(
  //   tokensMock.tokens[0],
  //   "/wallet/token/1",
  // );
  // return camelcaseKeys(responseMock.data, { deep: true });
};

export const getBalance = async () => {
  const { data } = await baseInstance.get<number>(`/wallet/balance/SOL`);
  return data;

  // const responseMock = await buildMockResponse(
  //   balanceMock,
  //   "/wallet/balance/SOL",
  // );
  // return responseMock.data;
};
