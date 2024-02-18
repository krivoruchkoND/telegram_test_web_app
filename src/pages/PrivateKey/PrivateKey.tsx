import { useLocation, Link } from "wouter";
import { nanoid } from "nanoid";

import CopyButton from "@/components/CopyButton";
import useShowBackButton from "@hooks/useBackButton";

import classes from "./styles.module.css";

const USER_ID = nanoid(24);

const PrivateKey = () => {
  const [, setLocation] = useLocation();
  const isBackButtonSupported = useShowBackButton(() =>
    setLocation("/profile"),
  );

  return (
    <div className={classes.privateKey}>
      <div className={classes.content}>
        <div>
          The private key is your confidential secret. Do not share it with
          anyone.
        </div>
        <div className={classes.normal}>
          The private key grants full control over your wallet. This sensitive
          information should never be shared with strangers.
        </div>
      </div>
      <CopyButton value={`${USER_ID}${USER_ID}${USER_ID}`} />
      {!isBackButtonSupported && <Link href="/profile">Go back</Link>}
    </div>
  );
};

export default PrivateKey;
