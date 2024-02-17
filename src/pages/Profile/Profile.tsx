import { useLocation, Link } from "wouter";

import useShowBackButton from "@hooks/useBackButton";

const Profile = () => {
  const [, setLocation] = useLocation();
  const isBackButtonSupported = useShowBackButton(() => setLocation("/"));

  return (
    <div>
      <div>Profile</div>
      {!isBackButtonSupported && <Link href="/">Go back</Link>}
    </div>
  );
};

export default Profile;
