import { makeAutoObservable, runInAction } from "mobx";

import { tabs } from "@consts/settingsTabs";
import { getSettings, updateSettings, getPrivateKey } from "@apis/settings";

import RootStore from "./RootStore";
import GenericSettingsStore from "./GenericSettingsStore";

class SettingsStore {
  rootStore: RootStore;
  tabs = tabs;
  isNotificationsEnabled = true;
  isAutoBuyEnabled = true;
  isSniperEnabled = true;
  privateKey: string | null = null;
  isFetched = false;

  autoBuySettings = new GenericSettingsStore();
  sniperSettings = new GenericSettingsStore();
  lastBuySettings = new GenericSettingsStore();
  lastSellSettings = new GenericSettingsStore();

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  setIsNotificationsEnabled = (value: boolean) => {
    this.isNotificationsEnabled = value;
  };

  setIsAutoBuyEnabled = (value: boolean) => {
    this.isAutoBuyEnabled = value;
  };

  setIsSniperEnabled = (value: boolean) => {
    this.isSniperEnabled = value;
  };

  getSettings = async () => {
    try {
      const {
        notification,
        buyingInfoAuto,
        buyingInfoSniper,
        lastBuyInfo,
        lastSellInfo,
      } = await getSettings();

      this.autoBuySettings.setValues(buyingInfoAuto);
      this.sniperSettings.setValues(buyingInfoSniper);
      this.lastBuySettings.setValues(lastBuyInfo);
      this.lastSellSettings.setValues(lastSellInfo);

      runInAction(() => {
        this.isNotificationsEnabled = notification;
        this.isAutoBuyEnabled = !buyingInfoAuto.turnOff;
        this.isSniperEnabled = !buyingInfoSniper.turnOff;
        this.isFetched = true;
      });
    } catch (error) {
      console.error("🚨 SettingsStore getSettings", error);
    }
  };

  updateSettings = async () => {
    if (!this.isFetched) {
      return;
    }

    const {
      isNotificationsEnabled,
      isAutoBuyEnabled,
      isSniperEnabled,
      autoBuySettings,
      sniperSettings,
      lastBuySettings,
      lastSellSettings,
    } = this;

    const settings: Parameters<typeof updateSettings>[0] = {
      notification: isNotificationsEnabled,
      buyingInfoAuto: {
        turnOff: !isAutoBuyEnabled,
        slippage: Number(autoBuySettings.slippage),
        amount: Number(autoBuySettings.amount),
        computeUnitLimit: Number(autoBuySettings.computeLimit),
        computeUnitPrice: Number(autoBuySettings.computePrice),
        repeatTransaction: Number(autoBuySettings.retryValue),
        mevProtection: Number(autoBuySettings.mevProtection),
        fromToken: autoBuySettings.fromToken ?? "",
        swapPlatforms: autoBuySettings.swapPlatforms.map(({ title }) => title),
      },
      buyingInfoSniper: {
        turnOff: !isSniperEnabled,
        slippage: Number(sniperSettings.slippage),
        amount: Number(sniperSettings.amount),
        computeUnitLimit: Number(sniperSettings.computeLimit),
        computeUnitPrice: Number(sniperSettings.computePrice),
        repeatTransaction: Number(sniperSettings.retryValue),
        mevProtection: Number(sniperSettings.mevProtection),
        fromToken: sniperSettings.fromToken ?? "",
        swapPlatforms: sniperSettings.swapPlatforms.map(({ title }) => title),
      },
      lastBuyInfo: {
        repeatTransaction: Number(lastBuySettings.retryValue),
        slippage: Number(lastBuySettings.slippage),
        fromToken: lastBuySettings.fromToken ?? "",
        swapPlatforms: lastBuySettings.swapPlatforms.map(({ title }) => title),
        computeUnitLimit: Number(lastBuySettings.computeLimit),
        computeUnitPrice: Number(lastBuySettings.computePrice),
      },
      lastSellInfo: {
        repeatTransaction: Number(lastSellSettings.retryValue),
        slippage: Number(lastSellSettings.slippage),
        fromToken: lastSellSettings.fromToken ?? "",
        swapPlatforms: lastSellSettings.swapPlatforms.map(({ title }) => title),
        computeUnitLimit: Number(lastSellSettings.computeLimit),
        computeUnitPrice: Number(lastSellSettings.computePrice),
      },
    };

    try {
      await updateSettings(settings);
    } catch (error) {
      console.error("🚨 SettingsStore updateSettings", error);
    }
  };

  getPrivateKey = async () => {
    try {
      const privateKey = await getPrivateKey();

      runInAction(() => {
        this.privateKey = privateKey;
      });
    } catch (error) {
      console.error("🚨 SettingsStore getPrivateKey", error);
    }
  };
}

export default SettingsStore;
