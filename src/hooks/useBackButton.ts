import { useEffect, useCallback, useState } from "react";

import useRootStore from "./useRootStore";

const useBackButton = (onBack: () => void) => {
  const {
    telegramWebAppStore: { webApp },
  } = useRootStore();
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
