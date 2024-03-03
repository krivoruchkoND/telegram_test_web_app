import { type Swap } from "@stores/SwapsStore";

const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value);

const combineSwapsByDay = (swaps: Swap[]) => {
  return swaps.reduce(
    (acc, swap) => {
      const date = new Date(swap.datetime);
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
    {} as Record<string, Swap[]>,
  );
};

export default combineSwapsByDay;
