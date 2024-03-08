import { nanoid } from "nanoid";

import {
  type Settings,
  type ProfileSettings,
  type Channel,
} from "@apis/settings";

export const settingsAllMock: Settings = {
  notification: true,
  buying_info_auto: {
    turn_off: true,
    repeat_transaction: 0,
    amount: 0.5,
    slippage: 0.3,
    from_token: "So11111111111111111111111111111111111111112",
    compute_unit_limit: 1400000,
    compute_unit_price: 5000,
    swap_platforms: [
      "jupiter",
      "radyum",
      "test_platform",
      "another_test_platform",
    ],
    mev_protection: 0.1,
  },
  buying_info_sniper: {
    turn_off: false,
    repeat_transaction: 0,
    amount: 0.5,
    slippage: 0.3,
    from_token: "So11111111111111111111111111111111111111112",
    compute_unit_limit: 1400000,
    compute_unit_price: 5000,
    swap_platforms: [
      "jupiter",
      "radyum",
      "test_platform",
      "another_test_platform",
    ],
    mev_protection: 0.5,
  },
  last_buy_info: {
    repeat_transaction: 0,
    slippage: 0.3,
    from_token: "So111111",
    swap_platforms: ["jupiter", "radyum"],
    compute_unit_limit: 1400000,
    compute_unit_price: 5000,
  },
  last_sell_info: {
    repeat_transaction: 0,
    slippage: 0.3,
    from_token: "So111111",
    swap_platforms: ["jupiter", "radyum"],
    compute_unit_limit: 1400000,
    compute_unit_price: 5000,
  },
};

export const profileSettingsMock: ProfileSettings = {
  public_address: "GKZ78dy5ahtw9DknA8V5XnqELQogexq2Pt9W1YQoCR3f",
  create_at: "2024-02-18T18:13:57.557000",
  referral: {
    url: "https://rockbotstaging.com/",
    invitees_count: 0,
    reward: 0,
  },
};

export const privateKeyMock = `${nanoid()}-${nanoid()}-${nanoid()}-${nanoid()}-${nanoid()}`;

export const snipedChannelsMock: { channels: Channel[] } = {
  channels: [
    {
      id: 1,
      telegram_channel_tag: "rockbot",
      title: "Rockbot",
      image_url:
        "https://gateway.irys.xyz/m0x31ZCuqG640Dvteo-GmiKaLvD7YvmLnV7WrT7Ugmo1",
    },
    {
      id: 2,
      telegram_channel_tag: "rockbot",
      title: "Rockbot",
      image_url:
        "https://gateway.irys.xyz/m0x31ZCuqG640Dvteo-GmiKaLvD7YvmLnV7WrT7Ugmo2",
    },
    {
      id: 3,
      telegram_channel_tag: "rockbot",
      title: "Rockbot",
      image_url:
        "https://gateway.irys.xyz/m0x31ZCuqG640Dvteo-GmiKaLvD7YvmLnV7WrT7Ugmo3",
    },
  ],
};
