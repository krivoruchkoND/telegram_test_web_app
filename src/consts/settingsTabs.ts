export const tabs = [
  {
    id: "profile",
    label: "Profile",
    description: "Main bot configurable parameters",
    iconColor: "gray",
  },
  {
    id: "autobuy",
    label: "Auto buy",
    description: "Immediately buy when pasting token address",
    iconColor: "green",
    enableOptionLKey: "AutoBuy" as const,
  },
  {
    id: "snipper",
    label: "Sniper TG channel",
    description: "Snipe TG channels calls",
    iconColor: "blue",
    enableOptionLKey: "Sniper" as const,
  },
];

export type Tab = (typeof tabs)[number];
