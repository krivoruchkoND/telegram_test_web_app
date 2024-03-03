import React, { PropsWithChildren } from "react";
import classes from "./styles.module.css";
import { clsx } from "clsx";

type Props = {
  type?: "submit" | "reset" | "button";
  className?: string;
} & React.HTMLProps<HTMLButtonElement>;

const PrimaryButton: React.FC<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(classes.primary_button, props.className)}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
