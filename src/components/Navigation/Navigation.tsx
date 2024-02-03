import homeIcon from "@assets/home.svg";
import homeActiveIcon from "@assets/homeActive.svg";
import cogIcon from "@assets/cog.svg";
import cogActiveIcon from "@assets/cogActive.svg";
import arrowsIcon from "@assets/arrows.svg";
import arrowsActiveIcon from "@assets/arrowsActive.svg";
import dollarIcon from "@assets/dollar.svg";
import dollarActiveIcon from "@assets/dollarActive.svg";
import rockIcon from "@assets/rock.svg";

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
          title="Swaps"
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
