import { makeAutoObservable, runInAction } from "mobx";

import { getProfileSettings } from "@apis/settings";

import RootStore from "./RootStore";

class ProfileSettingsStore {
  rootStore: RootStore;
  publicAddress: string | null = null;
  createAt: string | null = null;

  isLoading = {
    getProfileSettings: false,
  };

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  getProfileSettings = async () => {
    try {
      this.isLoading.getProfileSettings = true;
      const { publicAddress, createAt } = await getProfileSettings();
      runInAction(() => {
        this.publicAddress = publicAddress;
        this.createAt = createAt;
      });
    } catch (error) {
      console.error("🚨 ProfileSettingsStore getProfileSettings", error);
    } finally {
      this.isLoading.getProfileSettings = false;
    }
  };
}

export default ProfileSettingsStore;
