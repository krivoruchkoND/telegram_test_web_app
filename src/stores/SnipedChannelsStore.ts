import { makeAutoObservable } from "mobx";

import {
  getSnipedChannels,
  addSnipedChannel,
  removeSnipedChannel,
} from "@apis/settings";

import RootStore from "./RootStore";

export type Channel = Awaited<
  ReturnType<typeof getSnipedChannels>
>["channels"][number];

class SnipedChannelsStore {
  rootStore: RootStore;
  channels: Channel[] = [];
  channelLink: string | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  setChannelLink = (link: string) => {
    this.channelLink = link;
  };

  getSnipedChannels = async () => {
    try {
      const { channels } = await getSnipedChannels();
      this.channels = channels;
    } catch (error) {
      console.error("SnipedChannelsStore getSnipedChannels", error);
    }
  };

  addSnipedChannel = async (channelTag: string) => {
    try {
      const { channels } = await addSnipedChannel(channelTag);
      this.channels = channels;
    } catch (error) {
      console.error("SnipedChannelsStore addSnipedChannel", error);
    }
  };

  removeSnipedChannel = async (channel: Channel) => {
    try {
      await removeSnipedChannel(channel);
      await this.getSnipedChannels();
    } catch (error) {
      console.error("SnipedChannelsStore removeSnipedChannel", error);
    }
  };
}

export default SnipedChannelsStore;
