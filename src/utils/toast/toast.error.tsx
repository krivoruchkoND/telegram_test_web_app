import React from "react";
import { toast } from "react-toastify";

import ErrorToast from "@components/ErrorToast";

export const toastError = (props: React.ComponentProps<typeof ErrorToast>) => {
  toast(<ErrorToast {...props} />);
};
