import { type Settings, type ProfileSettings } from "@apis/settings";

export const mockSettingsValue: Settings = {
  notification: true,
  autobuy: true,
  sniper: false,
  buying_info_auto: {
    repeat_transaction: 0,
    amount: 0.5,
    slippage: 0.3,
    from_token: "So11111111111111111111111111111111111111112",
    compute_unit_limit: 1400000,
    compute_unit_price: 5000,
    swap_platforms: ["jupiter", "radyum", "test_platform"],
    mev_protection: 0.1,
  },
  buying_info_sniper: {
    repeat_transaction: 0,
    amount: 0.5,
    slippage: 0.3,
    from_token: "So11111111111111111111111111111111111111112",
    compute_unit_limit: 1400000,
    compute_unit_price: 5000,
    swap_platforms: ["jupiter", "radyum", "test_platform"],
    mev_protection: 0.5,
  },
};

export const mockProfileSettingsValue: ProfileSettings = {
  public_address: "GKZ78dy5ahtw9DknA8V5XnqELQogexq2Pt9W1YQoCR3f",
  create_at: "2024-02-18T18:13:57.557000",
  referral: {
    url: "https://rockbotstaging.com/",
    invitees_count: 0,
    reward: 0,
  },
};

export const buildMockResponse = <T>(returnValue: T) =>
  new Promise<{ data: T }>((resolve) => {
    setTimeout(() => {
      resolve({ data: returnValue });
    }, 1000);
  });
