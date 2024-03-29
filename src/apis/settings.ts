import camelcaseKeys, { CamelCaseKeys } from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

// import {
//   profileSettingsMock,
//   settingsAllMock,
//   privateKeyMock,
//   snipedChannelsMock,
// } from "@mocks/settings";
// import buildMockResponse from "@utils/buildMockResponse";

import baseInstance from "./baseInstance";

type SettingParams = {
  repeat_transaction: number;
  slippage: number;
  from_token: string;
  swap_platforms: string[];
  compute_unit_limit: number;
  compute_unit_price: number;
  turn_on?: boolean;
  amount?: number;
  jito_settings?: {
    turn_on: boolean;
    jito_tip: number;
  };
};

export type Settings = {
  notification: boolean;
  buying_info_auto: SettingParams;
  buying_info_sniper: SettingParams;
  last_buy_info: SettingParams;
  last_sell_info: SettingParams;
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
  return camelcaseKeys(response.data, { deep: true });

  // const responseMock = await buildMockResponse(
  //   settingsAllMock,
  //   "/settings/all",
  // );
  // return camelcaseKeys(responseMock.data, { deep: true });
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

  // const responseMock = await buildMockResponse(
  //   profileSettingsMock,
  //   "/settings/profile",
  // );
  // return camelcaseKeys(responseMock.data, { deep: true });
};

export const getPrivateKey = async () => {
  const response = await baseInstance.get<string>(`/settings/private_key`);
  return response.data;

  // const responseMock = await buildMockResponse(
  //   privateKeyMock,
  //   "/settings/private_key",
  // );
  // return responseMock.data;
};

export const getSnipedChannels = async () => {
  const response = await baseInstance.get<{ channels: Channel[] }>(
    `/settings/sniped_channels`,
  );
  return camelcaseKeys(response.data, { deep: true });

  // const responseMock = await buildMockResponse(
  //   snipedChannelsMock,
  //   "/settings/sniped_channels",
  // );
  // return camelcaseKeys(responseMock.data, { deep: true });
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
