import { useTelegramWebAppStore } from "@/stores/TelegramWebAppStore";

const UserData = () => {
  const webApp = useTelegramWebAppStore((state) => state.webApp);
  const { initData, initDataUnsafe } = webApp || {};
  return (
    <div>
      <h3>User Data</h3>
      <pre>initData: {JSON.stringify(initData, null, 2)}</pre>
      <pre>initDataUnsafe: {JSON.stringify(initDataUnsafe, null, 2)}</pre>
    </div>
  );
};

export default UserData;
