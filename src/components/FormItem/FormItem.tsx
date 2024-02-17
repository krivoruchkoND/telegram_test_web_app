import React, { useRef } from "react";
import { IMaskInput } from "react-imask";

import Switch from "@components/Switch";

import classes from "./styles.module.css";

type Props = {
  id: string;
  disabled?: boolean;
  label: string;
  description: string;
  switchProps?: Omit<React.ComponentProps<typeof Switch>, "id" | "label">;
};

const FormItem: React.FC<Props> = ({
  id,
  disabled,
  label,
  description,
  switchProps,
}) => {
  const ref = useRef(null);
  const inputRef = useRef(null);

  return (
    <div className={classes.formItem}>
      {switchProps ? (
        <Switch id={`${id}-toggle`} label={label} {...switchProps} />
      ) : (
        <div className={classes.label}>{label}</div>
      )}
      <div className={classes.inputWrapper}>
        <IMaskInput
          ref={ref}
          inputRef={inputRef}
          placeholder="Enter number here"
          className={classes.input}
          disabled={disabled}
        />
        <div className={classes.description}>{description}</div>
      </div>
    </div>
  );
};

export default FormItem;
