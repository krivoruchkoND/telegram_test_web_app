import { useEffect } from "react";

// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useTelegramWebAppStore } from "@/stores/TelegramWebAppStore";
import UserData from "@components/UserData";

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
    <main>
      {`WebApp is ${webApp ? "" : "not "}initialized 🎉!`}
      {webApp && <UserData />}
    </main>
  );
}

export default App;
