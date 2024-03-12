import { makeAutoObservable, runInAction } from "mobx";

import { auth } from "@apis/auth";

import RootStore from "./RootStore";

class AuthStore {
  rootStore: RootStore;
  isAuthSucceed: boolean = false; // ? is it excessive?
  accessToken: string | null = null;

  isLoading = {
    auth: false,
  };

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  auth = async (initData: string) => {
    try {
      this.isLoading.auth = true;
      const { accessToken } = await auth(initData);
      runInAction(() => {
        this.accessToken = accessToken;
        this.isAuthSucceed = true;
      });
    } catch (error) {
      console.error("🚨 AuthStore auth error", error);
    } finally {
      this.isLoading.auth = false;
    }
  };
}

export default AuthStore;
