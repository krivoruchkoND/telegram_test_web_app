import { makeAutoObservable } from "mobx";

import AuthStore from "./AuthStore";
import ProfileSettingsStore from "./ProfileSettingsStore";
import WalletStore from "./WalletStore";
import SwapsStore from "./SwapsStore";
import TelegramWebAppStore from "./TelegramWebAppStore";

class RootStore {
  authStore: AuthStore;
  profileSettingsStore: ProfileSettingsStore;
  walletStore: WalletStore;
  swapsStore: SwapsStore;
  telegramWebAppStore: TelegramWebAppStore;

  constructor() {
    makeAutoObservable(this);

    this.authStore = new AuthStore(this);
    this.profileSettingsStore = new ProfileSettingsStore(this);
    this.walletStore = new WalletStore(this);
    this.swapsStore = new SwapsStore(this);
    this.telegramWebAppStore = new TelegramWebAppStore(this);
  }
}

export default RootStore;
