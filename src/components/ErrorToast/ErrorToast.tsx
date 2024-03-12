import { FC } from "react";
import classes from "./styles.module.css";

type Props = {
  title?: string;
  message: string;
};

const ToastError: FC<Props> = ({ title = "Unknown error", message }) => {
  return (
    <div className={classes.toastError}>
      <h6 className={classes.toastTitle}>{`ERROR: ${title}`}</h6>
      {message && <p className={classes.toastMessage}>{message}</p>}
    </div>
  );
};

export default ToastError;