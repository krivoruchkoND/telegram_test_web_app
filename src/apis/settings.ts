import camelcaseKeys, { CamelCaseKeys } from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

// import {
//   buildMockResponse,
//   mockSettingsValue,
//   mockProfileSettingsValue,
// } from "@mocks/settings";
// import { mockValue, buildMockResponse } from "@mocks/sniper";
import baseInstance from "./baseInstance";

export type Settings = {
  notification: boolean;
  buying_info_auto: {
    turn_off: boolean;
    repeat_transaction: number;
    amount: number;
    slippage: number;
    from_token: string;
    compute_unit_limit: number;
    compute_unit_price: number;
    swap_platforms: string[];
    mev_protection: number;
  };
  buying_info_sniper: {
    turn_off: boolean;
    repeat_transaction: number;
    amount: number;
    slippage: number;
    from_token: string;
    compute_unit_limit: number;
    compute_unit_price: number;
    swap_platforms: string[];
    mev_protection: number;
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

export type Channel = {
  id: number;
  telegram_channel_tag: string;
  title: string;
  image_url: string;
};

export const getSettings = async () => {
  const response = await baseInstance.get<Settings>(`/settings/all`);

  // const responseMock = await buildMockResponse(mockSettingsValue);

  return camelcaseKeys(response.data, { deep: true });
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

  // const responseMock = await buildMockResponse(mockProfileSettingsValue);

  return camelcaseKeys(response.data, { deep: true });
};

export const getPrivateKey = async () => {
  const response = await baseInstance.get<string>(`/settings/private_key`);
  return response.data;
};

export const getSnipedChannels = async () => {
  const response = await baseInstance.get<{ channels: Channel[] }>(
    `/settings/sniped_channels`,
  );

  // const mockResponse = await buildMockResponse(mockValue);

  return camelcaseKeys(response.data, { deep: true });
};

export const addSnipedChannel = async (channelTag: string) => {
  const response = await baseInstance.post<{ channels: Channel[] }>(
    "/settings/add_sniped_channel",
    {
      channel_tag: channelTag,
    },
  );

  return camelcaseKeys(response.data, { deep: true });
};

export const removeSnipedChannel = async (channel: CamelCaseKeys<Channel>) => {
  await baseInstance.post<void>(
    "/settings/remove_sniped_channel",
    snakecaseKeys(channel),
  );

  return true;
};
