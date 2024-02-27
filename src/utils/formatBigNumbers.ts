const toFixed = (value: number, fraction: number) => {
  const isDecimal = value % 1 !== 0;

  if (isDecimal) {
    return value.toFixed(fraction);
  }

  return value.toFixed(0);
};
const formatBugNumbers = (value: number) => {
  const absValue = Math.abs(value);

  if (absValue === 0) {
    return 0;
  }

  if (absValue < 0.0001) {
    return toFixed(value, 6);
  }

  if (absValue < 0.001) {
    return toFixed(value, 4);
  }

  if (absValue < 1000) {
    return toFixed(value, 2);
  }

  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

export default formatBugNumbers;
