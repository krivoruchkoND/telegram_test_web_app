import { makeAutoObservable } from "mobx";

import AuthStore from "./AuthStore";
import ProfileSettingsStore from "./ProfileSettingsStore";
import WalletStore from "./WalletStore";
import SwapsStore from "./SwapsStore";
import TelegramWebAppStore from "./TelegramWebAppStore";
import SettingsStore from "./SettingsStore";
import SnipedChannelsStore from "./SnipedChannelsStore";
import ReferralStore from "./ReferralStore";

class RootStore {
  authStore: AuthStore;
  profileSettingsStore: ProfileSettingsStore;
  walletStore: WalletStore;
  swapsStore: SwapsStore;
  telegramWebAppStore: TelegramWebAppStore;
  settingsStore: SettingsStore;
  snipedChannelsStore: SnipedChannelsStore;
  referralStore: ReferralStore;

  constructor() {
    makeAutoObservable(this);

    this.authStore = new AuthStore(this);
    this.profileSettingsStore = new ProfileSettingsStore(this);
    this.walletStore = new WalletStore(this);
    this.swapsStore = new SwapsStore(this);
    this.telegramWebAppStore = new TelegramWebAppStore(this);
    this.settingsStore = new SettingsStore(this);
    this.snipedChannelsStore = new SnipedChannelsStore(this);
    this.referralStore = new ReferralStore(this);
  }
}

export default RootStore;
