import { useLocation, Link } from "wouter";
import { nanoid } from "nanoid";
import { clsx } from "clsx";

import useCopyToClipboard from "@hooks/useCopyToClipboard";
import useShowBackButton from "@hooks/useBackButton";
import middleTrim from "@utils/middleTrim";
import PageTitle from "@components/PageTitle";
import ReferralBlock from "@components/ReferralBlock";
import copyIcon from "@assets/Copy.svg";
import arrowIcon from "@assets/ArrowRightLight.svg";

import classes from "./styles.module.css";

const USER_ID = nanoid(24);

const UserIdButton = () => {
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
    <button
      className={clsx(classes.value, classes.copyButton)}
      onClick={handleCopy}
    >
      {middleTrim(USER_ID, 4, 4)}
      <div className={classes.icon}>
        <img src={copyIcon} />
      </div>
    </button>
  );
};

const Profile = () => {
  const [, setLocation] = useLocation();
  const isBackButtonSupported = useShowBackButton(() => setLocation("/"));

  return (
    <div className={classes.profile}>
      <PageTitle title="Profile" />
      <div className={classes.userInfo}>
        <div className={classes.infoContainer}>
          <div className={classes.title}>Address</div>
          <UserIdButton />
        </div>
        <div className={classes.infoContainer}>
          <div className={classes.title}>Registration Date</div>
          <div className={classes.value}>
            {new Intl.DateTimeFormat("en-US").format(new Date())}
          </div>
        </div>
      </div>
      <Link href="/profile/private_key" className={classes.button}>
        <div></div>
        <div className={classes.text}>SHOW MY PRIVATE KEY</div>
        <div className={classes.icon}>
          <img src={arrowIcon} />
        </div>
      </Link>
      <ReferralBlock />
      {!isBackButtonSupported && <Link href="/">Go back</Link>}
    </div>
  );
};

export default Profile;
