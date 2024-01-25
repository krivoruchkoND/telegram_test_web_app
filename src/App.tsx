import { useEffect } from "react";

// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useTelegramWebAppStore } from "@/stores/TelegramWebAppStore";
import UserData from "@components/UserData";

import "./App.css";

function App() {
  const webApp = useTelegramWebAppStore((state) => state.webApp);
  const setWebApp = useTelegramWebAppStore((state) => state.setWebApp);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Checking if WebApp is initialized...");
      if (Telegram?.WebApp) {
        setWebApp(Telegram.WebApp);
        clearInterval(timer);
      }
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {`WebApp is ${webApp ? "" : "not "}initialized 🎉`}
      {webApp && <UserData />}
    </div>
  );
}

export default App;
