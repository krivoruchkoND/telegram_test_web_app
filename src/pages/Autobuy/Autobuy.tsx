import { useLocation, Link } from "wouter";

import useShowBackButton from "@hooks/useBackButton";

const Autobuy = () => {
  const [, setLocation] = useLocation();
  const isBackButtonSupported = useShowBackButton(() => setLocation("/"));

  return (
    <div>
      <div>Autobuy</div>
      {!isBackButtonSupported && <Link href="/">Go back</Link>}
    </div>
  );
};

export default Autobuy;
