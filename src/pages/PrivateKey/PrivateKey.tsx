import { useLocation, Link } from "wouter";

import CopyButton from "@/components/CopyButton";
import useShowBackButton from "@hooks/useBackButton";

import classes from "./styles.module.css";
import { useSettingsStore } from "@/stores/SettingsStore";

const PrivateKey = () => {
  const [, setLocation] = useLocation();
  const privateKey = useSettingsStore((state) => state.privateKey);
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
      {privateKey && <CopyButton value={privateKey} />}
      {!isBackButtonSupported && <Link href="/profile">Go back</Link>}
    </div>
  );
};

export default PrivateKey;
