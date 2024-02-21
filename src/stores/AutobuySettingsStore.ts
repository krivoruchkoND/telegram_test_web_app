import { create } from "zustand";

import { initializer } from "@utils/commonSettingsSectionStores";

export const useAutobuySettingsStore = create(initializer);
