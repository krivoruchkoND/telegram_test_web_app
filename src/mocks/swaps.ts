import { type Swap } from "@apis/swaps";

export const swapsMock: { swaps: Swap[] } = {
  swaps: [
    {
      id: "5LzCUKcJTuQgtK5heaJx8c347uyEKfLoa3iGb5mbfiPurqpQtE45UgGT68s9nwC6t14Ey9FyDYSwfkox5rcMBEQA",
      type: "swapped",
      datetime: "2024-03-02T15:13:12.963000",
      from_address: {
        address: "So11111111111111111111111111111111111111112",
        amount: 0.001,
        image_url:
          "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png",
        name: "Solana",
        symbol: "SOL",
      },
      to_address: {
        address: "5KxnfDmsXVBNkVHYhW4kztV7ZCCCbrkYxBVrqLWF3G7J",
        amount: 60848805.6324,
        image_url:
          "https://gateway.irys.xyz/m0x31ZCuqG640Dvteo-GmiKaLvD7YvmLnV7WrT7Ugmo",
        name: "ROCK",
        symbol: "ROCK",
      },
    },
  ],
};
