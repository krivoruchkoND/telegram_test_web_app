import { nanoid } from "nanoid";

import getRandomArbitrary from "./getRandomInRange";
import randomNameGenerator from "./randomNameGenerator";

const walletTransactionsGenerator = () => {
  const count = Number(getRandomArbitrary(4, 5, 0));

  const transactions = Array.from({ length: count }, (_, i) => i).map(() => {
    const initial = Number(getRandomArbitrary(10, 100));
    const delta = Number(getRandomArbitrary(-5, 5));
    const value = Number(getRandomArbitrary(initial - delta, initial + delta));
    const PNL = value - initial;
    const PNLPercent = (PNL / initial) * 100;
    const name = randomNameGenerator();

    const coinCap = Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(Number(getRandomArbitrary(1000, 10e6)));

    return {
      id: nanoid(8),
      initial,
      value,
      PNL: Number(PNL.toFixed(2)),
      PNLPercent: PNLPercent.toFixed(2),
      name,
      coinCap,
    };
  });

  return transactions;
};

export default walletTransactionsGenerator;
