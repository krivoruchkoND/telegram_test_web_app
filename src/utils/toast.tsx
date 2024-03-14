import React from "react";
import { toast as toastDefault } from "react-toastify";

import ToastCard from "@components/Toast";

export const toast = (props: React.ComponentProps<typeof ToastCard>) => {
  toastDefault(<ToastCard {...props} />);
};
