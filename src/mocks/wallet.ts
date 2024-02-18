import { type Token } from "@apis/wallet";

const mockValue: { total_value: number; tokens: Token[] } = {
  total_value: 1.308736748656447,
  tokens: [
    {
      id: "5KxnfDmsXVBNkVHYhW4kztV7ZCCCbrkYxBVrqLWF3G7J",
      market_cap: 581042.5069549171,
      value: 1.2897278616569157,
      initial: null,
      pnl: null,
      metadata: {
        name: "ROCK",
        symbol: "ROCK",
        description: "It's just a rock",
        uri: "https://gateway.irys.xyz/39U7lVZ9prvs4XCQkV1zWylqyIQ1uNSrjw84yXNmmqA",
        image_url:
          "https://gateway.irys.xyz/m0x31ZCuqG640Dvteo-GmiKaLvD7YvmLnV7WrT7Ugmo",
        is_mutable: false,
      },
    },
    {
      id: "WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk",
      market_cap: 75224155.41769873,
      value: 0.017775656495404375,
      initial: null,
      pnl: null,
      metadata: {
        name: "Wen",
        symbol: "WEN",
        description: null,
        uri: "https://qgp7lco5ylyitscysc2c7clhpxipw6sexpc2eij7g5rq3pnkcx2q.arweave.net/gZ_1id3C8InIWJC0L4lnfdD7ekS7xaIhPzdjDb2qFfU",
        image_url:
          "https://shdw-drive.genesysgo.net/GwJapVHVvfM4Mw4sWszkzywncUWuxxPd6s9VuFfXRgie/wen_logo.png",
        is_mutable: false,
      },
    },
    {
      id: "5z3EqYQo9HiCEs3R84RCDMu2n7anpDMxRhdK8PSWmrRC",
      market_cap: 23388551.1472813,
      value: 0.0012332305041269998,
      initial: null,
      pnl: null,
      metadata: {
        name: "PONKE",
        symbol: "PONKE",
        description: "HI IM PONKE",
        uri: "https://gateway.irys.xyz/S6nT0toKFAzwMJ7gm7Bh78tLTk9LeSGRjT2_1gp6otk",
        image_url:
          "https://gateway.irys.xyz/YBMDVBvnfgO1gXCSmmc8p0RQhc69WWe8_kOkoT8w7nE",
        is_mutable: true,
      },
    },
    {
      id: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      market_cap: 5035022529.539843,
      value: 0,
      initial: null,
      pnl: null,
      metadata: {
        name: "USD Coin",
        symbol: "USDC",
        description: null,
        uri: "",
        image_url: null,
        is_mutable: true,
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
