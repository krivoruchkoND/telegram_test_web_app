import { useEffect } from "react";

import { useTelegramWebAppStore } from "@stores/TelegramWebAppStore";

const useInitTelegramWebApp = () => {
  const webApp = useTelegramWebAppStore((state) => state.webApp);
  const setWebApp = useTelegramWebAppStore((state) => state.setWebApp);

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
