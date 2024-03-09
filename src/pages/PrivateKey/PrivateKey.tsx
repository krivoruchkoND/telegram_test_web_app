import { observer } from "mobx-react-lite";
import { useLocation, Link } from "wouter";

import CopyButton from "@components/CopyButton";
import useShowBackButton from "@hooks/useBackButton";
import useRootStore from "@hooks/useRootStore";

import classes from "./styles.module.css";

const PrivateKey = () => {
  const [, setLocation] = useLocation();
  const {
    settingsStore: { privateKey },
  } = useRootStore();
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

export default observer(PrivateKey);
