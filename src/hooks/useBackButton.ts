import { useEffect, useCallback, useState } from "react";

import { useTelegramWebAppStore } from "@stores/TelegramWebAppStore";

const useBackButton = (onBack: () => void) => {
  const webApp = useTelegramWebAppStore((store) => store.webApp);
  const handler = useCallback(onBack, [onBack]);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (isSupported) {
      webApp?.BackButton.show();
    }

    return () => {
      if (isSupported) {
        webApp?.BackButton.hide();
      }
    };
  }, [webApp, isSupported]);

  useEffect(() => {
    if (isSupported) {
      webApp?.BackButton.onClick(handler);
    }

    return () => {
      if (isSupported) {
        webApp?.BackButton.offClick(handler);
      }
    };
  }, [webApp, isSupported]);

  useEffect(() => {
    setIsSupported(webApp?.isVersionAtLeast("6.1") || false);
  }, [webApp]);

  return isSupported;
};

export default useBackButton;
