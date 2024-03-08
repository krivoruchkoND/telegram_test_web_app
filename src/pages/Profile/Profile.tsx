import React from "react";
import { observer } from "mobx-react-lite";
import { useLocation, Link } from "wouter";
import { clsx } from "clsx";

import { useRootStore } from "@hooks/useRootStore";
import useCopyToClipboard from "@hooks/useCopyToClipboard";
import useShowBackButton from "@hooks/useBackButton";
import middleTrim from "@utils/middleTrim";
import PageTitle from "@components/PageTitle";
import ReferralBlock from "@components/ReferralBlock";
import copyIcon from "@assets/Copy.svg";
import arrowIcon from "@assets/ArrowRightLight.svg";

import classes from "./styles.module.css";

const InfoWithCopyButton: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  const [, copy] = useCopyToClipboard();

  const handleCopy = (value: string) => {
    copy(value)
      .then(() => {
        console.log("Copied!", value);
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  return (
    <>
      <div className={classes.title}>{title}</div>
      <button
        className={clsx(classes.value, classes.copyButton)}
        onClick={() => handleCopy(value)}
      >
        {middleTrim(value, 4, 4)}
        <div className={classes.icon}>
          <img src={copyIcon} alt="copy" />
        </div>
      </button>
    </>
  );
};

const Profile = () => {
  const [, setLocation] = useLocation();
  const isBackButtonSupported = useShowBackButton(() => setLocation("/"));

  const {
    profileSettingsStore: { publicAddress, createAt },
  } = useRootStore();

  return (
    <div className={classes.profile}>
      <PageTitle title="Profile" />
      <div className={classes.userInfo}>
        {publicAddress && (
          <div className={classes.infoContainer}>
            <InfoWithCopyButton title="Address" value={publicAddress} />
          </div>
        )}
        {createAt && (
          <div className={classes.infoContainer}>
            <div className={classes.title}>Registration Date</div>
            <div className={classes.value}>
              {new Intl.DateTimeFormat("en-US").format(new Date(createAt))}
            </div>
          </div>
        )}
      </div>
      <Link href="/profile/private_key" className={classes.button}>
        {/* extra div for easier positioning */}
        <div></div>
        <div className={classes.text}>SHOW MY PRIVATE KEY</div>
        <div className={classes.icon}>
          <img src={arrowIcon} alt="arrowRight" />
        </div>
      </Link>
      <ReferralBlock />
      {!isBackButtonSupported && <Link href="/">Go back</Link>}
    </div>
  );
};

export default observer(Profile);
