import camelcaseKeys from "camelcase-keys";

// import { mockResponse } from "@mocks/settings";

import baseInstance from "./baseInstance";

export type Settings = {
  notification: boolean;
  buying_info_auto: {
    repeat_transaction: number;
    amount: number;
    slippage: number;
    from_token: string;
    compute_unit_limit: number;
    compute_unit_price: number;
  };
  buying_info_sniper: {
    repeat_transaction: number;
    amount: number;
    slippage: number;
    from_token: string;
    compute_unit_limit: number;
    compute_unit_price: number;
  };
};

export const getSettings = async () => {
  const response = await baseInstance.get<Settings>(`/settings`);

  // const responseMock = await mockResponse;

  return camelcaseKeys(response.data, { deep: true });
};
