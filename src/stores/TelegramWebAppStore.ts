import { makeAutoObservable } from "mobx";

import RootStore from "./RootStore";

class TelegramWebAppStore {
  rootStore: RootStore;
  isLoaded = false;
  webApp: typeof Telegram.WebApp | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  setLoaded = (isLoaded: boolean) => {
    this.isLoaded = isLoaded;
  };

  setWebApp = (webApp: typeof Telegram.WebApp) => {
    this.webApp = webApp;
  };
}

export default TelegramWebAppStore;
