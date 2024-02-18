import { type Settings } from "@apis/settings";

const mockValue: Settings = {
  notification: true,
  buying_info_auto: {
    repeat_transaction: 0,
    amount: 0.5,
    slippage: 0.3,
    from_token: "So11111111111111111111111111111111111111112",
    compute_unit_limit: 1400000,
    compute_unit_price: 5000,
  },
  buying_info_sniper: {
    repeat_transaction: 0,
    amount: 0.5,
    slippage: 0.3,
    from_token: "So11111111111111111111111111111111111111112",
    compute_unit_limit: 1400000,
    compute_unit_price: 5000,
  },
};

export const mockResponse = new Promise<{ data: typeof mockValue }>(
  (resolve) => {
    setTimeout(() => {
      resolve({ data: mockValue });
    }, 1000);
  },
);
