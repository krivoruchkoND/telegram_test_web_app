import rockVioletIcon from "@assets/RockViolet.svg";
import CopyButton from "@components/CopyButton";
import { useProfileSettingsStore } from "@stores/ProfileSettingsStore";

import classes from "./styles.module.css";

const ReferralBlock = () => {
  const referral = useProfileSettingsStore((state) => state.referral);

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
        <span className={classes.value}>{referral.inviteesCount}</span>
      </div>
      <div className={classes.counter}>
        <span className={classes.title}>$ROCK earned: </span>
        <span className={classes.value}>
          {referral.reward}
          {/* (${referral.dollarReward}) */}
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
      {referral?.url && <CopyButton value={referral.url} />}
    </div>
  );
};

export default ReferralBlock;
