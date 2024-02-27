const emptyMask = {
  mask: "",
};

const floatMask = {
  mask: Number,
  radix: ".",
  mapToRadix: [","],
  scale: 5,
  thousandsSeparator: " ",
};

const decimalMask = {
  mask: Number,
  radix: ".",
  mapToRadix: [","],
  scale: 0,
  thousandsSeparator: " ",
};

const percentMask = {
  mask: "d %",
  lazy: false,
  blocks: {
    d: {
      mask: Number,
      scale: 5,
      radix: ".",
      mapToRadix: [","],
    },
  },
};

const solMask = {
  mask: "d SOL",
  lazy: false,
  blocks: {
    d: {
      mask: Number,
      scale: 8,
      radix: ".",
      mapToRadix: [","],
      thousandsSeparator: " ",
    },
  },
};

const maskMap = {
  empty: emptyMask,
  percent: percentMask,
  float: floatMask,
  decimal: decimalMask,
  sol: solMask,
};

export default maskMap;
