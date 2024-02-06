import { useCallback, useEffect } from "react";

import DynamicSettingTabs from "@components/DynamicSettingTabs";
import ReferralBlock from "@components/ReferralBlock";
import { useSettingsStore } from "@stores/SettingsStore";
import { useTelegramWebAppStore } from "@stores/TelegramWebAppStore";

import classes from "./styles.module.css";

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

const useShowBackButton = (shouldShow: boolean, hideOnUnmount = true) => {
  const webApp = useTelegramWebAppStore((store) => store.webApp);

  useEffect(() => {
    if (shouldShow) {
      webApp?.BackButton.show();
    } else {
      webApp?.BackButton.hide();
    }

    return () => {
      if (hideOnUnmount) {
        webApp?.BackButton.hide();
      }
    };
  }, [shouldShow, webApp, hideOnUnmount]);
};

const Settings = () => {
  const setCurrentTab = useSettingsStore((store) => store.setCurrentTab);
  const currentTab = useSettingsStore((store) => store.currentTab);

  useBackButtonHandler(() => setCurrentTab(null));
  useShowBackButton(currentTab !== null);

  return (
    <section className={classes.settings}>
      {currentTab === null && (
        <>
          <DynamicSettingTabs />
          <ReferralBlock />
        </>
      )}
    </section>
  );
};

export default Settings;
