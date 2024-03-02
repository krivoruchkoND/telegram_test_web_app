import { type Swap } from "@apis/swaps";

export const mockValue: { swaps: Swap[] } = {
  swaps: [
    {
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

export const mockResponse = new Promise<{ data: typeof mockValue }>(
  (resolve) => {
    setTimeout(() => {
      resolve({ data: mockValue });
    }, 1000);
  },
);
