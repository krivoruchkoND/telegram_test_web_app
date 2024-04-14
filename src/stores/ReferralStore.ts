import { makeAutoObservable, runInAction } from "mobx";

import { getReferral, claimReferralReward } from "@apis/referral";
import { showNotification } from "@utils/notificationManager";
import isDetailedError from "@utils/isDetailedError";

import RootStore from "./RootStore";

type Referral = Awaited<ReturnType<typeof getReferral>>;
type RewardTransaction = Awaited<ReturnType<typeof claimReferralReward>>["transaction"];

class ReferralStore {
  rootStore: RootStore;

  referral: Referral | null = null;
  rewardTransaction: RewardTransaction | null = null;

  isLoading = {
    getReferral: false,
    claimReferralReward: false,
  };

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  getReferral = async () => {
    try {
      this.isLoading.getReferral = true;
      const referralData = await getReferral();

      runInAction(() => {
        this.referral = referralData;
      });
    } catch (error) {
      console.error("🚨 ReferralStore getReferral", error);
    } finally {
      this.isLoading.getReferral = false;
    }
  };

  claimReferralReward = async () => {
    try {
      this.isLoading.claimReferralReward = true;
      const { referralData, transaction, message } = await claimReferralReward();

      showNotification({
        type: "success",
        title: "Reward claimed",
        message: `Click to see transaction.\n${message}`,
        link: `https://solscan.io/tx/${transaction.signature}`,
      });

      runInAction(() => {
        this.rewardTransaction = transaction;
        this.referral = referralData;
      });
    } catch (error) {
      console.error("🚨 ReferralStore claimReferralReward", error);

      if (isDetailedError(error) && error.response?.data?.detail) {
        const { message } = error.response.data.detail;
        showNotification({
          type: "error",
          title: "Error while claiming reward",
          message,
        });

        return;
      }

      showNotification({
        type: "error",
        title: "Oops!",
        message: "Error while claiming reward",
      });
    } finally {
      this.isLoading.claimReferralReward = false;
    }
  };

}

export default ReferralStore;