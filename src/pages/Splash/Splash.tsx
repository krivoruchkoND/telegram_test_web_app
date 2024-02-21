import { useLocation } from "wouter";

import rockIcon from "@assets/RockGray.svg";
import { useAuthStore } from "@/stores/AuthStore";

import classes from "./styles.module.css";
import { useEffect } from "react";

const SPLASH_TIMEOUT = 1000;

const Splash = () => {
  const [, setLocation] = useLocation();
  const isAuthSucceed = useAuthStore((store) => store.isAuthSucceed);

  useEffect(() => {
    const redirect = () => {
      if (isAuthSucceed) {
        setLocation("/wallet");
      }
    };

    const timeout = setInterval(redirect, SPLASH_TIMEOUT);

    return () => clearInterval(timeout);
  }, [isAuthSucceed]);

  return (
    <div className={classes.splash}>
      <div className={classes.icon}>
        <img src={rockIcon} height="100%" width="100%" />
      </div>
      <div className={classes.title}>ROCKbot</div>
      <div className={classes.spinner} />
    </div>
  );
};

export default Splash;
