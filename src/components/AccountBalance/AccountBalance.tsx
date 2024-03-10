import { observer } from "mobx-react-lite";

import useRootStore from "@hooks/useRootStore";
import useCopyToClipboard from "@hooks/useCopyToClipboard";
import middleTrim from "@utils/middleTrim";
import Spinner from "@components/Spinner";
import formatNumber from "@utils/formatNumber";
import copyIcon from "@assets/Copy.svg";
import coinIcon from "@assets/Coin.svg";
import referIcon from "@assets/ReferArrow.svg";

import classes from "./styles.module.css";

const AccountBalance = () => {
  const {
    profileSettingsStore: { publicAddress, referral },
    walletStore: { totalValue, isLoading },
  } = useRootStore();

  const [, copy] = useCopyToClipboard();

  const handleCopy = (value: string | null) => {
    if (value === null) {
      return;
    }

    copy(value)
      .then(() => {
        console.log("Copied!", value);
      })
      .catch((error) => {
        console.error("🚨 Failed to copy!", error);
      });
  };

  if (isLoading.getTokens) {
    return (
      <section className={classes.account}>
        <Spinner height={120} width={120} />
      </section>
    );
  }

  return (
    <section className={classes.account}>
      {publicAddress && (
        <button
          className={classes.id}
          onClick={() => handleCopy(publicAddress)}
        >
          {middleTrim(publicAddress, 4, 4)}
          <div className={classes.icon}>
            <img src={copyIcon} alt="copy" />
          </div>
        </button>
      )}

      <div className={classes.balance}>
        {totalValue && formatNumber(totalValue, 9, 3)}
        <div className={classes.icon}>
          <img src={coinIcon} alt="sol_coin" />
        </div>
      </div>

      {referral?.url && (
        <button
          className={classes.referButton}
          onClick={() => handleCopy(referral.url)}
        >
          <span className={classes.text}>Refer friends</span>
          <div className={classes.icon}>
            <img src={referIcon} alt="referral" />
          </div>
        </button>
      )}
    </section>
  );
};

export default observer(AccountBalance);
