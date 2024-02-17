import { useLocation, Link } from "wouter";

import useShowBackButton from "@hooks/useBackButton";
const Snipper = () => {
  const [, setLocation] = useLocation();
  const isBackButtonSupported = useShowBackButton(() => setLocation("/"));

  return (
    <div>
      <div>Snipper</div>
      {!isBackButtonSupported && <Link href="/">Go back</Link>}
    </div>
  );
};

export default Snipper;
