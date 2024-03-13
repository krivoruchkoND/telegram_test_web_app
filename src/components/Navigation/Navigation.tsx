import homeIcon from "@assets/Home.svg";
import homeActiveIcon from "@assets/HomeActive.svg";
import cogIcon from "@assets/Cog.svg";
import cogActiveIcon from "@assets/CogActive.svg";
import arrowsIcon from "@assets/Arrows.svg";
import arrowsActiveIcon from "@assets/ArrowsActive.svg";
import dollarIcon from "@assets/Dollar.svg";
import dollarActiveIcon from "@assets/DollarActive.svg";
import rockIcon from "@assets/RockGray.svg";

import NavigationItem from "./components/NavigationItem";

import classes from "./styles.module.css";

const Navigation = () => {
  return (
    <div className={classes.wrapper}>
      <nav className={classes.navigation}>
        <NavigationItem
          href="/wallet"
          title="Wallet"
          icon={homeIcon}
          activeIcon={homeActiveIcon}
        />
        <NavigationItem
          href="/settings"
          title="Settings"
          icon={cogIcon}
          activeIcon={cogActiveIcon}
        />
        <div className={classes.icon}>
          <img src={rockIcon} />
        </div>
        <NavigationItem
          href="/swaps"
          title="Transactions"
          icon={arrowsIcon}
          activeIcon={arrowsActiveIcon}
        />
        <NavigationItem
          href="/trades"
          title="Trades"
          icon={dollarIcon}
          activeIcon={dollarActiveIcon}
        />
      </nav>
    </div>
  );
};

export default Navigation;
