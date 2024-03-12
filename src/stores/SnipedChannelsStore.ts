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

  isLoading = {
    getSnipedChannels: false,
    addSnipedChannel: false,
    removeSnipedChannel: false,
  };

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  setChannelLink = (link: string) => {
    this.channelLink = link;
  };

  getSnipedChannels = async () => {
    try {
      this.isLoading.getSnipedChannels = true;
      const { channels } = await getSnipedChannels();
      this.channels = channels;
    } catch (error) {
      console.error("🚨 SnipedChannelsStore getSnipedChannels", error);
    } finally {
      this.isLoading.getSnipedChannels = false;
    }
  };

  addSnipedChannel = async (channelTag: string) => {
    try {
      this.isLoading.addSnipedChannel = true;
      const { channels } = await addSnipedChannel(channelTag);
      this.channels = channels;
    } catch (error) {
      console.error("🚨 SnipedChannelsStore addSnipedChannel", error);
    } finally {
      this.isLoading.addSnipedChannel = false;
    }
  };

  removeSnipedChannel = async (channel: Channel) => {
    try {
      this.isLoading.removeSnipedChannel = true;
      await removeSnipedChannel(channel);
      await this.getSnipedChannels();
    } catch (error) {
      console.error("🚨 SnipedChannelsStore removeSnipedChannel", error);
    } finally {
      this.isLoading.removeSnipedChannel = false;
    }
  };
}

export default SnipedChannelsStore;
