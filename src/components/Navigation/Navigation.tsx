import ActiveLink from "@components/ActiveLink";

import classes from "./styles.module.css";

const Navigation = () => {
  return (
    <nav className={classes.container}>
      <ActiveLink href="/wallet">Wallet</ActiveLink>
      <ActiveLink href="/settings">Settings</ActiveLink>
      <ActiveLink href="/swaps">Swaps</ActiveLink>
      <ActiveLink href="/trades">Trades</ActiveLink>
    </nav>
  );
};

export default Navigation;
