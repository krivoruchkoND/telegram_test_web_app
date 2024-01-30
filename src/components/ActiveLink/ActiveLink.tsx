import { Link, LinkProps, useRoute } from "wouter";
import { clsx } from "clsx";

import classes from "./styles.module.css";

type Props = {
  children: React.ReactNode;
};

const ActiveLink: React.FC<Props & LinkProps> = ({
  children,
  ...linkProps
}) => {
  const [isActive] = useRoute(linkProps.href || "");
  return (
    <Link
      className={clsx(isActive && classes.active, classes.link)}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
