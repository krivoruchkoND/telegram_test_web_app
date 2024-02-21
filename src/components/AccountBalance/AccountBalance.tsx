import { useWalletStore } from "@stores/WalletStore";
import { useProfileSettingsStore } from "@stores/ProfileSettingsStore";

import useCopyToClipboard from "@hooks/useCopyToClipboard";
import middleTrim from "@utils/middleTrim";
import copyIcon from "@assets/Copy.svg";
import coinIcon from "@assets/Coin.svg";
import referIcon from "@assets/ReferArrow.svg";

import classes from "./styles.module.css";

const AccountBalance = () => {
  const publicAddress = useProfileSettingsStore((state) => state.publicAddress);
  const referralUrl = useProfileSettingsStore((state) => state.referral.url);
  const totalValue = useWalletStore((state) => state.totalValue);

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
        {totalValue.toFixed(5)}
        <div className={classes.icon}>
          <img src={coinIcon} alt="sol_coin" />
        </div>
      </div>

      {referralUrl && (
        <button
          className={classes.referButton}
          onClick={() => handleCopy(referralUrl)}
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

export default AccountBalance;
