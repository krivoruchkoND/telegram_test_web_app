import { useEffect } from "react";
import { useLocation } from "wouter";

import { useTelegramWebAppStore } from "@stores/TelegramWebAppStore";
import { useAuthStore } from "@stores/AuthStore";

const useAuthHandler = () => {
  const [, setLocation] = useLocation();
  const webApp = useTelegramWebAppStore((store) => store.webApp);
  const auth = useAuthStore((store) => store.auth);
  const isAuthSucceed = useAuthStore((store) => store.isAuthSucceed);

  useEffect(() => {
    if (!isAuthSucceed) {
      setLocation("/");
    }
  }, [isAuthSucceed]);

  useEffect(() => {
    if (webApp) {
      auth(webApp.initData);
    }
  }, [webApp, auth]);
};

export default useAuthHandler;
