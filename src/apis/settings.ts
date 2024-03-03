import camelcaseKeys, { CamelCaseKeys } from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

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

export type ExchangeSettingsResponse = {
  repeat_transaction: number;
  slippage: number;
  from_token: string;
  swap_platforms: string[];
  compute_unit_limit: number;
  compute_unit_price: number;
};

export const getSettings = async () => {
  const { data } = await baseInstance.get<Settings>(`/settings/all`);
  return camelcaseKeys(data, { deep: true });
};

export const updateSettings = async (
  settings: CamelCaseKeys<Settings, true>,
) => {
  await baseInstance.post<void>(
    "/settings/update",
    snakecaseKeys(settings, { deep: true }),
  );

  return true;
};

export const getProfileSettings = async () => {
  const response = await baseInstance.get<ProfileSettings>(`/settings/profile`);
  return camelcaseKeys(response.data, { deep: true });
};

export const getPrivateKey = async () => {
  const { data } = await baseInstance.get<string>(`/settings/private_key`);
  return data;
};

export const getBuySettings = async () => {
  const { data } =
    await baseInstance.get<ExchangeSettingsResponse>(`/settings/buy`);

  return camelcaseKeys(data);
};

export const getSellSettings = async () => {
  const { data } =
    await baseInstance.get<ExchangeSettingsResponse>(`/settings/sell`);

  return camelcaseKeys(data);
};
