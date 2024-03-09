import { FC, HTMLProps, PropsWithChildren } from "react";
import { clsx } from "clsx";
import classes from "./styles.module.css";

export type Props = {
  className?: string;
  type?: "submit" | "reset" | "button";
} & HTMLProps<HTMLButtonElement>;

const TransactionButton: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={clsx(className, classes.transaction_button)} {...props}>
      {children}
    </button>
  );
};

export default TransactionButton;
