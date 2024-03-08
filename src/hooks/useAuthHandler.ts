import { useEffect } from "react";
import { useLocation } from "wouter";

import { useRootStore } from "./useRootStore";

const useAuthHandler = () => {
  const [, setLocation] = useLocation();
  const {
    telegramWebAppStore: { webApp },
    authStore: { auth, isAuthSucceed },
  } = useRootStore();

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
