import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { auth } from "@apis/auth";

export type AuthStore = {
  initialLoggedIn: boolean;
  accessToken: string | null;
  auth: (initData: string) => Promise<void>;
};

export const useAuthStore = create<AuthStore>()(
  immer((set) => ({
    initialLoggedIn: false,
    accessToken: null,
    auth: async (initData: string) => {
      try {
        const { accessToken } = await auth(initData);
        set((state) => {
          state.accessToken = accessToken;
          state.initialLoggedIn = true;
        });
      } catch (error) {
        // TODO: redirect to splash screen?
        console.error(error);
      }
    },
  })),
);
