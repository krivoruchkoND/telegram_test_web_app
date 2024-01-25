import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TelegramWebAppStore = {
  isLoaded: boolean;
  webApp: typeof Telegram.WebApp | null;
  setLoaded: (isLoaded: boolean) => void;
  setWebApp: (webApp: typeof Telegram.WebApp) => void;
};

export const useTelegramWebAppStore = create<TelegramWebAppStore>()(
  immer((set) => ({
    isLoaded: false,
    webApp: null,
    setLoaded: (isLoaded) =>
      set((state) => {
        state.isLoaded = isLoaded;
      }),
    setWebApp: (webApp) =>
      set((state) => {
        state.webApp = webApp;
      }),
  })),
);
