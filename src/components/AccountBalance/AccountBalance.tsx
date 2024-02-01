import { nanoid } from "nanoid";

import middleTrim from "@utils/middleTrim";
import copyIcon from "@assets/copy.svg";
import coinIcon from "@assets/coin.svg";
import referIcon from "@assets/referArrow.svg";

import classes from "./styles.module.css";
import getRandomArbitrary from "@/utils/getRandomInRange";

const USER_ID = nanoid(24);
const USER_BALANCE = getRandomArbitrary(0, 1000);

const AccountBalance = () => {
  return (
    <section className={classes.account}>
      <button className={classes.id}>
        {middleTrim(USER_ID, 4, 4)}
        <div className={classes.icon}>
          <img src={copyIcon} />
        </div>
      </button>

      <div className={classes.balance}>
        {USER_BALANCE}
        <div className={classes.icon}>
          <img src={coinIcon} />
        </div>
      </div>

      <button className={classes.referButton}>
        <span className={classes.text}>Refer friends</span>
        <div className={classes.icon}>
          <img src={referIcon} />
        </div>
      </button>
    </section>
  );
};

export default AccountBalance;
