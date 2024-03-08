import { useEffect } from "react";

import { useRootStore } from "./useRootStore";

const useInitTelegramWebApp = () => {
  const {
    telegramWebAppStore: { webApp, setWebApp },
  } = useRootStore();

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Checking if WebApp is initialized...");
      if (Telegram?.WebApp) {
        setWebApp(Telegram.WebApp);
        Telegram.WebApp.expand();
        Telegram.WebApp.ready();
        if (Telegram.WebApp.isVersionAtLeast("6.1")) {
          Telegram.WebApp.setHeaderColor("#000000");
        }
        clearInterval(timer);
      }
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return webApp;
};

export default useInitTelegramWebApp;
