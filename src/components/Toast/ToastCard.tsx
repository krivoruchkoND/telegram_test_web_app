import { FC } from "react";
import classes from "./styles.module.css";
import clsx from "clsx";
import { useLocation } from "wouter";

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
  const [, setLocation] = useLocation();

  const handleClick = () => {
    if (link) {
      setLocation(link);
    }
  };

  return (
    <button
      onClick={handleClick}
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
