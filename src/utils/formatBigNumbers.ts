const formatBugNumbers = (value: number) => {
  if (value < 0.0001) {
    return value.toFixed(8);
  }

  if (value < 0.001) {
    return value.toFixed(6);
  }

  if (value < 1000) {
    return value.toFixed(3);
  }

  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

export default formatBugNumbers;
