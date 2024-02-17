import React from "react";

import classes from "./styles.module.css";

type Props = {
  title: string;
};

const PageTitle: React.FC<Props> = ({ title }) => {
  return <h2 className={classes.pageTitle}>{title}</h2>;
};

export default PageTitle;
