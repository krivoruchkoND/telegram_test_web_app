import rockVioletIcon from "@assets/RockViolet.svg";
import CopyButton from "@components/CopyButton";

import classes from "./styles.module.css";

const mock = {
  referralsCount: 2,
  rockEarned: "13.37K",
  dollarEarned: "0.12",
  referralLink: "https://t.me/rockbot?start=ref_mrct",
};

const ReferralBlock = () => {
  return (
    <div className={classes.referral}>
      <div className={classes.title}>
        <div className={classes.icon}>
          <img src={rockVioletIcon} />
        </div>
        <div className={classes.text}>Referral system</div>
      </div>
      <div className={classes.counter}>
        <span className={classes.title}>Referrals: </span>
        <span className={classes.value}>{mock.referralsCount}</span>
      </div>
      <div className={classes.counter}>
        <span className={classes.title}>$ROCK earned: </span>
        <span className={classes.value}>
          {mock.rockEarned} (${mock.dollarEarned})
        </span>
      </div>
      <div className={classes.description}>
        <p>
          Rewards are updated at least every 24 hours and rewards are
          automatically deposited to your ROCK balance.
        </p>
        <p>
          Refer your friends and earn 30% of their fees in the first month. 20%
          in the second and 10% forever!
        </p>
      </div>
      <CopyButton value={mock.referralLink} />
    </div>
  );
};

export default ReferralBlock;
