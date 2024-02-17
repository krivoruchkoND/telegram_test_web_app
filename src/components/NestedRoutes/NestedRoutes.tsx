import React from "react";
import { Router, useRouter, useLocation } from "wouter";

type Props = {
  base: string;
  children: React.ReactNode;
};

const NestedRoutes: React.FC<Props> = ({ base, children }) => {
  const router = useRouter();
  const [location] = useLocation();

  if (!location.startsWith(base)) return null;

  return (
    <Router base={base} key={base} parent={router}>
      {children}
    </Router>
  );
};

export default NestedRoutes;
