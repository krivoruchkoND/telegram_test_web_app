import { type Swap } from "@apis/swaps";

export const swapsMock: { swaps: Swap[] } = {
  swaps: [
    {
      id: "1",
      type: "send",
      datetime: "2024-03-02T12:04:47.087Z",
      from_address: {
        address: "string",
        amount: 0,
        name: "string",
        // uri: "string",
      },
      to_address: {
        address: "string",
        amount: 0,
        name: "string",
        // uri: "string",
      },
    },
    {
      id: "2",
      type: "swapped",
      datetime: "2024-03-02T12:04:45.087Z",
      from_address: {
        address: "string",
        amount: 0,
        name: "string",
        // uri: "string",
      },
      to_address: {
        address: "string",
        amount: 0,
        name: "string",
        // uri: "string",
      },
    },
    {
      id: "3",
      type: "swapped",
      datetime: "2024-03-02T12:04:43.087Z",
      from_address: {
        address: "string",
        amount: 0,
        name: "string",
        // uri: "string",
      },
      to_address: {
        address: "string",
        amount: 0,
        name: "string",
        // uri: "string",
      },
    },
  ],
};
