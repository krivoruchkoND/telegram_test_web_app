import camelcaseKeys from "camelcase-keys";

// import { mockResponse } from "@mocks/swaps";
import baseInstance from "./baseInstance";

type Address = {
  address: string;
  amount: number;
  name?: string;
  symbol?: string;
  image_url?: string;
};

export type Swap = {
  id: string;
  type: "swapped" | "send" | "received";
  datetime: string;
  from_address: Address;
  to_address: Address;
};

export const getSwaps = async (params: { page: number; size: number }) => {
  const response = await baseInstance.get<{
    swaps: Swap[];
  }>(`/swaps/all`, { params });

  // const responseMock = await mockResponse;

  return camelcaseKeys(response.data, { deep: true });
};
