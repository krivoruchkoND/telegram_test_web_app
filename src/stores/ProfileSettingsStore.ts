import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { getProfileSettings } from "@apis/settings";

export type ProfileSettingsStore = {
  publicAddress: string | null;
  createAt: string | null;
  referral: {
    url: string | null;
    inviteesCount: number;
    reward: number;
  };

  getProfileSettings: () => void;
};

export const useProfileSettingsStore = create<ProfileSettingsStore>()(
  immer((set) => ({
    publicAddress: null,
    createAt: null,
    referral: {
      url: null,
      inviteesCount: 0,
      reward: 0,
    },

    getProfileSettings: async () => {
      try {
        const { publicAddress, createAt, referral } =
          await getProfileSettings();
        set((state) => {
          state.publicAddress = publicAddress;
          state.createAt = createAt;
          state.referral = referral;
        });
      } catch (error) {
        console.error(error);
      }
    },
  })),
);
