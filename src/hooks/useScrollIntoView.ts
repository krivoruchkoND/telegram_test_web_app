import { useEffect, RefObject } from "react";
const useScrollIntoView = <T extends HTMLElement>(ref: RefObject<T>) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, []);
};

export default useScrollIntoView;
