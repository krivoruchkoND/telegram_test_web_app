import { type Token } from "@apis/wallet";

const mockValue: { total_value: number; tokens: Token[] } = {
  total_value: 1.308736748656447,
  tokens: [
    {
      id: "5KxnfDmsXVBNkVHYhW4kztV7ZCCCbrkYxBVrqLWF3G7J",
      market_cap: 581042.5069549171,
      value: 1.2897278616569157,
      amount: null,
      pnl: null,
      metadata: {
        name: "ROCK",
        symbol: "ROCK",
        description: "It's just a rock",
        image_url:
          "https://gateway.irys.xyz/m0x31ZCuqG640Dvteo-GmiKaLvD7YvmLnV7WrT7Ugmo",
      },
    },
    {
      id: "WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk",
      market_cap: 75224155.41769873,
      value: 0.017775656495404375,
      amount: null,
      pnl: null,
      metadata: {
        name: "Wen",
        symbol: "WEN",
        description: null,
        image_url:
          "https://shdw-drive.genesysgo.net/GwJapVHVvfM4Mw4sWszkzywncUWuxxPd6s9VuFfXRgie/wen_logo.png",
      },
    },
    {
      id: "5z3EqYQo9HiCEs3R84RCDMu2n7anpDMxRhdK8PSWmrRC",
      market_cap: 23388551.1472813,
      value: 0.0012332305041269998,
      amount: null,
      pnl: null,
      metadata: {
        name: "PONKE",
        symbol: "PONKE",
        description: "HI IM PONKE",
        image_url:
          "https://gateway.irys.xyz/YBMDVBvnfgO1gXCSmmc8p0RQhc69WWe8_kOkoT8w7nE",
      },
    },
    {
      id: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      market_cap: 5035022529.539843,
      value: 0,
      amount: null,
      pnl: null,
      metadata: {
        name: "USD Coin",
        symbol: "USDC",
        description: null,
        image_url: null,
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
