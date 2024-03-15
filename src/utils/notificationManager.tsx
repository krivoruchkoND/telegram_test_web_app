import React from "react";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

import ToastCard from "@components/Toast";
import classes from "@components/Toast/styles.module.css";

export const showNotification = (
  props: React.ComponentProps<typeof ToastCard>,
) => toast(<ToastCard {...props} />);

export const NotificationContainer = () => {
  return (
    <ToastContainer
      position={"bottom-center"}
      toastClassName={classes.toast}
      className={classes.toastContainer}
      closeButton={false}
      autoClose={3000}
      hideProgressBar
      newestOnTop
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
