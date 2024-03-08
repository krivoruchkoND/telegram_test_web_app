import { observer } from "mobx-react-lite";

import { useRootStore } from "@hooks/useRootStore";

const UserData = () => {
  const {
    telegramWebAppStore: { webApp },
  } = useRootStore();
  const { initData, initDataUnsafe } = webApp || {};

  return (
    <div>
      <h3>User Data</h3>
      <pre>initData: {JSON.stringify(initData, null, 2)}</pre>
      <pre>initDataUnsafe: {JSON.stringify(initDataUnsafe, null, 2)}</pre>
    </div>
  );
};

export default observer(UserData);
