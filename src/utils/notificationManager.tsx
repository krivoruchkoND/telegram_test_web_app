import React from "react";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

import ToastCard from "@components/Toast";

export const showNotification = (
  props: React.ComponentProps<typeof ToastCard>,
) => toast(<ToastCard {...props} />);

export const NotificationContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
