import { FC } from "react";
import clsx from "clsx";

import classes from "./styles.module.css";

type Props = {
  title?: string;
  message: string;
  type: "error" | "success";
  link?: string;
};

const ToastCard: FC<Props> = ({
  title = "Unknown error",
  message,
  type,
  link,
}) => {
  const handleRedirect = () => {
    if (link) {
      window?.open(link, "_blank");
    }
  };

  return (
    <button
      onClick={handleRedirect}
      disabled={!link}
      className={clsx(
        classes.toastCard,
        type === "error" && classes.error,
        type === "success" && classes.success,
      )}
    >
      <h6 className={classes.toastTitle}>{`ERROR: ${title}`}</h6>
      {message && <p className={classes.toastMessage}>{message}</p>}
    </button>
  );
};

export default ToastCard;
