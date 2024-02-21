import camelcaseKeys from "camelcase-keys";

// import {
//   buildMockResponse,
//   mockSettingsValue,
//   mockProfileSettingsValue,
// } from "@mocks/settings";

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

export type ProfileSettings = {
  public_address: string;
  create_at: string;
  referral: {
    url: string;
    invitees_count: number;
    reward: number;
  };
};

export const getSettings = async () => {
  const response = await baseInstance.get<Settings>(`/settings`);

  // const responseMock = await buildMockResponse(mockSettingsValue);

  return camelcaseKeys(response.data, { deep: true });
};

export const getProfileSettings = async () => {
  const response = await baseInstance.get<ProfileSettings>(`/settings/profile`);

  // const responseMock = await buildMockResponse(mockProfileSettingsValue);

  return camelcaseKeys(response.data, { deep: true });
};
