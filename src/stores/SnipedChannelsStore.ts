import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import {
  getSnipedChannels,
  addSnipedChannel,
  removeSnipedChannel,
} from "@apis/settings";

export type Channel = Awaited<
  ReturnType<typeof getSnipedChannels>
>["channels"][number];

export type SnipedChannelsStore = {
  channels: Channel[];
  channelLink: string | null;

  setChannelLink: (link: string) => void;
  getSnipedChannels: () => Promise<void>;
  addSnipedChannel: (channelTag: string) => Promise<void>;
  removeSnipedChannel: (channel: Channel) => Promise<void>;
};

export const useSnipedChannelsStore = create<SnipedChannelsStore>()(
  immer((set, get) => ({
    channels: [],
    channelLink: null,

    setChannelLink: (link: string) => {
      set((state) => {
        state.channelLink = link;
      });
    },

    getSnipedChannels: async () => {
      try {
        const { channels } = await getSnipedChannels();
        set((state) => {
          state.channels = channels;
        });
      } catch (error) {
        console.error(error);
      }
    },

    addSnipedChannel: async (channelTag: string) => {
      try {
        const { channels } = await addSnipedChannel(channelTag);
        set((state) => {
          state.channels = channels;
        });
      } catch (error) {
        console.error(error);
      }
    },

    removeSnipedChannel: async (channel: Channel) => {
      try {
        await removeSnipedChannel(channel);
        await get().getSnipedChannels();
        // if (isRemoved) {
        //   set((state) => {
        //     state.channels = state.channels.filter(
        //       ({ id }) => id !== channel.id,
        //     );
        //   });
        // }
      } catch (error) {
        console.error(error);
      }
    },
  })),
);
