import { useEffect } from "react";
import { useLocation } from "wouter";

import { useTelegramWebAppStore } from "@stores/TelegramWebAppStore";
import { useAuthStore } from "@stores/AuthStore";

const useAuthHandler = () => {
  const [, setLocation] = useLocation();
  const webApp = useTelegramWebAppStore((store) => store.webApp);
  const auth = useAuthStore((store) => store.auth);
  const initialLoggedIn = useAuthStore((store) => store.initialLoggedIn);

  useEffect(() => {
    if (!initialLoggedIn) {
      setLocation("/");
    }
  }, [initialLoggedIn]);

  useEffect(() => {
    if (webApp) {
      auth(webApp.initData);
    }
  }, [webApp, auth]);
};

export default useAuthHandler;
