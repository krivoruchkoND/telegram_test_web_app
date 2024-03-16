import { IMask } from "react-imask";

class NullableMaskedNumber extends IMask.MaskedNumber {
  // @ts-expect-error: extend Number mask with null value
  get typedValue() {
    return this.unmaskedValue !== "" ? super.typedValue : null;
  }

  // @ts-expect-error: extend Number mask with null value
  set typedValue(num) {
    // @ts-expect-error: extend Number mask with null value
    super.typedValue = num;
  }
}

const emptyMask = {
  mask: "",
};

const floatMask = new NullableMaskedNumber({
  mask: Number,
  radix: ".",
  mapToRadix: [","],
  scale: 10,
  thousandsSeparator: " ",
});

const decimalMask = new NullableMaskedNumber({
  mask: Number,
  radix: ".",
  mapToRadix: [","],
  scale: 0,
  thousandsSeparator: " ",
});

const percentMask = {
  mask: "d %",
  lazy: false,
  blocks: {
    d: new NullableMaskedNumber({
      mask: Number,
      scale: 5,
      radix: ".",
      mapToRadix: [","],
    }),
  },
};

const solMask = {
  mask: "d SOL",
  lazy: false,
  blocks: {
    d: new NullableMaskedNumber({
      mask: Number,
      scale: 8,
      radix: ".",
      mapToRadix: [","],
      thousandsSeparator: " ",
    }),
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
