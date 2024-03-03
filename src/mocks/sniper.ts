import { type Channel } from "@apis/settings";

export const mockValue: { channels: Channel[] } = {
  channels: [
    {
      id: 1998553413,
      telegram_channel_tag: "rock_bot_test",
      title: "Rock_bot_test",
      image_url: "",
    },
    {
      id: 2144071701,
      telegram_channel_tag: "test_listener_channel",
      title: "test_listener_channel",
      image_url: "",
    },
  ],
};

export const buildMockResponse = <T>(returnValue: T) =>
  new Promise<{ data: T }>((resolve) => {
    setTimeout(() => {
      resolve({ data: returnValue });
    }, 1000);
  });
