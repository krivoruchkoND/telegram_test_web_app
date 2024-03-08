import React from "react";

import RootStore from "@stores/RootStore";
import { RootStoreContext } from "@contexts/RootStoreContext";

export const useRootStore = () => {
  const context = React.useContext(RootStoreContext);

  if (context === undefined || context === null) {
    throw new Error("useRootStore must be used within a RootStoreProvider");
  }

  return context as RootStore;
};
