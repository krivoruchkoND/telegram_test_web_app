import { makeAutoObservable, runInAction } from "mobx";

import { getProfileSettings } from "@apis/settings";

import RootStore from "./RootStore";

class ProfileSettingsStore {
  rootStore: RootStore;
  publicAddress: string | null = null;
  createAt: string | null = null;
  referral: {
    url: string | null;
    inviteesCount: number;
    reward: number;
  } | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  getProfileSettings = async () => {
    try {
      const { publicAddress, createAt, referral } = await getProfileSettings();
      runInAction(() => {
        this.publicAddress = publicAddress;
        this.createAt = createAt;
        this.referral = referral;
      });
    } catch (error) {
      console.error("🚨 ProfileSettingsStore getProfileSettings", error);
    }
  };
}

export default ProfileSettingsStore;
