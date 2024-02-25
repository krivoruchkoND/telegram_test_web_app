import React from "react";
import { Link, useRoute } from "wouter";
import { clsx } from "clsx";

import classes from "../styles.module.css";

type ItemProps = {
  title: string;
  icon: string;
  activeIcon: string;
  href: string;
};

const NavigationItem: React.FC<ItemProps> = ({
  title,
  icon,
  activeIcon,
  href,
}) => {
  const [isActive] = useRoute(`${href}/*?`);
  const iconSrc = isActive ? activeIcon : icon;

  return (
    <Link href={href} className={classes.navigationItem}>
      <div className={classes.icon}>
        <img src={iconSrc} />
      </div>
      <span className={clsx(classes.title, isActive && classes.active)}>
        {title}
      </span>
    </Link>
  );
};

export default NavigationItem;
