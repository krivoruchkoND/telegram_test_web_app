import { nanoid } from "nanoid";

import getRandomArbitrary from "./getRandomInRange";
import randomNameGenerator from "./randomNameGenerator";

const swapTypes = ["swapped", "sent", "received"] as const;

const generateSwappedType = () => {
  const value1 = Number(getRandomArbitrary(-1000, 1000));
  const value2 = Number(
    value1 < 0 ? getRandomArbitrary(0, 100) : getRandomArbitrary(-100, 0),
  );

  return {
    type: "swapped",
    from: {
      amount: value1,
      currency: randomNameGenerator().slice(0, 3).toUpperCase(),
    },
    to: {
      amount: value2,
      currency: randomNameGenerator().slice(0, 3).toUpperCase(),
    },
  };
};

const generateSentType = () => {
  return {
    type: "sent",
    to: randomNameGenerator(),
    amount: Number(getRandomArbitrary(-100, 0)),
    currency: randomNameGenerator().slice(0, 3).toUpperCase(),
  };
};

const generateReceivedType = () => {
  return {
    type: "received",
    from: randomNameGenerator(),
    amount: Number(getRandomArbitrary(0, 100)),
    currency: randomNameGenerator().slice(0, 3).toUpperCase(),
  };
};

const mapTypeToGenerator = {
  swapped: generateSwappedType,
  sent: generateSentType,
  received: generateReceivedType,
};

export const swapsGenerator = () => {
  const count = Number(getRandomArbitrary(7, 15, 0));

  let prevDate = new Date();
  return Array.from({ length: count }, (_, i) => i).map((_, i) => {
    const type = swapTypes[Math.floor(Math.random() * swapTypes.length)];

    const date = new Date(prevDate);
    date.setDate(date.getDate() - Number(getRandomArbitrary(0, i + 1, 0)));
    prevDate = date;

    return {
      id: nanoid(8),
      date: date.toISOString(),
      ...mapTypeToGenerator[type](),
    };
  });
};

const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value);

export const combineSwapsByDay = (swaps: ReturnType<typeof swapsGenerator>) => {
  return swaps.reduce(
    (acc, swap) => {
      const date = new Date(swap.date);
      const year = date.getFullYear();
      const month = addLeadingZero(date.getMonth() + 1);
      const day = addLeadingZero(date.getDate());
      const formattedDate = `${year}-${month}-${day}`;
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(swap);
      return acc;
    },
    {} as Record<string, ReturnType<typeof swapsGenerator>>,
  );
};

export type Swapped = ReturnType<typeof generateSwappedType>;
export type Sent = ReturnType<typeof generateSentType>;
export type Received = ReturnType<typeof generateReceivedType>;
