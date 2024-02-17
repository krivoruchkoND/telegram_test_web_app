import { useCallback, useEffect } from "react";

import { useTelegramWebAppStore } from "@stores/TelegramWebAppStore";

const useBackButtonHandler = (onBack: () => void, callOnUnmount = true) => {
  const webApp = useTelegramWebAppStore((store) => store.webApp);

  const handler = useCallback(onBack, [onBack]);

  useEffect(() => {
    webApp?.BackButton.onClick(handler);

    return () => {
      if (callOnUnmount) {
        handler();
      }
      webApp?.BackButton.offClick(handler);
    };
  }, [webApp, callOnUnmount]);
};

export default useBackButtonHandler;
