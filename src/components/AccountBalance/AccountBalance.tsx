import { nanoid } from "nanoid";

import useCopyToClipboard from "@hooks/useCopyToClipboard";
import middleTrim from "@utils/middleTrim";
import copyIcon from "@assets/Copy.svg";
import coinIcon from "@assets/Coin.svg";
import referIcon from "@assets/ReferArrow.svg";

import classes from "./styles.module.css";
import getRandomArbitrary from "@/utils/getRandomInRange";

const USER_ID = nanoid(24);
const USER_BALANCE = getRandomArbitrary(0, 1000);

const AccountBalance = () => {
  const [, copy] = useCopyToClipboard();

  const handleCopy = () => {
    copy(USER_ID)
      .then(() => {
        console.log("Copied!", { USER_ID });
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  return (
    <section className={classes.account}>
      <button className={classes.id} onClick={handleCopy}>
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
